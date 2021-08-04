const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  time: { type: String },
  date: { type: String },
  birthPlace: { type: String },
  moonSign: { type: String },
  chartType: { type: String },
  relation: { type: String },
  favorite: { type: Boolean },
  timezone: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

module.exports = mongoose.model("users", userSchema);
