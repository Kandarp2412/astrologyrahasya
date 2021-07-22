// Also being used in sublord file.. REFACTOR IT
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

let daysPerYear = 365.25636;

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

  dashas.push({
    planet: dashaPlanet.planet,
    dashaStartDate,
    dashaEndDate,
    subLevel: getSubLevelDasha({
      planet: dashaPlanet.planet,
      dashaStartDate,
      dashaEndDate,
    }),
  });

  for (let i = dashaPlanetIndex + 1; i <= SUB_LORD.length - 1; i++) {
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

    d.sublevel = sublevelDasha.map((d2) => {
      let sl = getSubLevelDasha(d2);

      return { ...d2, subLevel: sl };
    });
    dashas.push(d);
  }

  for (let i = 0; i < dashaPlanetIndex; i++) {
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
    d.sublevel = sublevelDasha.map((d2) => {
      let sl2 = getSubLevelDasha(d2);

      return { ...d2, subLevel: sl2 };
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
  console.log(planet);
  // console.log(dashaPlanetIndex);

  result.push({
    dashaStartDate: dashaStartDate,
    dashaEndDate: addDays(
      dashaStartDate,
      (daysPerYear * SUB_LORD[dashaPlanetIndex].dashaYearsAllocated * 6) / 120
    ),
    planet: planet,
  });

  for (let i = dashaPlanetIndex + 1; i <= SUB_LORD.length - 1; i++) {
    let startDate = result[result.length - 1].dashaEndDate;
    let endDate = addDays(
      startDate,
      (daysPerYear * SUB_LORD[i].dashaYearsAllocated * 6) / 120
    );
    result.push({
      dashaStartDate: startDate,
      dashaEndDate: endDate,
      planet: SUB_LORD[i].planet,
    });
  }

  for (let i = 0; i < dashaPlanetIndex - 1; i++) {
    let startDate = result[result.length - 1].dashaEndDate;
    let endDate = addDays(
      startDate,
      (daysPerYear * SUB_LORD[i].dashaYearsAllocated * 6) / 120
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
  for (let i = indexToStart; i <= dashaArray.length - 1; i++) {
    subLevelDasha(dashaArray[i]);
  }

  for (let i = 0; i < indexToStart; i++) {
    subLevelDasha(dashaArray[i]);
  }
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
