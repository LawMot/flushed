// import mongoose from 'mongoose'
const mongoose = require('mongoose');

// Sub-document for the four star ratings shown on a ReviewBox / CreateReview.
// Half-stars are allowed, so values can be 0, 0.5, 1, ... 5.
const ratingsSchema = new mongoose.Schema(
  {
    supplies: { type: Number, min: 0, max: 5, default: 0 },
    footTraffic: { type: Number, min: 0, max: 5, default: 0 },
    cleanliness: { type: Number, min: 0, max: 5, default: 0 },
    aesthetic: { type: Number, min: 0, max: 5, default: 0 },
  },
  { _id: false }
)

// A single review (the "ReviewBox" / "event card") submitted from CreateReview.
const reviewSchema = new mongoose.Schema(
  {
    building: { type: String, required: true, trim: true },
    floor: { type: String, required: true, trim: true },
    restroom: { type: String, trim: true },
    gender: {
      type: String,
      enum: ['female', 'male', 'nonbinary'],
    },
    ratings: { type: ratingsSchema, default: () => ({}) },
    description: { type: String, trim: true, default: '' },

    // The uploaded photo is stored inline as a base64 data string so it works
    // on Atlas without a separate file host. Optional.
    image: {
      data: { type: String }, // base64-encoded image bytes
      contentType: { type: String }, // e.g. "image/png" or "image/jpeg"
    },
  },
  { timestamps: true } // adds createdAt / updatedAt
)
module.exports = mongoose.model('Review', reviewSchema);

// export default mongoose.model('Review', reviewSchema)
// const mongoose = require('mongoose');

// const ReviewSchema = new mongoose.Schema({
//     userId: String,
//     body: String,
//     gender: String,
//     supplies: Number,
//     foot_traffic: Number,
//     cleanliness: Number,
//     aesthetics: Number
// });

// module.exports = mongoose.model('Review', ReviewSchema);
