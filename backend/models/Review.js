const mongoose = require('mongoose')

const ratingsSchema = new mongoose.Schema(
  {
    supplies: { type: Number, min: 0, max: 5, default: 0 },
    footTraffic: { type: Number, min: 0, max: 5, default: 0 },
    cleanliness: { type: Number, min: 0, max: 5, default: 0 },
    aesthetic: { type: Number, min: 0, max: 5, default: 0 },
  },
  { _id: false }
)

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

    image: {
      data: { type: String },
      contentType: { type: String },
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

reviewSchema.virtual('dateAdded').get(function () {
  if (!this.createdAt) return null
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

module.exports = mongoose.model('Review', reviewSchema)
