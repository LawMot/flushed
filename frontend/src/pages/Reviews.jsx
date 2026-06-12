import './Reviews.css'
import ReviewBox from '../components/bathoom/ReviewBox';
import { useEffect, useState } from 'react';

function Reviews() {
    const [myReviews, setMyReviews] = useState([]);
    const [error, setError] = useState(null);

    async function getMyReviews() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/reviews/' + userId, {
                credentials: 'include',
            });

            const reviews = await response.json();

            setMyReviews(reviews || []);
            setError(null);
        } catch(error) {
            setMyReviews([]);
            setError('Error fetching reviews.');
            return;
        }
    }

    useEffect(() => {
        getMyReviews();
    }, [])

    return (
        <div id="reviews-page">
            <p id="page-title">My Reviews</p>
            {error && <p className="reviews-error">{error}</p>}
            {myReviews.length === 0 && !error && (
                <p className="reviews-empty">You have no reviews.</p>
            )}
            {myReviews.map((review) => (
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
                    image={review.image?.data ? `data:${review.image.contentType};base64,${review.image.data}` : undefined}
                    reviewId={review._id}
                />
            ))}
        </div>
    )
}

export default Reviews;
