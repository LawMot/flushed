import './profileCard.css';

import defaultPfp from '../../assets/defaultPfp.png';
import paper from '../../assets/rankIcons/whitePaper.svg';
import toilet from '../../assets/rankIcons/whiteToilet.svg';
import soap from '../../assets/rankIcons/whiteSoap.svg';
import crown from '../../assets/rankIcons/whiteCrown.svg';

import { useState, useEffect } from 'react';

function ProfileCard() {
    const [name, setName] = useState('Display Name');
    const [email, setEmail] = useState('Email');
    const [pfp, setPfp] = useState('');
    const [rankName, setRankName] = useState('Newbie');
    const [experience, setExperience] = useState(0);
    const [rankTotal, setRankTotal] = useState(30);
    const [isGoogleUser, setIsGoogleUser] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/auth/me', { credentials: 'include' })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Not authenticated");
            })
            .then(data => {
                if (data.success && data.user) {
                    setName(data.user.display_name || 'Display Name');
                    setEmail(data.user.email || 'Email');
                    setExperience(data.user.experience || 0);
                    setPfp(data.user.profile_pic || '');
                    
                    if (data.user.googleId) {
                        setIsGoogleUser(true);
                    }
                }
            })
            .catch(err => console.error("Session fetch failed:", err));
    }, []);
    useEffect(() => {
        if (experience < 30) {
            setRankName('Newbie');
            setRankTotal(30);
        } else if (experience >= 30 && experience < 60) {
            setRankName('Rookie');
            setRankTotal(60);
        } else if (experience >= 60 && experience < 90) {
            setRankName('Intermediate');
            setRankTotal(90);
        } else if (experience >= 90) {
            setRankName('Expert');
            setRankTotal(120);
        }
    }, [experience]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Saving profile modifications.");
    }
async function logOut() {
        const response = await fetch(
        'http://localhost:5000/logout',
        {
            method: 'DELETE',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        }
        );

        if (response.ok) {
            window.location.href = '/';
        }
    }
    return (
        <div className='gradient' id='profile-card'>
            <img src={defaultPfp} alt="pfp" />
            
            <form onSubmit={handleSubmit}>
                <div className='label-input'>
                    <label className='profile-label'>New Name: </label>
                    <input type='text' placeholder={name} className='profile-input'/>
                </div>
                
                <div className='label-input'>
                    <label className='profile-label'>New Email: </label>
                    <input type='email' placeholder={email} className='profile-input' disabled={isGoogleUser}/>
                </div>
                
                <div className='label-input'>
                    <label className='profile-label'>New Password: </label>
                    <input 
                        type='password' 
                        placeholder={isGoogleUser ? 'Managed by Google' : '●●●●●●●●●●'} 
                        className='profile-input'
                        disabled={isGoogleUser}
                    />
                </div>

                <button type='submit' id='profile-submit'>Save Changes</button>
            </form>

             <div id='rank-bar'>
                <div id='profile-rank-name'>
                    {(rankName === 'Newbie' && (
                        <img src={paper}/>
                    )) || ((rankName == 'Rookie') && (
                        <img src={toilet}/>
                    )) || ((rankName == 'Intermediate') && (
                        <img src={soap}/>
                    )) || ((rankName == 'Expert') && (
                        <img src={crown}/>
                    ))}

                    <p>{rankName}</p>
                </div>

                <div id='profile-rank-progress' style={{width: `${(experience/rankTotal) * 100}%`}}></div>

                <div id='full-rank'>{experience}/{rankTotal}</div>
            </div>
            <button className='profile-logout' onClick={() => logOut()}>Logout</button>
        </div>
    );
}

export default ProfileCard;