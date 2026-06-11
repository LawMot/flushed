const Review = require('../models/Review')

function parseRatings(body) {
  if (body.ratings) {
    return typeof body.ratings === 'string' ? JSON.parse(body.ratings) : body.ratings
  }
  return {
    supplies: Number(body.supplies) || 0,
    footTraffic: Number(body.footTraffic) || 0,
    cleanliness: Number(body.cleanliness) || 0,
    aesthetic: Number(body.aesthetic) || 0,
  }
}

async function createReview(req, res) {
  try {
    const { building, floor, restroom, gender, description } = req.body

    const review = new Review({
      building,
      floor,
      restroom,
      gender,
      description,
      ratings: parseRatings(req.body),
    })

    if (req.file) {
      review.image = {
        data: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype,
      }
    }

    const saved = await review.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function getReviews(req, res) {
  try {
    const { building, floor, restroom, gender } = req.query
    const filter = {}
    if (building) filter.building = building
    if (floor) filter.floor = floor
    if (restroom) filter.restroom = restroom
    if (gender) filter.gender = gender

    const reviews = await Review.find(filter).sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getReviewById(req, res) {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) return res.status(404).json({ error: 'Review not found' })
    res.json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function updateReview(req, res) {
  try {
    const update = { ...req.body }
    if (req.body.ratings || req.body.supplies !== undefined) {
      update.ratings = parseRatings(req.body)
    }
    if (req.file) {
      update.image = {
        data: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype,
      }
    }

    const review = await Review.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    })
    if (!review) return res.status(404).json({ error: 'Review not found' })
    res.json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function deleteReview(req, res) {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) return res.status(404).json({ error: 'Review not found' })
    res.json({ message: 'Review deleted', id: req.params.id })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
<<<<<<< HEAD
};
=======
}
>>>>>>> temp-fix
