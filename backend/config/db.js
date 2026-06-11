import mongoose from 'mongoose'

// Connects to MongoDB Atlas using the connection string in .env (MONGODB_URI).
export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('❌ MONGODB_URI is missing. Copy .env.example to .env and paste your Atlas connection string.')
    process.exit(1)
  }

  try {
    await mongoose.connect(uri)
    console.log('✅ Connected to MongoDB Atlas')
  } catch (err) {
    console.error('❌ Could not connect to MongoDB:', err.message)
    process.exit(1)
  }
}
