import './ReviewBox.css'

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
  avatar,
  name,
  username,
  review,
  supplies = 0,
  footTraffic = 0,
  cleanliness = 0,
  aesthetic = 0,
  image,
  imageAlt = '',
}) {
  return (
    <div className="review-box">
      <div className="review-header">
        {avatar && (
          <img className="review-avatar" src={avatar} alt={name || 'user'} />
        )}
        <div className="review-identity">
          <span className="review-name">{name}</span>
          {username && (
            <span className="review-username">@{username}</span>
          )}
        </div>
      </div>

      <div className="review-body">
        <div className="review-text-box">
          <p className="review-text">{review}</p>
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
            <span className="review-rating-label">Aesthetic</span>
            <Stars value={aesthetic} />
          </div>
        </div>

        {image && (
          <img className="review-image" src={image} alt={imageAlt} />
        )}
      </div>
    </div>
  )
}

export default ReviewBox
