const router = require("express").Router();
const { getBirthChart } = require("./astro");
const { getprogresssionChart } = require("./astro");
const { gettransitChart } = require("./astro");
const { ayanamshas } = require("./astro/ayanamsas");
const {
  getD10Chart,
  getD7Chart,
  getD60Chart,
  getD2Chart,
  getD3Chart,
  getD4Chart,
  getD12Chart,
  getD16Chart,
  getD20Chart,
  getD24Chart,
  getD27Chart,
  getD30Chart,
  getD5Chart,
  getD40Chart,
  getD45Chart,
  getD8Chart,
  getD1Chart,
  getD9Chart,
} = require("./astro/charts");
const { calculateHouses } = require("./astro/houses");
const { StarHouse } = require("./astro/houses");
const { NAKSHATRA_NAMES } = require("./astro/constants");
const { deg_to_dms } = require("./astro/utils");
const { subLordLookup, getSubLord } = require("./astro/kpSubLord");
const { getPlanetSignificator, getHouseSignificator } = require("./astro/significators");
const { getAspects } = require("./astro/aspects");
const { calculateMahaDasha } = require("./astro/dasha");

// let SUB_LORD = [
//   { planet: "Ke", dashaYearsAllocated: 7, ref: 0 },
//   { planet: "Ve", dashaYearsAllocated: 20, ref: 7 },
//   { planet: "Su", dashaYearsAllocated: 6, ref: 27 },
//   { planet: "Mo", dashaYearsAllocated: 10, ref: 33 },
//   { planet: "Ma", dashaYearsAllocated: 7, ref: 43 },
//   { planet: "Ra", dashaYearsAllocated: 18, ref: 50 },
//   { planet: "Ju", dashaYearsAllocated: 16, ref: 68 },
//   { planet: "Sa", dashaYearsAllocated: 19, ref: 84 },
//   { planet: "Me", dashaYearsAllocated: 17, ref: 103 },
// ];

// const StarHouse = (decimalDegree) => {
//   let index = Math.floor((decimalDegree / 13.333333) % 9);
//   return {
//     planet: SUB_LORD[1].planet,
//     deg: (decimalDegree / 13.33333) % 9,
//   };
// };

router.get("/ayanamsha", (req, res) => {
  res.send(ayanamshas);
});

// Get Birth Chart Details
/**
 * @param {String} dateString format YYYY-MM-DD
 * @param {String} timeString format HH:MM:SS
 * @param {Number} lat latitude
 * @param {Number} lng longitude
 * @param {Number} timezone timezone in hours
 **/
