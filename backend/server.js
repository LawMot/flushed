import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import reviewRoutes from './routes/reviews.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Flushed backend is running' })
})

app.use('/api/reviews', reviewRoutes)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
  })
})
