const swisseph = require("swisseph");
const getNakshatra = require("jyotish/src/nakshatras/getNakshatra");
const getRashi = require("jyotish/src/rashis/getRashi");
const { getValidatedBirthDetails } = require("jyotish/src/utils/birthDetails");
const { birthDetails } = require("jyotish/src/utils/sampleData");

SE_GRAHAS = {
  Su: 0,
  Mo: 1,
  Me: 2,
  Ve: 3,
  Ma: 4,
  Ju: 5,
  Sa: 6,
  Ur: 7,
  Ne: 8,
  Pl: 9,
  Ra: 10,
};

const convertTime = (birthDetails) => {
  let utc = swisseph.swe_utc_time_zone(
    birthDetails.year,
    birthDetails.month,
    birthDetails.date,
    birthDetails.hour,
    birthDetails.min,
    birthDetails.sec,
    birthDetails.timezone
  );
  let retval = swisseph.swe_utc_to_jd(
    utc.year,
    utc.month,
    utc.day,
    utc.hour,
    utc.minute,
    utc.second,
    swisseph.SE_GREG_CAL
  );
  let et = retval.julianDayET;
  tt = retval.julianDayUT;
  return { utc, retval, et, tt };
};

const setBodyDetails = (body) => {
  body.isRetrograde =
    body.hasOwnProperty("isRetrograde") ||
    (body.longitudeSpeed < 0 ? true : false);
  body.nakshatra = getNakshatra(body.longitude);
  body.rashi = getRashi(body.longitude);
  // body.relativeLongitude = getRelativeLongitudes(body.longitude);
};

const setKetuDetails = (rahuDegree) => {
  let Ke = {};
  Ke.graha = "Ke";
  Ke.isRetrograde = true;
  Ke.longitude =
    rahuDegree > 180 ? Math.abs(rahuDegree - 180) : rahuDegree + 180;
  setBodyDetails(Ke);
  return Ke;
};

const calculateLagna = (tt, { lat, lng }, lagna_type) => {
  let Houses = swisseph.swe_houses_ex(
    tt,
    swisseph.SEFLG_SIDEREAL,
    lat,
    lng,
    lagna_type
  );
  let La = {};
  La.graha = "La";
  La.longitude = Houses.ascendant;
  La.isRetrograde = false;
  setBodyDetails(La);
  return [La, Houses.house];
};

const calculateGrahaPositions = (birthDetails, houseType, flag) => {
  let grahasPositions = {};
  let { et, tt } = convertTime(birthDetails);

  Object.keys(SE_GRAHAS).forEach((graha, index) => {
    grahasPositions[graha] = {};
    grahasPositions[graha] = swisseph.swe_calc_ut(et, SE_GRAHAS[graha], flag);
    grahasPositions[graha].graha = graha;
    setBodyDetails(grahasPositions[graha]);
  });

  grahasPositions.Ke = setKetuDetails(grahasPositions.Ra.longitude);

  [La, houses] = calculateLagna(tt, birthDetails, houseType);

  grahasPositions.La = La;

  // [grahasWithBhava, bhavaDetails] = calculateHouseDetails(grahasPositions, houses, lagna_type);

  return grahasPositions;
};

const getGrahasPosition = (
  birthDetails,
  { zodiacType = "S", ayanamsha = 5, houseType = "P" } = {}
) => {
  birthDetails = getValidatedBirthDetails(birthDetails);

  let { et, tt } = convertTime(birthDetails);

  let flag = swisseph.SEFLG_SPEED;
  zodiacType === "S" ? (flag += swisseph.SEFLG_SIDEREAL) : null;
  swisseph.swe_set_sid_mode(ayanamsha, 0, 0);

  return calculateGrahaPositions(birthDetails, houseType, flag);
};

module.exports = getGrahasPosition;
