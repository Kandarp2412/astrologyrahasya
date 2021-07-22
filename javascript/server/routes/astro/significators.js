const signLords = [
  { sign: "Ar", lord: "Mars" },
  { sign: "Ta", lord: "Venus" },
  { sign: "Ge", lord: "Mercury" },
  { sign: "Ca", lord: "Mooon" },
  { sign: "Le", lord: "Su" },
  { sign: "Vi", lord: "Me" },
  { sign: "Li", lord: "Ve" },
  { sign: "Sc", lord: "Ma" },
  { sign: "Sa", lord: "Ju" },
  { sign: "Ca", lord: "Sa" },
  { sign: "Aq", lord: "Sa" },
  { sign: "Pi", lord: "Ju" },
];

let houseSymbol = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

// Add -3.33333 from house logic
let getDplanetSignificator = (houses) => {
  let result = {};

  // Which house is Occupied by sign Lord

  Object.values(houses.house).forEach((house) => {
    result[signLords[house.signNumber - 1].lord] = {
      ...result[signLords[house.signNumber - 1].lord],
      [house.houseSymbol]: house,
    };
  });
  return result;
};

let getCplanetSignificator = (dPLanetAspect, subLords) => {
  let result = {};
  Object.values(subLords).forEach((sl) => {
    let planet = sl.planet.graha;
    let star = sl.starPlanet.planet;
    result[planet] = {
      ...dPLanetAspect[star],
    };
  });
  return result;
};

// TOO MANY LOOPS IN THERE- WATCH OUT
let getBplanetSignificator = (d1Chart) => {
  let result = {};

  Object.values(d1Chart).forEach((sign) => {
    // let signValuesCopy = sign
    let houses = [];
    Object.entries(sign).forEach(([key, value]) => {
      if (houseSymbol.includes(key)) {
        houses.push(value);
      }
    });
    // USE BETTER APPROACH -- NOT VERY EFFIECIENT
    Object.entries(sign).forEach(([key, value]) => {
      if (key !== "asc" && key !== "moonPos") {
        if (!houseSymbol.includes(key)) {
          let signDms = value.dms.d + value.dms.m / 60;

          result[key] = (() => {
            let r;
            houses.forEach((h) => {
              let houseDms = h.dms.d + h.dms.m / 60;
              if (signDms > houseDms - 3.333333) {
                r = h.houseSymbol;
              } else {
                let index = houseSymbol.indexOf(h.houseSymbol);
                r = houseSymbol[index - 1];
              }
            });
            return r;
          })();
        }
      }
    });
  });
  return result;
};

let getAplanetSignificator = (bplanetAspect, subLords) => {
  let result = {};
  Object.values(subLords).forEach((sl) => {
    let planet = sl.planet.graha;
    let star = sl.starPlanet.planet;
    result[planet] = bplanetAspect[star];
  });
  return result;
};

let getPlanetSignificator = (houses, subLords, d1Chart) => {
  let dAspect = getDplanetSignificator(houses);
  let cAspect = getCplanetSignificator(dAspect, subLords);
  let bAspect = getBplanetSignificator(d1Chart);
  let aAspect = getAplanetSignificator(bAspect, subLords);
  return { dAspect, cAspect, bAspect, aAspect };
};

// -----------------------

let getDhouseSignificator = (houses) => {
  let result = {};
  Object.values(houses.house).forEach((house) => {
    result[house.houseSymbol] = signLords[house.signNumber - 1].lord;
  });
  return result;
};

let getChouseSignificator = (dSignificator, subLords) => {
  let result = {};
  Object.entries(dSignificator).forEach(([house, star]) => {
    result[house] = [];
    subLords.forEach((p) => {
      if (p.starPlanet.planet === star) result[house].push(p.planet.graha);
    });
  });
  return result;
};

let getBhouseSignificator = (d1Chart) => {
  let result = {};
  Object.values(d1Chart).forEach((sign) => {
    let houses = [];
    Object.entries(sign).forEach(([key, value]) => {
      if (houseSymbol.includes(key)) {
        houses.push(value);
      }
    });
    // USE BETTER APPROACH -- NOT VERY EFFIECIENT
    Object.entries(sign).forEach(([key, value]) => {
      if (key !== "asc" && key !== "moonPos") {
        if (!houseSymbol.includes(key)) {
          let signDms = value.dms.d + value.dms.m / 60;

          result[key] = (() => {
            let r;
            houses.forEach((h) => {
              let houseDms = h.dms.d + h.dms.m / 60;

              if (signDms > houseDms - 3.3333) {
                r = h.houseSymbol;
              } else {
                let index = houseSymbol.indexOf(h.houseSymbol);
                if (index === 0) index === houseSymbol.length - 1;
                r = houseSymbol[index - 1];
              }
            });
            return r;
          })();
        }
      }
    });
  });
  let finalResult = {};
  Object.entries(result).forEach(([key, value]) => {
    if (!finalResult[value]) finalResult[value] = [];
    finalResult[value] = [...finalResult[value], key];
  });
  return finalResult;
};

let getAhouseSignificator = (bSignificator, subLords) => {
  let result = {};

  Object.entries(bSignificator).forEach(([key, value]) => {
    value.forEach((v) => {
      Object.values(subLords).forEach((sl) => {
        let planet = sl.planet.graha;
        let star = sl.starPlanet.planet;
        if (star === v) result[key] = { ...result[key], [planet]: planet };
      });
    });
  });
  return result;
};
let getHouseSignificator = (houses, subLords, d1Chart) => {
  let dSignificator = getDhouseSignificator(houses);
  let cSigniFicator = getChouseSignificator(dSignificator, subLords);
  let bSignificator = getBhouseSignificator(d1Chart);
  let aSignificator = getAhouseSignificator(bSignificator, subLords);
  return { dSignificator, cSigniFicator, bSignificator, aSignificator };
};

module.exports = {
  getPlanetSignificator,
  getHouseSignificator,
};
