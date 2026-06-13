import './ReviewBox.css'
import defaultRestroom from '../../assets/bathroomPhotos/1stFloorMenR115.jpg'
import female from '../../assets/genderIcons/smallBlueFemale.svg'
import male from '../../assets/genderIcons/smallBlueMale.svg'
import neutral from '../../assets/genderIcons/smallBlueNeutral.svg'
import trash from '../../assets/trash.svg'

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
  gender,
  supplies = 0,
  footTraffic = 0,
  cleanliness = 0,
  aesthetics = 0,
  image = defaultRestroom,
  imageAlt = 'Restroom photo',
  reviewId,
  loadReviews
}) {

  async function deleteReview() {
    console.log('deleting');

    try {
      const response = await fetch(
      'http://localhost:5000/reviews/'
      + reviewId + '/delete',
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      await loadReviews();

    } catch(error) {
      console.log('Error while deleting. :(');
      return;
    }
  }

  return (
    <div className="review-box">
      <div className="review-main">
        <div className="review-header">
          <h2 className="review-floor">
            {floor}

            {reviewId && 
              <button className='delete-review' onClick={deleteReview}>
                <img src={trash} alt='Trash Icon'/>
              </button>
            }
          </h2>
          {dateAdded && (
            <span className="review-date">{dateAdded}</span>
          )}
        </div>

        <div className="review-text-box">
          <p className="review-text">{review}</p>
          {((gender === 'female') && <img className='review-gender' src={female} alt='Female Icon'/>) ||
           ((gender === 'male') && <img className='review-gender' src={male} alt='Male Icon'/>) || 
           <img className='review-gender' src={neutral} alt='Gender Neutral Icon'/>
          }
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
