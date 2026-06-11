import './ReviewBox.css'
import defaultRestroom from '../../assets/bathroomPhotos/1stFloorMenR115.jpg'

function Stars({ value = 0, max = 5 }) {
  return (
    <span className="review-stars" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={i < value ? 'review-star filled' : 'review-star'}
        >
          {i < value ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

function ReviewBox({
  floor,
  review,
  dateAdded,
  supplies = 0,
  footTraffic = 0,
  cleanliness = 0,
  aesthetics = 0,
  image = defaultRestroom,
  imageAlt = 'Restroom photo',
}) {
  return (
    <div className="review-box">
      <div className="review-main">
        <div className="review-header">
          <h2 className="review-floor">{floor}</h2>
          <span className="review-subtitle">Most Recent Review:</span>
          {dateAdded && (
            <span className="review-date">Added {dateAdded}</span>
          )}
        </div>

        <div className="review-text-box">
          <p className="review-text">{review}</p>
        </div>
      </div>

      <div className="review-ratings">
        <div className="review-rating-row">
          <span className="review-rating-label">Supplies</span>
          <Stars value={supplies} />
        </div>
        <div className="review-rating-row">
          <span className="review-rating-label">Foot Traffic</span>
          <Stars value={footTraffic} />
        </div>
        <div className="review-rating-row">
          <span className="review-rating-label">Cleanliness</span>
          <Stars value={cleanliness} />
        </div>
        <div className="review-rating-row">
          <span className="review-rating-label">Aesthetics</span>
          <Stars value={aesthetics} />
        </div>
      </div>

      {image && (
        <img className="review-image" src={image} alt={imageAlt} />
      )}
    </div>
  )
}

export default ReviewBox
