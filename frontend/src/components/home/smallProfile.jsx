import './smallProfile.css';
import SmallRank from './smallRank';
import pfp from '../../assets/smallPfpDefault.png'

function SmallProfile({ name, username, xp, numReviews}) {
    return (
        <div className='gradient' id='smallProfile'>
            <img id='pfp' src={pfp} alt='User Profile Picture'/>
            <p id='name'>{name}</p>
            <p id='username'>@{username}</p>
            <SmallRank xp={xp} />
            <hr/>
            <p id='numReviews'>{numReviews} Reviews</p>
        </div>
    )
}

export default SmallProfile;