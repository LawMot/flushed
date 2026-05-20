import SmallProfile from "../components/home/smallProfile";

function Home() {
    return (
        <div>
            Home Page
            <SmallProfile name={"Jane Doe"} username={"janedoe"} xp={20} numReviews={3}/>
        </div>
    )
}

export default Home;