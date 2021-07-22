const {
  d10Lookup,
  d7Lookup,
  d60Lookup,
  d8Lookup,
  d3Lookup,
  d4Lookup,
  d12Lookup,
  d16Lookup,
  d20Lookup,
  d24Lookup,
  d27Lookup,
  d30Lookup,
  d5Lookup,
  d40Lookup,
  d45Lookup,
} = require("./chartLookup");
const { deg_to_dms } = require("./utils");

// Hora

let getD2Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 15);
    let sign = planets[key].signNumber;
    // console.log("--------------graha", planets[key].graha);
    // console.log("sign", sign);
    // console.log("part", part);
    let signNumber;
    // let signNumber = d2Lookup[sign][part - 1];
    if (planets[key].graha === "Su") {
      signNumber = 5;
    } else if (planets[key].graha === "Mo") {
      signNumber = 4;
    } else
      signNumber = (function () {
        if (sign % 2) {
          // if odd
          if (planets[key].dms.d < 15) {
            return 5;
          } else {
            return 4;
          }
        } else {
          // if even
          if (planets[key].dms.d < 15) {
            return 4;
          } else {
            return 5;
          }
        }
      })();

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Drekkana
let getD3Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 10);
    let sign = planets[key].signNumber;
    // console.log("--------------graha", planets[key].graha);
    // console.log("sign", sign);
    // console.log("part", part);

    let signNumber = d3Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Chaturthamsa
let getD4Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 7.5);
    let sign = planets[key].signNumber;
    // console.log("--------------graha", planets[key].graha);
    // console.log("sign", sign);
    // console.log("part", part);

    let signNumber = d4Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Panchamansa
let getD5Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 6);
    let sign = planets[key].signNumber;

    let signNumber = d5Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Saptamsha
let getD7Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 4.285);
    let sign = planets[key].signNumber;

    let signNumber = d7Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Ashtamsa
let getD8Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 3.75);
    let sign = planets[key].signNumber;
    // console.log("part", part);
    // console.log("sign", sign);
    // console.log("decimalDegree", decimalDegree);
    // let signNumber = Math.ceil(decimalDegree * 2) % 12;
    let signNumber = d8Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Navamsha
function getD10Chart(planets) {
  let signValues = {};
  let asc;
  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 3);
    let sign = planets[key].signNumber;

    let signNumber = d10Lookup[sign][part - 1];
    if (planets[key].graha === "La") {
      asc = signNumber;
    }
    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
}

// Dwadashamsha
let getD12Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 2.5);
    let sign = planets[key].signNumber;
    // console.log("--------------graha", planets[key].graha);
    // console.log("sign", sign);
    // console.log("part", part);

    let signNumber = d12Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Shodhashamsha
let getD16Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 1.875);
    let sign = planets[key].signNumber;
    // console.log("--------------graha", planets[key].graha);
    // console.log("sign", sign);
    // console.log("part", part);

    let signNumber = d16Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

//Vimshamsha
let getD20Chart = (planets) => {
  let signValues = {};
  let asc;
  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 1.5);
    let sign = planets[key].signNumber;

    let signNumber = d20Lookup[sign][part - 1];
    if (planets[key].graha === "La") {
      asc = signNumber;
    }
    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

//Chaturvimsamsa OR Siddhamsa

let getD24Chart = (planets) => {
  let signValues = {};
  let asc;
  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 1.25);
    let sign = planets[key].signNumber;

    let signNumber = d24Lookup[sign][part - 1];
    if (planets[key].graha === "La") {
      asc = signNumber;
    }
    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Bhamsa OR Saptavimshamsa OR nakshatramsa

let getD27Chart = (planets) => {
  let signValues = {};
  let asc;
  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 1.111);
    let sign = planets[key].signNumber;

    let signNumber = d27Lookup[sign][part - 1];
    if (planets[key].graha === "La") {
      asc = signNumber;
    }
    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Trimsamsa
let getD30Chart = (planets) => {
  let signValues = {};
  let asc;
  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 1);
    let sign = planets[key].signNumber;

    let signNumber = d30Lookup[sign][part - 1];
    if (planets[key].graha === "La") {
      asc = signNumber;
    }
    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
        part,
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Khavedamsa
let getD40Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 0.75);
    let sign = planets[key].signNumber;
    // console.log("part", part);
    // console.log("sign", sign);
    // console.log("decimalDegree", decimalDegree);
    // let signNumber = Math.ceil(decimalDegree * 2) % 12;
    let signNumber = d40Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Akshavedamsa
let getD45Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 0.666);
    let sign = planets[key].signNumber;
    // console.log("part", part);
    // console.log("sign", sign);
    // console.log("decimalDegree", decimalDegree);
    // let signNumber = Math.ceil(decimalDegree * 2) % 12;
    let signNumber = d45Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

