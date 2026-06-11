import './Reviews.css'
import ReviewBox from '../components/bathoom/ReviewBox';

function Reviews() {
    return (
        <div id="reviews-page">
            <p id="page-title">My Reviews</p>
            <div>
                <ReviewBox/>
            </div>
        </div>
    )
}

export default Reviews;
