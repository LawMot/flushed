import './profileCard.css';

import defaultPfp from '../../assets/defaultPfp.png';
import paper from '../../assets/rankIcons/whitePaper.svg';
import toilet from '../../assets/rankIcons/whiteToilet.svg'
import soap from '../../assets/rankIcons/whiteSoap.svg';
import crown from '../../assets/rankIcons/whiteCrown.svg';

import { useState, useEffect } from 'react';

function ProfileCard() {
    const [name, setName] = useState( localStorage.getItem('display_name') || 'Display Name');
    const [email, setEmail] = useState(localStorage.getItem('email') || 'Email');
    const [rankName, setRankName] = useState('Newbie');
    const [experience, setExperience] = useState(localStorage.getItem('experience') || 0);
    const [rankTotal, setRankTotal] = useState(30);

    function handleSubmit() {
        console.log("Saving changes.");
    }

    function rankInfo() {
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
    }

    useEffect(() => {
        rankInfo();
    }, []);

    return (
        <div className='gradient' id='profile-card'>
            <img  src={defaultPfp}/>
            <form>
                <div className='label-input'>
                    <label className='profile-label' >New Name: </label>
                    <input type='text' placeholder={name} className='profile-input'/>
                </div>
                
                <div className='label-input'>
                    <label className='profile-label'>New Email: </label>
                    <input type='email' placeholder={email} className='profile-input'/>
                </div>
                
                <div className='label-input'>
                    <label className='profile-label'>New Password: </label>
                    <input type='password' placeholder='●●●●●●●●●●' className='profile-input'/>
                </div>

                <button type='submit' id='profile-submit' onSubmit={handleSubmit()}>Save Changes</button>
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
            <button className='profile-logout'>Logout</button>
        </div>
    )
};

export default ProfileCard;