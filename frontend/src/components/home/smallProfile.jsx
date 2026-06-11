import './smallProfile.css';
import SmallRank from './smallRank';
import defaultPfp from '../../assets/defaultPfp.png'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SmallProfile() {
    const [name, setName] = useState(localStorage.getItem('display_name') || 'Display Name');
    const [xp, setXp] = useState(localStorage.getItem('experience') || 0);
    const [reviews, setReviews] = useState(0);
    const [pfp, setpfp] = useState(defaultPfp);

    async function getReviews() {
        const response = await fetch('http://localhost:5000/reviews/' + localStorage.getItem('userId'), { credentials: 'include' });
        const data = await response.json();
        if (Array.isArray(data)) { 
            setReviews(data.length) 
        } else { 
            setReviews(0); 
        }
    }

   useEffect(() => {
        fetch('http://localhost:5000/auth/me', { credentials: 'include' })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Not authenticated");
            })
            .then(data => {
                if (data.success && data.user) {
                    setName(data.user.display_name || 'Display Name');
                    setXp(data.user.experience || 0);
                    
                    if (data.user.profile_pic) {
                        setPfp(data.user.profile_pic);
                    }

                    getReviews(data.user._id);
                }
            })
            .catch(err => {
                console.error("Session verification failed in SmallProfile:", err);
            });
    }, []);

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