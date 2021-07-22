/*
  @params : houses, planets

*/

const { RASHI } = require("./chartLookup");

// Rashi Lords

let RASHI_LORDS = {
  aries: "Ma",
  taurus: "Ve",
  gemini: "Me",
  cancer: "Mo",
  leo: "Su",
  virgo: "Me",
  libra: "Ve",
  scorpio: "Ma",
  sagittarius: "Ju",
  capricorn: "Sa",
  aquarius: "Sa",
  pisces: "Ju",
};

// Dasha Years Allocated -- Total Years = 120
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

let SUB_LORD_MAP = {
  Ke: { planet: "Ke", dashaYearsAllocated: 7, ref: 0 },
  Ve: { planet: "Ve", dashaYearsAllocated: 20, ref: 7 },
  Su: { planet: "Su", dashaYearsAllocated: 6, ref: 27 },
  Mo: { planet: "Mo", dashaYearsAllocated: 10, ref: 33 },
  Ma: { planet: "Ma", dashaYearsAllocated: 7, ref: 43 },
  Ra: { planet: "Ra", dashaYearsAllocated: 18, ref: 50 },
  Ju: { planet: "Ju", dashaYearsAllocated: 16, ref: 68 },
  Sa: { planet: "Sa", dashaYearsAllocated: 19, ref: 84 },
  Me: { planet: "Me", dashaYearsAllocated: 17, ref: 103 },
};

const getSign = (decimalDegree) => {
  //  ERROR -> The order Is wrong .. in RASHI --- USE THE ORDER IN RASHI_LORDS
  return RASHI[Math.ceil(decimalDegree / 30)];
};

const getStarPlanet = (decimalDegree) => {
  // console.log(decimalDegree);
  let index = Math.floor((decimalDegree / 13.333333) % 9);
  return {
    planet: SUB_LORD[index].planet,
    deg: (decimalDegree / 13.33333) % 9,
  };
};

let subLordLookup = (() => {
  let result = [];
  SUB_LORD.forEach((planet) => {
    result.push({
      ...planet,
      degPart: parseFloat(
        ((planet.dashaYearsAllocated / 120) * 800).toFixed(4)
      ),
    });
  });
  return result;
})();

let getSubSubLords = (subLord, levels) => {
  let result = [];
  let levelString = "Sub";
  for (let i = 1; i <= levels; i++) {
    levelString = levelString + "-Sub";
    let levelName = levelString + "-Lord";
    if (i === 1) {
      // console.log("------------", subLord.planet);
      let r1 = Math.abs(subLord.deg - SUB_LORD_MAP[subLord.planet].ref);
      // console.log("r1---1", r1);
      // console.log(subLord);
      // console.log(subLord.deg, SUB_LORD_MAP[subLord.planet].ref);
      let r2 = r1 * 120;
      let r3 = r2 / SUB_LORD_MAP[subLord.planet].dashaYearsAllocated;
      let r4 = r3 + SUB_LORD_MAP[subLord.planet].ref;
      let r5 = r4 % 120;

      // console.log("r2", r2);
      // console.log("r3", r3);
      // console.log("r4", r4);
      // console.log("r5", r5);

      // Look into the ref to find the sublord
      let lord;

      for (let j = SUB_LORD.length - 1; j >= 0; j--) {
        // console.log("iteration", j);
        if (r5 > SUB_LORD[j].ref) {
          lord = SUB_LORD[j];
          break;
        }
      }

      result.push({ levelName, planet: lord && lord.planet, deg: r5 });
    } else {
      // console.log("------------", subLord.planet);
      let r1 = Math.abs(
        result[result.length - 1].deg -
          SUB_LORD_MAP[result[result.length - 1].planet].ref
      );
      // console.log("r1--2", r1);
      // console.log(
      //   result[result.length - 1].deg,
      //   SUB_LORD_MAP[subLord.planet].ref
      // );
      let r2 = r1 * 120;
      // console.log("r2", r2);
      let r3 =
        r2 / SUB_LORD_MAP[result[result.length - 1].planet].dashaYearsAllocated;
      // console.log("r3", r3);
      let r4 = r3 + SUB_LORD_MAP[result[result.length - 1].planet].ref;
      // console.log("r4", r4);
      let r5 = r4 % 120;
      // console.log("r5", r5);

      // Look into the ref to find the sublord
      let lord;

      for (let j = SUB_LORD.length - 1; j >= 0; j--) {
        if (r5 > SUB_LORD[j].ref) {
          lord = SUB_LORD[j];
          break;
        }
      }
      result.push({ levelName, planet: lord && lord.planet, deg: r5 });
    }
  }
  return result;
};

// let createSublordLookup = (starPlanet) => {
//   let obj = [];
//   let indexOfPlanet = SUB_LORD.findIndex((item) => item.planet === starPlanet);
//   let planet = SUB_LORD[indexOfPlanet];
//   for (let i = indexOfPlanet; i <= SUB_LORD.length - 1; i++) {
//     obj.push([
//       SUB_LORD[i].planet,
//       (SUB_LORD[i].dashaYearsAllocated / 120) * 800,
//     ]);
//   }
//   for (let i = 0; i < indexOfPlanet; i++) {
//     obj.push([
//       SUB_LORD[i].planet,
//       (SUB_LORD[i].dashaYearsAllocated / 120) * 800,
//     ]);
//   }
//   return obj;
// };

