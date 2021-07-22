const mongoose = require("mongoose");

const timeSchema = mongoose.Schema({
  country_name: { type: String },
  timezone_name: { type: String },
  timezone_description: { type: String },
  utc_offset: { type: String },
  dst: { type: String },
});

module.exports = mongoose.model("timezones", timeSchema);
