import SmallProfile from "../components/home/smallProfile";
import ReviewBox from '../components/bathoom/ReviewBox'
import './Home.css'

function Home() {
    return (
        <div id="home-page">
            <SmallProfile name={"Jane Doe"} username={"janedoe"} xp={20} numReviews={3}/>
            <div id="home-column">
                <p id="page-title">Home</p>
                <ReviewBox/>
            </div>
        </div>
    )
}

export default Home;