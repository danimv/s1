const mongoose = require("mongoose");

const contribDataSchema = new mongoose.Schema({
  name: String,
  description: String,
  unit: String
});

const contribTypes = mongoose.model("contribtypes", contribDataSchema);

module.exports = contribTypes;
