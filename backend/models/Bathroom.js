const mongoose = require("mongoose");

const bathroomSchema = new mongoose.Schema({
  building: String,
  floor: String,
  restroom: String,
  gender: String,
  supplies: Number,
  traffic: Number,
  cleanliness: Number,
  aesthetics: Number
});

module.exports = mongoose.model('Bathroom', bathroomSchema)
