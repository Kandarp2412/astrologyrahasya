// Also being used in sublord file.. REFACTOR IT
let SUB_LORD = [
  { planet: "Ketu", dashaYearsAllocated: 7, ref: 0 },
  { planet: "Venus", dashaYearsAllocated: 20, ref: 7 },
  { planet: "Sun", dashaYearsAllocated: 6, ref: 27 },
  { planet: "Moon", dashaYearsAllocated: 10, ref: 33 },
  { planet: "Mars", dashaYearsAllocated: 7, ref: 43 },
  { planet: "Rahu", dashaYearsAllocated: 18, ref: 50 },
  { planet: "Jupiter", dashaYearsAllocated: 16, ref: 68 },
  { planet: "Saturn", dashaYearsAllocated: 19, ref: 84 },
  { planet: "Mercury", dashaYearsAllocated: 17, ref: 103 },
];

let daysPerYear = 365.25636;
const oneDay = 24 * 60 * 60 * 1000;

let dashaCycle = 1;

module.exports.calculateMahaDasha = (planets, bDay) => {
  let birthDate = new Date(bDay); //Convert this to days

  let moonDegrees = planets.Mo.longitude;

  let nakshatraTravelled = moonDegrees / (40 / 3);

  let dashaPlanetIndex = (Math.ceil(nakshatraTravelled) % 9) - 1; // Index of Ruling nakshatra planet

  let dashaPlanet = SUB_LORD[dashaPlanetIndex];

  let dashaYears = SUB_LORD[dashaPlanetIndex].dashaYearsAllocated;

  let progressed = nakshatraTravelled - Math.floor(nakshatraTravelled);

  let finishedYears = (dashaYears * progressed) / 1;

  let dashaStart = (1 - progressed) * daysPerYear * dashaYears;

  let totalDashaDays = dashaYears * daysPerYear;

  let dashaEndDate = addDays(birthDate, dashaStart);

  let dashaStartDate = removeDays(dashaEndDate, totalDashaDays);

  let dashas = [];

  let zeroIndexSubLevel = getSubLevelDasha({
    planet: dashaPlanet.planet,
    dashaStartDate,
    dashaEndDate,
  });
  zeroIndexSubLevel.subLevel = subLevelLoop(zeroIndexSubLevel).forEach(
    (item) => {
      item.subLevel = subLevelLoop(getSubLevelDasha(item));
      return item;
    }
  );
  dashas.push({
    planet: dashaPlanet.planet,
    dashaStartDate,
    dashaEndDate,
    subLevel: zeroIndexSubLevel,
  });

  // zeroIndexSubLevel.subLevel=
  // zeroIndexSubLevel.subLevel.subLevel = subLevelLoop(
  //   zeroIndexSubLevel.subLevel
  // );
  // dashas.push({
  //   planet: dashaPlanet.planet,
  //   dashaStartDate,
  //   dashaEndDate,
  //   subLevel: zeroIndexSubLevel.subLevel.subLevel,
  // });

  for (let i = dashaPlanetIndex + 1; i <= SUB_LORD.length - 1; i++) {
    console.log(i);
    let dashaDays = SUB_LORD[i].dashaYearsAllocated * daysPerYear;
    let startDate = dashas[dashas.length - 1].dashaEndDate;
    let endDate = addDays(startDate, dashaDays);
    let d = {
      planet: SUB_LORD[i].planet,
      dashaStartDate: startDate,
      dashaEndDate: endDate,
    };

    // Adding level 2 dasha
    let sublevelDasha = getSubLevelDasha(d);
    // d.subLevel = letSublevelDasha;

    d.subLevel = sublevelDasha.map((d2) => {
      // level3
      let sl2 = getSubLevelDasha(d2);
      // level 4
      let sl3 = subLevelLoop(sl2);
      // level 5
      let sl4 = subLevelLoop(sl3);
      // level 6
      let sl5 = subLevelLoop(sl4);

      return {
        ...d2,
        subLevel: sl2,
        subLevel: sl3,
        subLevel: sl4,
        subLevel: sl5,
      };
    });
    dashas.push(d);
  }

  for (let i = 0; i < dashaPlanetIndex; i++) {
    console.log(i);
    let dashaDays = SUB_LORD[i].dashaYearsAllocated * daysPerYear;
    let startDate = dashas[dashas.length - 1].dashaEndDate;
    let endDate = addDays(startDate, dashaDays);
    let d = {
      planet: SUB_LORD[i].planet,
      dashaStartDate: startDate,
      dashaEndDate: endDate,
    };

    // Adding level 2 dasha
    let sublevelDasha = getSubLevelDasha(d);

    // d.subLevel = letSublevelDasha;
    // console.log("------____----- ", SUB_LORD[i].planet);
    d.subLevel = sublevelDasha.map((d2) => {
      let sl2 = getSubLevelDasha(d2);

      let sl3 = getSubLevelDasha(d2);

      let sl4 = getSubLevelDasha(d2);
      // console.log(sl4);

      // level 5
      let sl5 = subLevelLoop(sl4);

      return {
        ...d2,
        subLevel: sl2,
        subLevel: sl3,
        subLevel: sl4,
        subLevel: sl5,
      };
    });

    dashas.push(d);
  }

  // Adding Second level of dasha

  return dashas;
};

