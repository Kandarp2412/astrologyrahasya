// const swisseph = require("swisseph");
const jyotish = require("jyotish");
const { ...constants } = require("./constants");
const getGrahasPosition = require("./grahasPosition");

function getBirthChart(dateString, timeString, lat, lng, timezone, ayanamsha) {
  // console.log(calculateHouses({ dateString, timeString, lat, lng, timezone }));
  const grahaPositions = getGrahasPosition(
    { dateString, timeString, lat, lng, timezone },
    { zodiacType: "S", houseType: "P", ayanamsha }
  );

  const birthChart = {
    aries: {
      rashi: "aries",
      signs: [],
    },
    taurus: {
      rashi: "taurus",
      signs: [],
    },
    gemini: {
      rashi: "gemini",
      signs: [],
    },
    cancer: {
      rashi: "cancer",
      signs: [],
    },
    leo: {
      rashi: "leo",
      signs: [],
    },
    virgo: {
      rashi: "virgo",
      signs: [],
    },
    libra: {
      rashi: "libra",
      signs: [],
    },
    scorpio: {
      rashi: "scorpio",
      signs: [],
    },
    sagittarius: {
      rashi: "sagittarius",
      signs: [],
    },
    capricorn: {
      rashi: "capricorn",
      signs: [],
    },
    aquarius: {
      rashi: "aquarius",
      signs: [],
    },
    pisces: {
      rashi: "pisces",
      signs: [],
    },
    meta: {},
  };

  Object.values(grahaPositions).map((graha) => {
    birthChart[constants.RASHIS[graha.rashi]].signs.push({
      graha: graha.graha,
      nakshatra: graha.nakshatra,
      longitude: graha.longitude,
      isRetrograde: graha.isRetrograde,
    });
    birthChart.meta[graha.graha] = {
      rashi: graha.rashi,
      graha: graha.graha,
      nakshatra: graha.nakshatra,
      longitude: graha.longitude,
      isRetrograde: graha.isRetrograde,
    };
  });

  return birthChart;
}

// module.exports = { getBirthChart };

function getprogresssionChart(
  dateString,
  timeString,
  lat,
  lng,
  timezone,
  ayanamsha
) {
  // console.log(calculateHouses({ dateString, timeString, lat, lng, timezone }));
  const grahaPositions = getGrahasPosition(
    { dateString, timeString, lat, lng, timezone },
    { zodiacType: "S", houseType: "P", ayanamsha }
  );

  const progressionChart = {
    aries: {
      rashi: "aries",
      signs: [],
    },
    taurus: {
      rashi: "taurus",
      signs: [],
    },
    gemini: {
      rashi: "gemini",
      signs: [],
    },
    cancer: {
      rashi: "cancer",
      signs: [],
    },
    leo: {
      rashi: "leo",
      signs: [],
    },
    virgo: {
      rashi: "virgo",
      signs: [],
    },
    libra: {
      rashi: "libra",
      signs: [],
    },
    scorpio: {
      rashi: "scorpio",
      signs: [],
    },
    sagittarius: {
      rashi: "sagittarius",
      signs: [],
    },
    capricorn: {
      rashi: "capricorn",
      signs: [],
    },
    aquarius: {
      rashi: "aquarius",
      signs: [],
    },
    pisces: {
      rashi: "pisces",
      signs: [],
    },
    meta: {},
  };

  Object.values(grahaPositions).map((graha) => {
    progressionChart[constants.RASHIS[graha.rashi]].signs.push({
      graha: graha.graha,
      nakshatra: graha.nakshatra,
      longitude: graha.longitude,
      isRetrograde: graha.isRetrograde,
    });
    progressionChart.meta[graha.graha] = {
      rashi: graha.rashi,
      graha: graha.graha,
      nakshatra: graha.nakshatra,
      longitude: graha.longitude,
      isRetrograde: graha.isRetrograde,
    };
  });

  return progressionChart;
}

function gettransitChart(
  dateString,
  timeString,
  lat,
  lng,
  timezone,
  ayanamsha
) {
  // console.log(calculateHouses({ dateString, timeString, lat, lng, timezone }));
  const grahaPositions = getGrahasPosition(
    { dateString, timeString, lat, lng, timezone },
    { zodiacType: "S", houseType: "P", ayanamsha }
  );

  const transitChart = {
    aries: {
      rashi: "aries",
      signs: [],
    },
    taurus: {
      rashi: "taurus",
      signs: [],
    },
    gemini: {
      rashi: "gemini",
      signs: [],
    },
    cancer: {
      rashi: "cancer",
      signs: [],
    },
    leo: {
      rashi: "leo",
      signs: [],
    },
    virgo: {
      rashi: "virgo",
      signs: [],
    },
    libra: {
      rashi: "libra",
      signs: [],
    },
    scorpio: {
      rashi: "scorpio",
      signs: [],
    },
    sagittarius: {
      rashi: "sagittarius",
      signs: [],
    },
    capricorn: {
      rashi: "capricorn",
      signs: [],
    },
    aquarius: {
      rashi: "aquarius",
      signs: [],
    },
    pisces: {
      rashi: "pisces",
      signs: [],
    },
    meta: {},
  };

  Object.values(grahaPositions).map((graha) => {
    transitChart[constants.RASHIS[graha.rashi]].signs.push({
      graha: graha.graha,
      nakshatra: graha.nakshatra,
      longitude: graha.longitude,
      isRetrograde: graha.isRetrograde,
    });
    transitChart.meta[graha.graha] = {
      rashi: graha.rashi,
      graha: graha.graha,
      nakshatra: graha.nakshatra,
      longitude: graha.longitude,
      isRetrograde: graha.isRetrograde,
    };
  });

  return transitChart;
}

module.exports = { getBirthChart, getprogresssionChart, gettransitChart };
// module.exports = { getprogresssionChart };
