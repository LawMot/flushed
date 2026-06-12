import { useEffect, useState } from 'react'
import ReviewBox from '../bathoom/ReviewBox'
import { getRestroomPhoto } from '../../data/bathrooms'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function imageSrc(image) {
  if (!image?.data || !image?.contentType) return undefined
  return `data:${image.contentType};base64,${image.data}`
}

const POLL_INTERVAL = 10000

function buildQuery(filter) {
  if (!filter) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filter)) {
    if (value != null && value !== '') params.append(key, value)
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

function byNewest(a, b) {
  return new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0)
}

function ReviewCardPopulater({ limit, filter }) {
  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState('loading')

  const filterKey = JSON.stringify(filter ?? {})

  useEffect(() => {
    let active = true

    async function loadReviews() {
      try {
        const res = await fetch(`${API_URL}/reviews${buildQuery(filter)}`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (!active) return
        const list = Array.isArray(data) ? [...data].sort(byNewest) : []
        setReviews(list)
        setStatus('ready')
      } catch (err) {
        console.error('Failed to load reviews:', err)

        if (active) setStatus((prev) => (prev === 'loading' ? 'error' : prev))
      }
    }

    loadReviews()

    const intervalId = setInterval(loadReviews, POLL_INTERVAL)

    const onFocus = () => loadReviews()
    window.addEventListener('focus', onFocus)

    return () => {
      active = false
      clearInterval(intervalId)
      window.removeEventListener('focus', onFocus)
    }
  }, [filterKey])

  if (status === 'loading') {
    return <p className="review-feed-message">Loading reviews…</p>
  }

  if (status === 'error') {
    return (
      <p className="review-feed-message">
        Couldn’t load reviews. Make sure the backend is running.
      </p>
    )
  }

  if (reviews.length === 0) {
    return <p className="review-feed-message">No reviews yet. Be the first!</p>
  }

  const visible = limit ? reviews.slice(0, limit) : reviews

  return (
    <div className="review-feed">
      {visible.map((review) => (
        <ReviewBox
          key={review._id}
          floor={`${review.building} — ${review.floor}`}
          review={review.description}
          dateAdded={review.dateAdded}
          gender={review.gender}
          supplies={review.ratings?.supplies ?? 0}
          footTraffic={review.ratings?.footTraffic ?? 0}
          cleanliness={review.ratings?.cleanliness ?? 0}
          aesthetics={review.ratings?.aesthetic ?? 0}
          image={
            imageSrc(review.image) ??
            getRestroomPhoto(review.floor, review.restroom, review.gender)
          }
          imageAlt={`${review.building} ${review.floor} restroom`}
        />
      ))}
    </div>
  )
}

export default ReviewCardPopulater
