const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const OdaGetTest = new Schema({
  dbname: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("oda_get_test", OdaGetTest);