// Shashtiamsha
let getD60Chart = (planets) => {
  let signValues = {};
  let asc;

  Object.keys(planets).map((key) => {
    let decimalDegree = planets[key].dms.d + planets[key].dms.m / 60;
    let part = Math.ceil(decimalDegree / 0.5);
    let sign = planets[key].signNumber;
    // console.log("part", part);
    // console.log("sign", sign);
    // console.log("decimalDegree", decimalDegree);
    // let signNumber = Math.ceil(decimalDegree * 2) % 12;
    let signNumber = d60Lookup[sign][part - 1];

    if (planets[key].graha === "La") {
      asc = signNumber;
    }

    signValues[signNumber] = {
      ...signValues[signNumber],
      [planets[key].graha]: {
        ...planets[key],
        text: [planets[key].graha],
      },
    };

    // Calculate Ascendant
    let tmpASc = 1;
    for (let i = asc; i <= 12; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
    for (let i = 1; i < asc; i++) {
      signValues[i] = { ...signValues[i], asc: tmpASc };
      tmpASc++;
    }
  });
  return signValues;
};

const getD1Chart = (houses, planets) => {
  // Had to create a new object as JS passes object by reference

  // organising according to sign number
  // Adding printable text in the chart object
  let ascIndex = -1;
  let signValues = {};
  houses.house.forEach((h) => {
    if (h.longitude === houses.ascendant) {
      ascIndex = h.signNumber;
    }
    signValues[h.signNumber] = {
      ...signValues[h.signNumber],
      [h.houseSymbol]: {
        ...h,
        text: `${h.houseSymbol} ${h.dms.d}:${h.dms.m}:${h.dms.s}`,
      },
    };
  });

  // Adding printable text in the chart object
  Object.values(planets).map((value) => {
    signValues[value.signNumber] = {
      ...signValues[value.signNumber],
      [value.graha]: {
        ...value,
        text: `${value.graha} ${value.dms.d}:${value.dms.m}:${value.dms.s}`,
      },
    };
  });

  // Add asc number
  let ascPtr = 1;

  for (let i = ascIndex; i <= 12; i++) {
    signValues[i] = { ...signValues[i], asc: ascPtr };
    ascPtr++;
  }

  for (let i = 1; i < ascIndex; i++) {
    signValues[i] = { ...signValues[i], asc: ascPtr };
    ascPtr++;
  }

  // Adding Moon Number

  let moonPtr = 1;

  let moonIndex = planets.Mo.signNumber;
  for (let i = moonIndex; i <= 12; i++) {
    signValues[i] = { ...signValues[i], moonPos: moonPtr };
    moonPtr++;
  }

  for (let i = 1; i < moonIndex; i++) {
    signValues[i] = { ...signValues[i], moonPos: moonPtr };
    moonPtr++;
  }

  // RENAME THE STRUCTURE
  return { d1Chart: signValues, bhavas: houses };
};

const getD9Chart = (houses, birthChart) => {
  let houseArr = [];
  let asc;
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
  let planets = {};
  // assinging planets sign number and degree minutes seconds
  Object.values(birthChart.meta).forEach((obj) => {
    let dms = deg_to_dms(obj.longitude);
    dms.d = dms.d % 30;
    let zodiacNumber = Math.ceil(parseFloat(obj.longitude / 30));
    let mins = dms.m / 60;

    let zodiacPassed = (zodiacNumber - 1) * 30;

    let pos = dms.d + zodiacPassed + mins;

    let signNumber = Math.ceil((pos / 3.33333) % 12);

    planets[obj.graha] = {
      ...obj,
      dms: { ...dms, d: dms.d % 30 },
      zodiacNumber,
      signNumber,
    };
  });

  // Assigning houses sign number
  // houses.house.forEach((h, index) => {
  // console.log(longitude);
  // let longitude = h.longitude;
  // let dms = deg_to_dms(longitude);
  // // Add ascendant value
  // if (longitude === houses.ascendant) {
  //   asc = 1;
  // }
  // let zodiacNumber = Math.ceil(parseFloat(longitude / 30));
  // let mins = dms.m / 60;

  // let zodiacPassed = (zodiacNumber - 1) * 30;

  // let pos = longitude + zodiacPassed + mins;

  //   let signNumber = Math.ceil((pos / (30 / 9)) % 12);

  //   houseArr.push({
  //     longitude,
  //     dms: { ...dms, d: dms.d % 30 },
  //     signNumber,
  //     houseSymbol: houseSymbol[index],
  //     asc,
  //   });
  //   if (asc) asc = asc + 1;
  // });

  // houses.house = houseArr;

  // // organising according to sign number
  // // Adding printable text in the chart object
  let ascIndex = -1;
  let signValues = {};
  // houses.house.forEach((h) => {
  //   if (h.longitude === houses.ascendant) {
  //     ascIndex = h.signNumber;
  //   }

  //   // signValues[h.signNumber] = {
  //   //   ...signValues[h.signNumber],
  //   //   [h.houseSymbol]: {
  //   //     ...h,
  //   //     text: `${h.houseSymbol} ${h.dms.d}:${h.dms.m}:${h.dms.s}`,
  //   //   },
  //   // };
  // });

  // Adding printable text in the chart object
  Object.values(planets).map((value) => {
    let navamshaDms = deg_to_dms(value.longitude % 3.333333);
    signValues[value.signNumber] = {
      ...signValues[value.signNumber],
      [value.graha]: {
        ...value,
        text: `${value.graha} ${navamshaDms.d}:${navamshaDms.m}:${navamshaDms.s}`,
      },
    };
  });

  // Add asc number
  let ascPtr = 1;

  for (let i = ascIndex; i <= 12; i++) {
    signValues[i] = { ...signValues[i], asc: ascPtr };
    ascPtr++;
  }

  for (let i = 1; i < ascIndex; i++) {
    signValues[i] = { ...signValues[i], asc: ascPtr };
    ascPtr++;
  }

  // Adding Moon Number

  let moonPtr = 1;

  let moonIndex = planets.Mo.signNumber;
  for (let i = moonIndex; i <= 12; i++) {
    signValues[i] = { ...signValues[i], moonPos: moonPtr };
    moonPtr++;
  }

  for (let i = 1; i < moonIndex; i++) {
    signValues[i] = { ...signValues[i], moonPos: moonPtr };
    moonPtr++;
  }

  return signValues;
};
module.exports = {
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
};
