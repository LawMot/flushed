import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import Review from './models/Review.js'

// Inserts a couple of sample reviews so you can confirm the database works.
// Run with:  npm run seed
const sampleReviews = [
  {
    building: 'HUB',
    floor: 'Floor 1',
    restroom: 'Restroom A',
    gender: 'female',
    description: 'Very clean and well stocked.',
    ratings: { supplies: 4, footTraffic: 3, cleanliness: 5, aesthetic: 4 },
  },
  {
    building: 'Rivera Library',
    floor: 'Floor 2',
    restroom: 'Restroom B',
    gender: 'male',
    description: 'Crowded between classes but otherwise fine.',
    ratings: { supplies: 2, footTraffic: 5, cleanliness: 3, aesthetic: 2 },
  },
]

async function seed() {
  await connectDB()
  await Review.deleteMany({})
  const inserted = await Review.insertMany(sampleReviews)
  console.log(` Inserted ${inserted.length} sample reviews`)
  await mongoose.connection.close()
  process.exit(0)
}

seed()
