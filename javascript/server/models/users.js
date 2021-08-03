const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  time: { type: String },
  date: { type: String },
  birthPlace: { type: String },
  chartType: { type: String },
  relation: { type: String },
  favorite: { type: Boolean },
  profile:{type:String},
  latitude : {type:String},
  longitude:{type:String},
  timezone :{type:String},
  sun : {type:String},
  moon : {type:String},
  mars : {type:String},
  venus : {type:String},
  mercury : {type:String},
  jupitor : {type:String},
  rahu : {type:String},
  ketu : {type:String},
  saturn : {type:String},
});

module.exports = mongoose.model("users", userSchema);
