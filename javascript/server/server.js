// const compression = require('compression');
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();
// app.use(compression());
// app.disable('x-powered-by');
// app.use(express.static(path.join(__dirname, 'build')));
// // need to declare a "catch all" route on your express server
// // that captures all page requests and directs them to the client
// // the react-router do the route part
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.listen(process.env.PORT || 5000, function() {
//   console.log(`Frontend start on http://localhost:5000`);
// });

const express = require("express");
const astroreha = require("./routes/astroreha");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
var { db } = require("./db/index");
const sequelize = require("sequelize");
const timezone = require("./models/timezone");
const cheradasa = require("./routes/astro/cheraDasa");
const yoginiDasa = require("./routes/astro/yoginiDasa");
const astakavarga = require("./routes/astro/astakavarga");
const mongoose = require("mongoose");
require("dotenv").config();
// const astakavarga = require("./routes/astro/astakavarga");

const {
  modela,
  modelb,
  modelc,
  modeld,
  modele,
  modelf,
  modelg,
  modelh,
  modeli,
  modelj,
  modelk,
  modell,
  modelm,
  modeln,
  modelo,
  modelp,
  modelq,
  modelr,
  models,
  modelt,
  modelu,
  modelv,
  modelw,
  modelx,
  modely,
  modelz,
} = require("./models/index");

const URI = process.env.MONGO_URI;
mongoose.connect(
  "mongodb+srv://Admin:Admin@cluster0.c7mzg.mongodb.net/Astrology?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Db connected....");
  }
);

console.log("db");
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
app.use("/api", astroreha);
// app.use("/api", cheraDasa);
app.use("/api", yoginiDasa);
app.use("/api", astakavarga);
app.use("/api", cheradasa);

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
  // res.send({ data: search });
});

app.get("/search", async function (req, res) {
  const [result, resultmeta] = await db.sequelize.query(
    "SELECT * FROM information_schema.tables WHERE table_schema = 'astrology'"
  );
  res.send({ data: result });
});

app.post("/birthsearch", async function (req, res) {
  console.log(req.body.selectedCountry);
  const [search, resultmeta] = await db.sequelize.query(
    "SELECT * FROM " + req.body.selectedCountry + " "
  );
  // console.log(search);
  res.send({ data: search });
});

app.post("/sublevel", async function (req, res) {
  let arr = req.body.subLevel3;
  // console.log(arr);

  let result = arr === null ? [] : arr.map((item) => item.subLevel);
  res.json({ data: result });
});

app.post("/userprofile", async function (req, res) {
  // console.log("req.body.formData");
  console.log("hear=>", req.body);
  const [userprofile, resultmeta] = await db.sequelize.query(
    "INSERT INTO user_profiles (name,date,birthplace,moon_sign,createdAt,updatedAt) VALUES ('" +
      req.body.formData.name +
      "','" +
      req.body.formData.birthDate +
      "','vadodara,gujarat,india','" +
      req.body.moonSign +
      "','2021-04-24','2021-04-24')"
  );
  // console.log(userprofile);
  res.send({ data: userprofile });

  // const [search, resultmeta] = await db.sequelize.query(
  //   "INSERT INTO user_profiles (name, date, time) VALUES (" +
  //     req.body.formData.name +
  //     ", " +
  //     req.body.formData.birthDate +
  //     ", " +
  //     req.body.formData.birthTime +
  //     "); "
  // );
  // console.log(search);
  // res.send({ data: search });
});

let northernCountry = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Canada",
  "China",
  "France",
  "Germany",
  "Hungary",
  "India",
  "Japan",
  "Mexico",
  "Netherlands",
  "Norway",
  "Poland",
  "Romania",
  "Russia",
  "Spain",
  "Sweden",
  "Switzerland",
  "United_Kingdom",
  "Ukraine",
  "United_States",
];
let SoutherCountry = [
  "Argentina",
  "Australia",
  "Bolivia",
  "Brazil",
  "Chile",
  "New_Zealand",
  "Paraguay",
  "Peru",
  "South_Africa",
  "Uruguay",
];

app.post("/searching3", async (req, res) => {
  // console.log(req.body)
  let { search } = req.body;
  let data;
  if (!search) {
    return res.send({ data: [] });
  }
  search = search.toLowerCase();
  if (search.startsWith("a")) {
    data = await modela.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("b")) {
    data = await modelb.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("c")) {
    data = await modelc.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("d")) {
    data = await modeld.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("e")) {
    data = await modele.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("f")) {
    data = await modelf.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("g")) {
    data = await modelg.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("h")) {
    data = await modelh.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("i")) {
    data = await modeli.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("j")) {
    data = await modelj.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("k")) {
    data = await modelk.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("l")) {
    data = await modell.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("m")) {
    data = await modelm.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("n")) {
    data = await modeln.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("o")) {
    data = await modelo.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("p")) {
    data = await modelp.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("q")) {
    data = await modelq.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("r")) {
    data = await modelr.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("s")) {
    data = await models.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("t")) {
    data = await modelt.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("u")) {
    data = await modelu.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("v")) {
    data = await modelv.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("w")) {
    data = await modelw.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("x")) {
    data = await modelx.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("y")) {
    data = await modely.find({ place: new RegExp("^" + search, "i") }).lean();
  } else if (search.startsWith("z")) {
    data = await modelz.find({ place: new RegExp("^" + search, "i") }).lean();
  } else {
    data = [{ data: [] }];
  }
  if (search === "chennai") {
    data = data.splice(1);
  }
  data ? res.send({ data: data.splice(0, 50) }) : res.send({ data: [] });
});

app.post("/timezone", async (req, res) => {
  console.log(northernCountry.includes(req.body.locationVal));
  console.log(SoutherCountry.includes(req.body.locationVal));
  var country;
  try {
    country = await timezone.findOne({ country_name: req.body.locationVal });
    res.send({ data: country.utc_offset });
    res.send({ data: country.dst });
  } catch {
    console.log("error");
  }
});

app.post("/userdata", async function (req, res) {
  const [userdata, resultmeta] = await db.sequelize.query("SELECT * FROM user_profiles");
  // console.log(userdata);
  res.send({ data: userdata });
});

app.listen(9002, (err) => {
  if (err) console.log(err);
  console.log("running on http://localhost:9002");
  db.sequelize.authenticate();
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
