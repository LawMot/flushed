import SmallProfile from "../components/home/smallProfile";
import ReviewCardPopulater from '../components/home/ReviewCardPopulater'
import './Home.css'

function Home() {
    return (
        <div id="home-page">
            <SmallProfile/>
            <div id="home-column">
                <p id="page-title">Home</p>
                <ReviewCardPopulater/>
            </div>
        </div>
    )
}

export default Home;