import { useEffect, useState } from 'react'
import ReviewBox from '../bathoom/ReviewBox'

// Base URL of the Express backend. Override with VITE_API_URL in a .env file
// if the backend runs somewhere other than localhost:5000.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'


function imageSrc(image) {
  if (!image?.data || !image?.contentType) return undefined
  return `data:${image.contentType};base64,${image.data}`
}


// How often (ms) to poll the backend for newly added reviews.
const POLL_INTERVAL = 10000

function ReviewCardPopulater({ limit }) {
  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let active = true

    async function loadReviews() {
      try {
        const res = await fetch(`${API_URL}/reviews`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (!active) return
        setReviews(Array.isArray(data) ? data : [])
        setStatus('ready')
      } catch (err) {
        console.error('Failed to load reviews:', err)
        // Keep showing whatever is already on screen; only surface the error
        // state if we never managed to load anything.
        if (active) setStatus((prev) => (prev === 'loading' ? 'error' : prev))
      }
    }

    loadReviews()

    // Refetch on an interval so new reviews (including ones added by other
    // users) appear without a manual page refresh.
    const intervalId = setInterval(loadReviews, POLL_INTERVAL)

    // Also refetch as soon as the tab/window regains focus, so coming back
    // after submitting a review shows it right away.
    const onFocus = () => loadReviews()
    window.addEventListener('focus', onFocus)

    return () => {
      active = false
      clearInterval(intervalId)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

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
          supplies={review.ratings?.supplies ?? 0}
          footTraffic={review.ratings?.footTraffic ?? 0}
          cleanliness={review.ratings?.cleanliness ?? 0}
          aesthetics={review.ratings?.aesthetic ?? 0}
          image={imageSrc(review.image)}
          imageAlt={`${review.building} ${review.floor} restroom`}
        />
      ))}
    </div>
  )
}

export default ReviewCardPopulater
