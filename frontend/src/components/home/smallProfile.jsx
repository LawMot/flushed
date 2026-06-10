import './smallProfile.css';
import SmallRank from './smallRank';
import defaultPfp from '../../assets/smallPfpDefault.png'
import { useState, useEffect } from 'react';

function SmallProfile() {
    const [name, setName] = useState('Display Name');
    const [xp, setXp] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [pfp, setpfp] = useState(defaultPfp);

    return (
        <div className='gradient' id='smallProfile'>
            <img id='pfp' src={pfp} alt='User Profile Picture'/>
            <p id='name'>{name}</p>
            <SmallRank xp={xp} />
            <hr/>
            <p id='numReviews'>{reviews} Reviews</p>
        </div>
    )
}

export default SmallProfile;