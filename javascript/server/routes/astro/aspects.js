let orb = 5;
let orderOfPlanets = [
  "Su",
  "Mo",
  "Ma",
  "Me",
  "Ju",
  "Ve",
  "Sa",
  "Ra",
  "Ke",
  "Ur",
  "Ne",
  "Pl",
];

// Conjuntion - 0-10deg -- orb -10deg
// Opposition - 180deg - orb - 5 to 10deg
// Square -- 90deg -- 5 to 10deg
// Sextile -- 60deg -- 3-4deg
// Trine -- 120deg --  5 to 10deg
// Semi-Square --
// Semi-Sextile
// Biquintile
// Quincunx
// Sesquiquadrate
// Tredecile
// Vigintile
// Deg54

let aspectDifferences = {
  conjunction: { aspect: "conjunction", angle: 10, orb: 5 },
  opposition: { aspect: "opposition", angle: 180, orb: 5 },
  square: { aspect: "square", angle: 90, orb: 5 },
  semiSquare: { aspect: "Semi-Square", angle: 45, orb: orb },
  sextile: { aspect: "sextile", angle: 60, orb: 4 },
  semiSextile: { aspect: "Semi-Sextile", angle: 30, orb: orb },
  trine: { aspect: "trine", angle: 120, orb: 10 },
  quincunx: { aspect: "Quincunx", angle: 150, orb: orb },
  quintile: { aspect: "Quintile", angle: 72, orb: 5 },
  biQuintile: { aspect: "Bi-Quintile", angle: 144, orb: orb },
  sesquiquadrate: { aspect: "Sesquiquadrate", angle: 135, orb: orb },
  tridecile: { aspect: "Tridecile", angle: 108, orb: orb },
  decile: { aspect: "Decile", angle: 36, orb: orb },
  vigintile: { aspect: "Vigintile", angle: 18, orb: orb },
  // Doubt-- deg54
  // deg54: { aspect: "Deg54", angle: 54, orb: orb },
};

const checkAspect = (planet1Long, planet2Long) => {
  let diff = Math.abs(planet1Long - planet2Long);
  if (diff > 180) diff = Math.abs(360 - diff);

  // Check diff with closest value of aspect angle
  let closestAspect;
  Object.entries(aspectDifferences).forEach(([key, value], index) => {
    if (!closestAspect) {
      closestAspect = { ...value, diff };
    } else {
      let oldDiff = Math.abs(closestAspect.angle - diff);
      let newDiff = Math.abs(value.angle - diff);
      // console.log(
      //   `oldDiff - ${oldDiff}  , newDiff-${newDiff}, aspect - ${value.aspect}`
      // );
      if (newDiff < oldDiff) {
        closestAspect = { ...value, diff: diff };
      }
    }
  });
  // Check if the value of diff is in the range of orb
  let max = closestAspect.angle + closestAspect.orb;
  let min = closestAspect.angle - closestAspect.orb;

  if (closestAspect.diff < max && closestAspect.diff > min) {
    return closestAspect;
  }
  return;
};

const getPlanetoryAspects = (planets) => {
  let result = {};

  // console.log(checkAspect(10, 303));

  // return;
  let completed = [];
  orderOfPlanets.forEach((key) => {
    completed.push(key);
    orderOfPlanets.forEach((key2) => {
      if (!completed.includes(key2)) {
        let aspect = checkAspect(
          planets[key].longitude,
          planets[key2].longitude
        );
        // Array Method
        // if (!result[index1]) result[index1] = {};
        // result[index1] = { ...result[index1], [key2]: aspect };

        // Object Method
        result[key] = { ...result[key], [key2]: aspect };
      }
    });
  });
  return result;
};

const getHouseAspects = (planets, houses) => {
  let result = {};

  orderOfPlanets.forEach((key) => {
    houses.forEach((house) => {
      let aspect = checkAspect(planets[key].longitude, house.longitude);

      // Object Method
      result[key] = { ...result[key], [house.houseSymbol]: aspect };
    });
  });
  return result;
};

let getAspects = (planets, houses) => {
  let planetAspects = getPlanetoryAspects(planets);
  let houseAspects = getHouseAspects(planets, houses);

  return [planetAspects, houseAspects];
};

module.exports = { getPlanetoryAspects, getHouseAspects, getAspects };
