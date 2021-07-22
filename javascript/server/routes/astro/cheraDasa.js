const express = require("express");
const router = require("../astroreha");

const arr = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];
const directDirectionSignNames = [
  "Aries",
  "Taurus",
  "Gemini",
  "Libra",
  "Scorpio",
  "Sagittarius",
];

/**
 * @param {number} lagnaPositionCaluculation format lagna:lagna_signNumber
 *@param  {string} subPeriodCaluculation format planet_name:planet_signNumber
 */

router.post("/cheradasa", (req, res) => {
  console.log(req.body);
  const {
    lagna,
    bukthi,
    Moon,
    Mercury,
    Sun,
    Venus,
    Mars,
    Saturn,
    Jupiter,
    Ketu,
    marsDegree,
    ketuDegree,
    Rahu,
    rahuDegree,
    saturnDegree,
  } = req.body;

  console.log("Moon", Moon);
  //taking 9th house from lagna
  let houseNo = lagna + 8;

  // let Degree=Mars*30

  //checkin house no >12 or nor
  if (houseNo > 12) {
    houseNo = houseNo - 12;
  }

  // console.log(arr[houseNo-1])
  //checking element is in which direction
  const directDirection = directDirectionSignNames.includes(arr[houseNo - 1]);
  // console.log(directDirection)
  //array for store result
  let arr2 = [];

  //checking element direction
  if (directDirection) {
    for (let i = 0; i < 12; i++) {
      if (lagna + i - 1 < 12) {
        arr2.push(arr[lagna + i - 1]);
      } else {
        arr2.push(arr[lagna + i - 12 - 1]);
      }
    }
  } else {
    //counting current to reverse elements
    for (let i = lagna; i > 0; i--) {
      arr2.push(arr[i - 1]);
    }
    //counting current to forword direction
    for (let i = 12; i > lagna; i--) {
      arr2.push(arr[i - 1]);
    }
  }

  //shifting position of first element to last
  //now arr2 is shifted array
  let subArr = [];

  // res.send({data:arr2})

  //loop for get level2(shifting) array
  for (i of arr2) {
    if (i == bukthi) {
      for (let j = arr2.indexOf(i) + 1; j < 12 + arr2.indexOf(i) + 1; j++) {
        if (j >= 12) {
          let index = j - 12;
          subArr.push(arr2[index]);
        } else {
          subArr.push(arr2[j]);
        }
      }
    }
  }

  // console.log(subArr)

  //period caluculation

  //lordship for each planet
  const lordShipForSignNames = {
    Aries: "Mars",
    Taurus: "Venus",
    Gemini: "Mercury",
    Cancer: "Moon",
    Leo: "Sun",
    Virgo: "Mercury",
    Libra: "Venus",
    Scorpio: "Mars",
    Sagittarius: "Jupiter",
    Capricorn: "Saturn",
    Aquarius: "Saturn",
    Pisces: "Jupiter",
  };

  let positionOfLordArr = [];

  //loop for each planet
  for (i of arr) {
    let direction = directDirectionSignNames.includes(i);
    // console.log(i)
    if (direction) {
      //looping for search signNameRelatedLord
      for (let j = 1; j < 13; j++) {
        if (j == req.body[lordShipForSignNames[i]]) {
          // console.log(i)
          var ref = j;
          switch (i) {
            case "Taurus":
              {
                ref = ref - 1;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Gemini":
              {
                ref = ref - 2;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Libra":
              {
                ref = ref - 6;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Scorpio":
              {
                ref = ref - 7;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Sagittarius":
              {
                ref = ref - 8;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            default:
              break;
          }
          positionOfLordArr.push(ref);
          break;
        }
      }
    } else {
      for (let j = 1; j < 13; j++) {
        if (j == req.body[lordShipForSignNames[i]]) {
          // console.log(i)
          var ref = j;
          switch (i) {
            case "Cancer":
              {
                ref = ref - 3;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Leo":
              {
                ref = ref - 4;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Virgo":
              {
                ref = ref - 5;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;

            case "Capricorn":
              {
                ref = ref - 9;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Aquarius":
              {
                ref = ref - 10;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            case "Pisces":
              {
                ref = ref - 11;
                if (ref == 0) {
                  ref = 12;
                }
                if (ref < 0) {
                  ref = 12 + ref;
                }
              }
              break;
            default:
              break;
          }
          ref = 12 - ref + 2;
          if (ref > 12) {
            ref = ref - 12;
          }
          positionOfLordArr.push(ref);
          break;
        }
      }
    }
  }

  // console.log(positionOfLordArr)

  let planetsArr = [
    "Moon",
    "Mercury",
    "Sun",
    "Venus",
    "Mars",
    "Saturn",
    "Jupiter",
  ];
  let resultTable = [];
  let resultTable1 = [];
  let resultTable2 = [];

  if (Mars == 8 && Ketu == 8) {
    resultTable.push("mars and ketu is in 8th position => yes => 12");
    positionOfLordArr[7] = 12;
  } else if (Mars == 8) {
    let ketuPosition = Ketu + 5;
    if (ketuPosition > 12) {
      ketuPosition = ketuPosition - 12;
    }
    resultTable.push(`
        mars and ketu in 8th position => N0 => 0
        mars is in 8th position => yes => ${ketuPosition}
        `);
    positionOfLordArr[7] = ketuPosition;
  } else if (Ketu == 8) {
    let marsPosition = Mars + 5;
    if (marsPosition > 12) {
      marsPosition = marsPosition - 12;
    }
    resultTable.push(`
        mars and ketu in 8th position => No => 0
        mars is in 8th position => No => 0
        ketu is in 8th position => yes => ${marsPosition}
        `);
    positionOfLordArr[7] = marsPosition;
  } else {
    let planetSignNum = planetsArr.map((item) => req.body[item]);
    console.log(planetSignNum);
    let ketuCount = 0;
    let marsCount = 0;
    planetSignNum.map((i) => {
      if (i == Ketu) {
        ketuCount++;
      }
      if (i == Mars) {
        marsCount++;
      }
    });
    //mars caluculating it self so remove self we deducing -1
    marsCount = marsCount - 1;
    console.log(ketuCount, marsCount);
    if (ketuCount > marsCount) {
      let ketuPosition1 = Ketu + 5;
      if (ketuPosition1 > 12) {
        ketuPosition1 = ketuPosition1 - 12;
      }
      resultTable.push(`
            mars and ketu in 8th position => No => 0
            mars is in 8th position => No => 0
            ketu is in 8th position => No => 0
            ketu has high assosiation => yes => ${ketuPosition1}
            `);
      positionOfLordArr[7] = ketuPosition1;
    } else if (marsCount > ketuCount) {
      let marsPosition1 = Ketu + 5;
      if (marsPosition1 > 12) {
        marsPosition1 = marsPosition1 - 12;
      }
      resultTable.push(`
            mars and ketu in 8th position => No => 0
            mars is in 8th position => No => 0
            ketu is in 8th position => No => 0
            ketu has high assosiation => No => 0
            mars has high assisiation => yes => ${marsPosition1}
            `);
      positionOfLordArr[7] = marsPosition1;
    } else if (marsCount == marsCount) {
      if (marsDegree > ketuDegree) {
        let marsPosition2 = Ketu + 5;
        if (marsPosition2 > 12) {
          marsPosition2 = marsPosition2 - 12;
        }
        resultTable.push(`
               mars and ketu in 8th position => No => 0
               mars is in 8th position => No => 0
               ketu is in 8th position => No => 0
               ketu and mars has equal assosiation => Yes => 0
               mars has highest degree => yes => ${marsPosition2}
               `);
        positionOfLordArr[7] = marsPosition2;
      } else {
        let ketuPosition2 = Ketu + 5;
        if (ketuPosition2 > 12) {
          ketuPosition2 = ketuPosition2 - 12;
        }
        resultTable.push(`
                mars and ketu in 8th position => No => 0
                mars is in 8th position => No => 0
                ketu is in 8th position => No => 0
                ketu and mars has equal assosiation => Yes => checking degree
                mars has highest degree => No => 0
                ketu has highest degree => yes => ${ketuPosition2}
                `);
        positionOfLordArr[7] = ketuPosition2;
      }
    }
  }

  if (Saturn == 11 && Rahu == 11) {
    resultTable2.push("saturn and rahu is in 11th position => yes => 12");
    positionOfLordArr[10] = 12;
  } else if (Saturn == 11) {
    let rahuPosition = 12 - Rahu;
    if (rahuPosition == 0) {
      rahuPosition = rahuPosition + 12;
    }
    resultTable2.push(`
        "saturn and rahu is in 11th position => No => 0"
        saturn is in 11th position => yes => ${rahuPosition}
        `);
    positionOfLordArr[10] = rahuPosition;
  } else if (Rahu == 11) {
    let saturnPosition = 12 - Mars;
    if (saturnPosition == 0) {
      saturnPosition = saturnPosition + 12;
    }
    resultTable2.push(`
        saturn and rahu is in 11th position => No => 0
        saturn is in 11th position => No => 0
        rahu is in 11th position => yes => ${saturnPosition}
        `);
    positionOfLordArr[10] = saturnPosition;
  } else {
    let planetSignNum = planetsArr.map((item) => req.body[item]);
    console.log(planetSignNum);
    let rahuCount = 0;
    let saturnCount = 0;
    planetSignNum.map((i) => {
      if (i == Rahu) {
        rahuCount++;
      }
      if (i == Saturn) {
        saturnCount++;
      }
    });
    //saturn caluculating it self so remove self we deducing -1
    saturnCount = saturnCount - 1;
    console.log(rahuCount, saturnCount);
    if (rahuCount > saturnCount) {
      let rahuPosition1 = 12 - Rahu;
      if (rahuPosition1 == 0) {
        rahuPosition1 = rahuPosition1 + 12;
      }
      resultTable2.push(`
            saturn and rahu is in 11th position => No => 0
            saturn is in 11th position => No => 0
            rahu is in 11th position => No => 0
            rahu has high assisiation => yes => ${rahuPosition1}
            `);
      positionOfLordArr[10] = rahuPosition1;
    } else if (saturnCount > rahuCount) {
      let saturnPosition1 = 12 - Rahu;
      if (saturnPosition1 == 0) {
        saturnPosition1 = saturnPosition1 + 12;
      }
      resultTable2.push(`
            saturn and rahu is in 11th position => No => 0
            saturn is in 11th position => No => 0
            rahu is in 11th position => No => 0
            rahu has high assisiation => No => 0
            saturn has high assisiation => yes => ${saturnPosition1}
            `);
      positionOfLordArr[10] = saturnPosition1;
    } else if (rahuCount == saturnCount) {
      if (saturnDegree > rahuDegree) {
        let saturnPosition2 = 12 - Rahu;
        if (saturnPosition2 == 0) {
          saturnPosition2 = saturnPosition2 + 12;
        }
        resultTable2.push(`
                saturn and rahu is in 11th position => No => 0
                saturn is in 11th position => No => 0
                rahu is in 11th position => No => 0
                rahu and saturn has equal assisiation => Yes => checking degree
                saturn has highest degree => yes => ${saturnPosition2}
               `);
        positionOfLordArr[10] = saturnPosition2;
      } else {
        let rahuPosition2 = 12 - Rahu;
        if (rahuPosition2 == 0) {
          rahuPosition2 = rahuPosition2 + 12;
        }
        resultTable2.push(`
                saturn and rahu is in 11th position => No => 0
                saturn is in 11th position => No => 0
                rahu is in 11th position => No => 0
                rahu and saturn has equal assisiation => Yes => checking degree
                saturn has highest degree => No => 0
                rahu has highest degree => yes => ${rahuPosition2}
                `);
        positionOfLordArr[10] = rahuPosition2;
      }
    }
  }

  let resultArr = [];
  positionOfLordArr.map((i) => {
    if (i == 1) {
      resultArr.push(12);
    } else {
      resultArr.push(i - 1);
    }
  });
  // console.dir(resultTable)
  // console.log(resultTable1)
  // console.log(resultTable2)
  console.log(subArr);
  res.json({ subArr, resultArr, Moon });
});

module.exports = router;

/*

what we need to do if both mars and ketu at otherthan own sign
[      
  mars and ketu in 8th position => No => 0     
  
  mars is in 8th position => No => 0         
  
  ketu is in 8th position => No => 0       
  
  ketu and mars has equal assosiation => Yes => checking degree
  
  mars has highest degree => No => 0     
  
  ketu has highest degree => yes => 8         "
]

*/

/**
 saturn and rahu is in 11th position => No => 0  
 
 saturn is in 11th position => No => 0      
 
 rahu is in 11th position => No => 0       
 
 rahu has high assisiation => yes => 10 
 */