router.post("/getBirthChart", (req, res) => {
  // console.log(req.body);
  let { dateString, timeString, lat, lng, timezone = 5.5, ayanamsha } = req.body;
  lat = parseInt(lat);
  lng = parseInt(lng);
  const birthChart = getBirthChart(dateString, timeString, lat, lng, timezone, ayanamsha);
  let houses = calculateHouses({
    dateString,
    timeString,
    lat,
    lng,
    timezone,
  });

  // Formatting Houses array
  {
    let houseArr = [];
    let houseAsc;
    let houseSymbol = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

    // Assigning houses sign number
    houses.house.forEach((longitude, index) => {
      let dms = deg_to_dms(longitude);
      // Add ascendant value
      let signNumber = Math.ceil(parseFloat(longitude / 30));
      if (longitude === houses.ascendant) {
        houseAsc = 1;
      }
      let item = Math.ceil(longitude / 13.333333);
      // console.log(Math.ceil(longitude / 13.333333));

      houseArr.push({
        longitude,
        dms: { ...dms, d: dms.d % 30 },
        signNumber,
        houseSymbol: houseSymbol[index],
        asc: houseAsc,
        starHouse: {
          nakshatra:
            item === 1
              ? "Ashwini"
              : item === 2
              ? "Bharani"
              : item === 3
              ? "Krittika"
              : item === 4
              ? "Rohini"
              : item === 5
              ? "Mrigashira"
              : item === 6
              ? "Ardra"
              : item === 7
              ? "Punarvasu"
              : item === 8
              ? "Pushya"
              : item === 9
              ? "Ashlesha"
              : item === 10
              ? "Magha"
              : item === 11
              ? "Purva Phalguni"
              : item === 12
              ? "Uttara Phalguni"
              : item === 13
              ? "Hasta"
              : item === 14
              ? "Chitra"
              : item === 15
              ? "Swati"
              : item === 16
              ? "Visakha"
              : item === 17
              ? "Anuradha"
              : item === 18
              ? "Jyeshtha"
              : item === 19
              ? "Mool"
              : item === 20
              ? "Purav Ashadha"
              : item === 21
              ? "Uttara Ashadha"
              : item === 22
              ? "Abhijit"
              : item === 23
              ? "Shravan"
              : item === 24
              ? "Dhanishta"
              : item === 25
              ? "Shatabhisha"
              : item === 26
              ? "Purva Bhadrapada"
              : item === 27
              ? "Uttara Bhadrapada"
              : item === 28
              ? "Revati"
              : null,
          pada: Math.floor(((longitude / 3.333333) % 4) + 1),
        },
      });
      // console.log(starHouse);
      if (houseAsc) houseAsc = houseAsc + 1;
    });

    houses.house = houseArr;
    // console.log(NAKSHATRA_NAMES);
  }
  /////////

  let planets = {};
  // assinging planets sign number and degree minutes seconds
  Object.values(birthChart.meta).forEach((obj) => {
    let dms = deg_to_dms(obj.longitude);
    let signNumber = Math.ceil(parseFloat(obj.longitude / 30));
    planets[obj.graha] = { ...obj, dms: { ...dms, d: dms.d % 30 }, signNumber };
  });
  // Will return modified houses array as bhavas (REFACTOR)
  // console.log(planets);
  const { d1Chart, bhavas } = getD1Chart(houses, planets);
  const houseSublords = getSubLord(houses.house);
  const planetSublords = getSubLord(planets);

  const planetSignificator = getPlanetSignificator(bhavas, planetSublords, d1Chart);
  const houseSignificator = getHouseSignificator(houses, planetSublords, d1Chart);
  // USE A chart later

  const [planetAspects, houseAspects] = getAspects(planets, houses.house);

  const dasha = calculateMahaDasha(planets, dateString);

  const d9Chart = getD9Chart(houses, birthChart);
  const d10Chart = getD10Chart(planets);
  const d7Chart = getD7Chart(planets);
  const d60Chart = getD60Chart(planets);
  const d2Chart = getD2Chart(planets);
  const d3Chart = getD3Chart(planets);
  const d4Chart = getD4Chart(planets);
  const d12Chart = getD12Chart(planets);
  const d16Chart = getD16Chart(planets);
  const d20Chart = getD20Chart(planets);
  const d24Chart = getD24Chart(planets);
  const d27Chart = getD27Chart(planets);
  const d30Chart = getD30Chart(planets);
  const d5Chart = getD5Chart(planets);
  const d40Chart = getD40Chart(planets);
  const d45Chart = getD45Chart(planets);
  const d8Chart = getD8Chart(planets);

  // combining 12 planets + 12 houses

  let obj = {};
  let cheraDashaObj = {};
  let data = Object.values(planets);
  console.log(data);
  let requiredPlanets = ["Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "La"];
  let cheraDashaRequiredPlanets = ["Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "La", "Ra", "Ke"];
  data.map((item) => {
    if (cheraDashaRequiredPlanets.includes(item.graha)) {
      cheraDashaObj[item.graha] = item.signNumber;
    }
  });
  console.log(cheraDashaObj);
  data.map((item) => {
    if (requiredPlanets.includes(item.graha)) {
      obj[item.graha] = item.signNumber;
    }
  });

  res.json({
    planets,
    astavarga: obj,
    cheraDasha: cheraDashaObj,
    houses,
    charts: {
      d1Chart,
      d2Chart,
      d3Chart,
      d4Chart,
      d7Chart,
      d9Chart,
      d10Chart,
      d12Chart,
      d60Chart,
      d16Chart,
      d20Chart,
      d24Chart,
      d27Chart,
      d30Chart,
      d5Chart,
      d40Chart,
      d45Chart,
      d8Chart,
    },
    sublords: {
      houseSublords,
      planetSublords,
    },
    significator: {
      planetSignificator,
      houseSignificator,
    },
    aspects: { planetAspects, houseAspects },
    dasha,
  });
});

router.post("/getprogressionChart", (req, res) => {
  console.log(req.body);
  let { dateString, timeString, lat, lng, timezone = 5.5, ayanamsha } = req.body;
  lat = parseInt(lat);
  lng = parseInt(lng);
  const progressionChart = getprogresssionChart(
    dateString,
    timeString,
    lat,
    lng,
    timezone,
    ayanamsha
  );
  let houses = calculateHouses({
    dateString,
    timeString,
    lat,
    lng,
    timezone,
  });

  // Formatting Houses array
  {
    let houseArr = [];
    let houseAsc;
    let houseSymbol = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

    // Assigning houses sign number
    houses.house.forEach((longitude, index) => {
      let dms = deg_to_dms(longitude);
      // Add ascendant value
      let signNumber = Math.ceil(parseFloat(longitude / 30));
      if (longitude === houses.ascendant) {
        houseAsc = 1;
      }

      houseArr.push({
        longitude,
        dms: { ...dms, d: dms.d % 30 },
        signNumber,
        houseSymbol: houseSymbol[index],
        starHouse: StarHouse,
        asc: houseAsc,
      });
      if (houseAsc) houseAsc = houseAsc + 1;
    });

    houses.house = houseArr;
  }
  /////////

  let planets = {};
  // assinging planets sign number and degree minutes seconds
  Object.values(progressionChart.meta).forEach((obj) => {
    let dms = deg_to_dms(obj.longitude);
    let signNumber = Math.ceil(parseFloat(obj.longitude / 30));
    planets[obj.graha] = { ...obj, dms: { ...dms, d: dms.d % 30 }, signNumber };
  });
  // Will return modified houses array as bhavas (REFACTOR)
  const { d1Chart, bhavas } = getD1Chart(houses, planets);
  // const houseSublords = getSubLord(houses.house);
  // const planetSublords = getSubLord(planets);

  // const planetSignificator = getPlanetSignificator(
  //   bhavas,
  //   planetSublords,
  //   d1Chart
  // );
  // const houseSignificator = getHouseSignificator(
  //   houses,
  //   planetSublords,
  //   d1Chart
  // );
  // USE A chart later

  // const [planetAspects, houseAspects] = getAspects(planets, houses.house);

  // const dasha = calculateMahaDasha(planets, dateString);

  // const d9Chart = getD9Chart(houses, progressionChart);
  // const d10Chart = getD10Chart(planets);
  // const d7Chart = getD7Chart(planets);
  // const d60Chart = getD60Chart(planets);
  // const d2Chart = getD2Chart(planets);
  // const d3Chart = getD3Chart(planets);
  // const d4Chart = getD4Chart(planets);
  // const d12Chart = getD12Chart(planets);
  // const d16Chart = getD16Chart(planets);
  // const d20Chart = getD20Chart(planets);
  // const d24Chart = getD24Chart(planets);
  // const d27Chart = getD27Chart(planets);
  // const d30Chart = getD30Chart(planets);
  // const d5Chart = getD5Chart(planets);
  // const d40Chart = getD40Chart(planets);
  // const d45Chart = getD45Chart(planets);
  // const d8Chart = getD8Chart(planets);

  // combining 12 planets + 12 houses

  res.json({
    planets,
    houses,
    charts: {
      d1Chart,
      // d2Chart,
      // d3Chart,
      // d4Chart,
      // d7Chart,
      // d9Chart,
      // d10Chart,
      // d12Chart,
      // d60Chart,
      // d16Chart,
      // d20Chart,
      // d24Chart,
      // d27Chart,
      // d30Chart,
      // d5Chart,
      // d40Chart,
      // d45Chart,
      // d8Chart,
    },
    // sublords: {
    //   houseSublords,
    //   planetSublords,
    // },
    // significator: {
    //   planetSignificator,
    //   houseSignificator,
    // },
    // aspects: { planetAspects, houseAspects },
    // dasha,
  });
});

router.post("/gettransitChart", (req, res) => {
  console.log(req.body);
  let { dateString, timeString, lat, lng, timezone = 5.5, ayanamsha } = req.body;
  lat = parseInt(lat);
  lng = parseInt(lng);
  const transitChart = gettransitChart(dateString, timeString, lat, lng, timezone, ayanamsha);
  let houses = calculateHouses({
    dateString,
    timeString,
    lat,
    lng,
    timezone,
  });

  // Formatting Houses array
  {
    let houseArr = [];
    let houseAsc;
    let houseSymbol = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

    // Assigning houses sign number
    houses.house.forEach((longitude, index) => {
      let dms = deg_to_dms(longitude);
      // Add ascendant value
      let signNumber = Math.ceil(parseFloat(longitude / 30));
      if (longitude === houses.ascendant) {
        houseAsc = 1;
      }

      houseArr.push({
        longitude,
        dms: { ...dms, d: dms.d % 30 },
        signNumber,
        houseSymbol: houseSymbol[index],
        asc: houseAsc,
        starHouse: StarHouse,
      });
      if (houseAsc) houseAsc = houseAsc + 1;
    });

    houses.house = houseArr;
  }
  /////////

  let planets = {};
  // assinging planets sign number and degree minutes seconds
  Object.values(transitChart.meta).forEach((obj) => {
    let dms = deg_to_dms(obj.longitude);
    let signNumber = Math.ceil(parseFloat(obj.longitude / 30));
    planets[obj.graha] = { ...obj, dms: { ...dms, d: dms.d % 30 }, signNumber };
  });
  // Will return modified houses array as bhavas (REFACTOR)
  const { d1Chart, bhavas } = getD1Chart(houses, planets);
  // const houseSublords = getSubLord(houses.house);
  // const planetSublords = getSubLord(planets);

  // const planetSignificator = getPlanetSignificator(
  //   bhavas,
  //   planetSublords,
  //   d1Chart
  // );
  // const houseSignificator = getHouseSignificator(
  //   houses,
  //   planetSublords,
  //   d1Chart
  // );
  // USE A chart later

  // const [planetAspects, houseAspects] = getAspects(planets, houses.house);

  // const dasha = calculateMahaDasha(planets, dateString);

  // const d9Chart = getD9Chart(houses, transitChart);
  // const d10Chart = getD10Chart(planets);
  // const d7Chart = getD7Chart(planets);
  // const d60Chart = getD60Chart(planets);
  // const d2Chart = getD2Chart(planets);
  // const d3Chart = getD3Chart(planets);
  // const d4Chart = getD4Chart(planets);
  // const d12Chart = getD12Chart(planets);
  // const d16Chart = getD16Chart(planets);
  // const d20Chart = getD20Chart(planets);
  // const d24Chart = getD24Chart(planets);
  // const d27Chart = getD27Chart(planets);
  // const d30Chart = getD30Chart(planets);
  // const d5Chart = getD5Chart(planets);
  // const d40Chart = getD40Chart(planets);
  // const d45Chart = getD45Chart(planets);
  // const d8Chart = getD8Chart(planets);

  // combining 12 planets + 12 houses

  res.json({
    planets,
    houses,
    charts: {
      d1Chart,
    },

    // dasha,
  });
});

module.exports = router;