// Lookups

// SUB_LORD.forEach((planet, index) => {
//   subLordLookups[planet.planet] = createSublordLookup(planet.planet);
// });

// console.log(subLordLookups);

// MAIN()
const getSubLord = (planets) => {
  let subLords = [];
  Object.entries(planets).forEach(([key, planet]) => {
    let decimalDegree = planet.dms.d + planet.dms.m / 60;
    let long = planet.longitude;
    let sign = getSign(long);
    let starPlanet = getStarPlanet(long);
    let part = Math.ceil(long / 13.3333);

    // Create lookup tablefor the planet
    // let lkUpTable = (() => {
    //   let result = [];
    //   let indexOfPlanet = subLordLookup.findIndex(
    //     (item) => item.planet === starPlanet.planet
    //   );
    //   if (indexOfPlanet === -1) return;

    //   // Pushing the first element in the table

    //   result.push({
    //     planet: subLordLookup[indexOfPlanet].planet,
    //     min: 0,
    //     max: parseFloat(subLordLookup[indexOfPlanet].degPart),
    //   });

    //   //Starting from the planet itself
    //   for (let i = indexOfPlanet + 1; i <= subLordLookup.length - 1; i++) {
    //     result.push({
    //       planet: subLordLookup[i].planet,
    //       min: parseFloat(result[result.length - 1].max),
    //       max: result[result.length - 1].max + subLordLookup[i].degPart,
    //     });
    //   }

    //   // Adding remaining
    //   for (let i = 0; i < indexOfPlanet; i++) {
    //     result.push({
    //       planet: subLordLookup[i].planet,
    //       min: parseFloat(result[result.length - 1].max),
    //       max: result[result.length - 1].max + subLordLookup[i].degPart,
    //     });
    //   }

    //   return result;
    // })();

    // check for Sub Lord

    let subLord;
    let sLordDeg =
      (SUB_LORD_MAP[starPlanet.planet].ref + 120 * (starPlanet.deg % 1)) % 120;
    for (let i = SUB_LORD.length - 1; i >= 0; i--) {
      if (sLordDeg > SUB_LORD[i].ref) {
        subLord = SUB_LORD[i];
        break;
      }
    }

    let sLords = getSubSubLords(
      { planet: subLord && subLord.planet, deg: sLordDeg },
      3
    );
    // console.log(lkUpTable);
    subLords.push({
      // lkUpTable,
      signLord: RASHI_LORDS[sign.sign.toLowerCase()],
      starPlanet,
      subLord: { planet: subLord && subLord.planet, deg: sLordDeg },
      sLords,
      planet,
    });
  });
  return subLords;
};

module.exports = { getSubLord, subLordLookup };

// Old logic

let lk = () => {
  let result = [];
  let indexOfPlanet = subLordLookup.findIndex((item) => item.planet === key);
  if (indexOfPlanet === -1) return;
  // Push the current Planet into the lookup array as first item
  result.push([
    subLordLookup[indexOfPlanet].planet,
    parseFloat(subLordLookup[indexOfPlanet].deg),
  ]);
  // console.log(
  //   "run 1",
  //   subLordLookup[indexOfPlanet].planet,
  //   parseFloat(subLordLookup[indexOfPlanet].deg)
  // );

  // Adding planets after the current planet
  // console.log("--------------------", planet.graha);
  for (let i = indexOfPlanet; i <= SUB_LORD.length - 2; i++) {
    // if (i === indexOfPlanet) {
    //   continue;
    // }
    result.push([
      subLordLookup[i].planet,
      parseFloat(result[result.length - 1][1]) +
        parseFloat(subLordLookup[i + 1].deg),
    ]);
    // console.log(
    //   "adding 1",
    //   parseFloat(result[result.length - 1][1]),
    //   parseFloat(subLordLookup[i + 1].deg)
    // );
  }

  // Adding planets Before the current planet
  for (let i = 0; i < indexOfPlanet; i++) {
    if (i === 0) {
      result.push([
        subLordLookup[i].planet,
        parseFloat(result[result.length - 1][1]) +
          parseFloat(subLordLookup[subLordLookup.length - 1].deg),
      ]);

      //

      // console.log(
      //   "adding 2",
      //   parseFloat(result[result.length - 1][1]),
      //   parseFloat(subLordLookup[subLordLookup.length - 1].deg)
      // );
    } else {
      result.push([
        subLordLookup[i].planet,
        parseFloat(result[result.length - 1][1]) +
          parseFloat(subLordLookup[i + 1].deg),
      ]);

      // console.log(
      //   "adding 3",
      //   parseFloat(result[result.length - 1][1]),
      //   parseFloat(subLordLookup[i + 1].deg)
      // );
    }
  }
  return result;
};
