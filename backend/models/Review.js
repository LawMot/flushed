const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: String,
    body: String,
    gender: String,
    supplies: Number,
    foot_traffic: Number,
    cleanliness: Number,
    aesthetics: Number
});

module.exports = mongoose.model('Review', ReviewSchema);