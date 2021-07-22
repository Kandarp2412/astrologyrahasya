let SUB_LORD = [
  { planet: "Ke", dashaYearsAllocated: 7, ref: 0 },
  { planet: "Ve", dashaYearsAllocated: 20, ref: 7 },
  { planet: "Su", dashaYearsAllocated: 6, ref: 27 },
  { planet: "Mo", dashaYearsAllocated: 10, ref: 33 },
  { planet: "Ma", dashaYearsAllocated: 7, ref: 43 },
  { planet: "Ra", dashaYearsAllocated: 18, ref: 50 },
  { planet: "Ju", dashaYearsAllocated: 16, ref: 68 },
  { planet: "Sa", dashaYearsAllocated: 19, ref: 84 },
  { planet: "Me", dashaYearsAllocated: 17, ref: 103 },
];

const swisseph = require("swisseph");
// const getNakshatraFromDMS = require("jyotish");
const { getValidatedBirthDetails } = require("jyotish").utils.birthDetails;
/**
 *
 * @typedef {Object} BirthDetails
 * @property {String} dateString - Format: YYYY-MM-DD
 * @property {String} timeString - Format: HH:mm:ss
 * @property {Number} lat - Latitude
 * @property {Number} lng - Longitude
 * @property {Number} timezone - Timezone in hours. Eg: 5.5
 */

/**
 *
 * @param {BirthDetails} birthDetails
 */
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

function StarHouse(decimalDegree) {
  // console.log(decimalDegree.house);
  let index = Math.floor((146.5546650019188 / 13.33333) % 4);
  // console.log(index);
  return {
    planet: SUB_LORD[index].planet,
    deg: (decimalDegree / 13.33333) % 9,
  };
}

// console.log(StarHouse);

/**
 *
 * @param {BirthDetails} birthDetails birth details
 * @param {String} house_type House System. Default: "Whole Sign" = "W"
 */

function calculateHouses(birthDetails, house_type = "P") {
  const { tt } = convertTime(getValidatedBirthDetails(birthDetails));
  return swisseph.swe_houses_ex(
    tt,
    swisseph.SEFLG_SIDEREAL,
    birthDetails.lat,
    birthDetails.lng,
    house_type
  );
}

module.exports = { calculateHouses, StarHouse };