const getSubLevelDasha = (dashaObject) => {
  let { dashaStartDate, dashaEndDate, planet } = dashaObject;
  // console.log(dashaObject);
  let dashaPlanetIndex = SUB_LORD.findIndex((item) => item.planet === planet);
  let result = [];
  // if (planet === undefined) return;
  // console.log(dashaPlanetIndex);

  // console.log(dashaStartDate, dashaEndDate);
  let diff = Math.abs(dashaStartDate - dashaEndDate) / oneDay;
  // console.log(oneDay);

  result.push({
    dashaStartDate: dashaStartDate,
    dashaEndDate: addDays(
      dashaStartDate,
      (diff * SUB_LORD[dashaPlanetIndex].dashaYearsAllocated) / 120
    ),
    planet: planet,
  });

  for (let i = dashaPlanetIndex + 1; i <= SUB_LORD.length - 1; i++) {
    let startDate = result[result.length - 1].dashaEndDate;
    let endDate = addDays(
      startDate,
      (diff * SUB_LORD[i].dashaYearsAllocated) / 120
    );
    result.push({
      dashaStartDate: startDate,
      dashaEndDate: endDate,
      planet: SUB_LORD[i].planet,
    });
  }

  for (let i = 0; i <= dashaPlanetIndex - 1; i++) {
    let startDate = result[result.length - 1].dashaEndDate;
    let endDate = addDays(
      startDate,
      (diff * SUB_LORD[i].dashaYearsAllocated) / 120
    );
    result.push({
      dashaStartDate: startDate,
      dashaEndDate: endDate,
      planet: SUB_LORD[i].planet,
    });
  }
  return result;
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function removeDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

const subLevelLoop = (dashasArray) => {
  let newDashaArray = dashasArray;
  // console.log(dashasArray);
  let indexToStart = 0;
  for (let i = indexToStart; i <= newDashaArray.length - 1; i++) {
    newDashaArray[i].subLevel = getSubLevelDasha(newDashaArray[i]);
  }

  for (let i = 0; i <= indexToStart; i++) {
    newDashaArray[i].subLevel = getSubLevelDasha(newDashaArray[i]);
  }
  // console.log(newDashaArray[0]);
  return newDashaArray;
};

/*

For Ashwini, Magam,Moolam. Starting Dasa is Ketu

For Bharani, Pooram and Pooradam. Starting Dasa is Venus

For Kritigai,Uttiram and Uthiradam starting Dasa is Sun

For Rohini, Hastam, Thiruvonam starting Dasa is Moon

For Mirughashirsha, Chittrainand Avittam the starting Dasa is Mars

For Tiruvadirai, Swathy and Sathayam the starting Dasa is Rahu

For Punarpoosam,Visakam and Poorathadhi starting Dasa is Jupitor

For Poosam, Anusham,,Uthirathadhi starting Dasa is Sani For Ayilyam,Ketaki, Revathi starting Dasa is Mercury

*/
