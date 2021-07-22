const router = require("express").Router();

const planetArr = [
  "CHANDRA",
  "RAVI",
  "GURU",
  "KUJA",
  "BUDH",
  "SHANI",
  "SHUKR",
  "RAHU",
];
const ageObj = {
  CHANDRA: 1,
  RAVI: 2,
  GURU: 3,
  KUJA: 4,
  BUDH: 5,
  SHANI: 6,
  SHUKR: 7,
  RAHU: 8,
};

router.post("/yoginidasa", (req, res) => {
  const { moonDegree, dateOfBirth } = req.body;

  const divisionVal = moonDegree / 13.333333;

  console.log(divisionVal);

  const integerVal = parseInt(divisionVal) + 1;

  console.log("start=>", integerVal);

  const updatedVal = integerVal + 3;

  console.log("Added 3=>", updatedVal);

  let modVal = updatedVal % 8;

  if (modVal == 0) {
    modVal = 8;
  }

  console.log("planet=>", planetArr[modVal - 1]);

  const planetAge = ageObj[planetArr[modVal - 1]];

  console.log("planetAge=>", planetAge);

  let prograssedAge = parseFloat(divisionVal.toString().split(".")[1]);

  prograssedAge = parseFloat(`0.${prograssedAge}`);

  console.log("progressedValue=>", prograssedAge);

  const movedAge = planetAge * prograssedAge;

  console.log("movedAge=>", movedAge);

  const feautureAge = (planetAge - movedAge) * 365;
  console.log("feautureAge=>", planetAge - movedAge);
  console.log("feautureAge in days =>", feautureAge);

  let years = Math.floor(feautureAge / 365);
  let months = Math.floor((feautureAge % 365) / 30);
  let days = Math.floor((feautureAge % 365) % 30);

  console.log(
    "converted feauture age to Y-M-D format=>",
    [years, months, days].join("-")
  );

  console.log("date of birth=>", dateOfBirth);

  let years1 = dateOfBirth.split("-")[0];
  let month1 = dateOfBirth.split("-")[1];
  let days1 = dateOfBirth.split("-")[2];

  let resultYear = parseInt(years) + parseInt(years1);

  let resultMonth = parseInt(months) + parseInt(month1);

  let resultDays = parseInt(days) + parseInt(days1);

  let monthArr = [1, 3, 5, 7, 8, 10, 12];

  if (monthArr.includes(month1)) {
    if (resultDays > 31) {
      resultDays = resultDays - 31;
      resultMonth = resultMonth + 1;
    }
  }

  if (resultDays > 30) {
    resultDays = resultDays - 30;
    resultMonth = resultMonth + 1;
  }

  if (resultMonth > 12) {
    resultMonth = resultMonth - 12;
    resultYear = resultYear + 1;
  }

  // console.log()

  const dasaStart = resultYear - planetAge;

  const result = [dasaStart, resultMonth, resultDays].join("-");

  console.log("starting dasa=>", result);

  console.log("ending dasa=>", [resultYear, resultMonth, resultDays].join("-"));

  //looping from the dasa we found

  // console.log(planetArr[planetArr.indexOf(planetArr[modVal-1])])

  let yearsArr = [];
  let dasaArr = [];

  let year = resultYear;

  for (let k = 0; k < 3; k++) {
    let year1 = year;

    for (
      let i = planetArr.indexOf(planetArr[modVal - 1]);
      i < 8 + planetArr.indexOf(planetArr[modVal - 1]);
      i++
    ) {
      let index = i;

      if (index > 7) {
        index = i - 8;
      }

      if (index !== planetArr.indexOf(planetArr[modVal - 1])) {
        year = year + index + 1;
        yearsArr.push([year, resultMonth, resultDays].join("-"));
        dasaArr.push(planetArr[index]);
      } else {
        if (k > 0) {
          year = year + planetArr.indexOf(planetArr[modVal - 1]) + 1;
        }
        yearsArr.push([year, resultMonth, resultDays].join("-"));
        dasaArr.push(planetArr[index]);
      }
    }
  }

  let startingYear = [
    parseInt(yearsArr[0].split("-")[0]) - planetAge,
    resultMonth,
    resultDays,
  ].join("-");
  yearsArr.unshift(startingYear);

  console.log(yearsArr);

  res.send({ dasa: dasaArr, years: yearsArr });
});

module.exports = router;
