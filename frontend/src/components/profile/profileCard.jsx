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

    async function updateName() {
        const newName = document.getElementById('display-name').value;

        await fetch('http://localhost:5000/account/' + localStorage.getItem('userId') + '/update-name', 
        {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                display_name: newName
            })
        });

        localStorage.setItem('display_name', newName);
        setName(localStorage.getItem(newName));
    }

    async function updateEmail() {
        const newEmail = document.getElementById('email').value;

        await fetch('http://localhost:5000/account/' + localStorage.getItem('userId') + '/update-email', 
        {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: newEmail 
            })
        });

        localStorage.setItem('email', newEmail);
        setEmail(newEmail);
    }

    async function updatePassword() {
        const newPassword = document.getElementById('password').value;

        await fetch('http://localhost:5000/account/' + localStorage.getItem('userId') + '/update-password', 
        {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword 
            })
        });

        localStorage.setItem('password', newPassword);
    }

    function handleSubmit() {
        updateName();
        updateEmail();
        updatePassword();

        window.alert('Account Details Updated!');
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
                    <input id='display-name' type='text' placeholder={name} className='profile-input' defaultValue={name}/>
                </div>
                
                <div className='label-input'>
                    <label className='profile-label'>New Email: </label>
                    <input id='email' type='email' placeholder={email} className='profile-input' defaultValue={email}/>
                </div>
                
                <div className='label-input'>
                    <label className='profile-label'>New Password: </label>
                    <input id='password' type='password' placeholder='●●●●●●●●●●' className='profile-input' />
                </div>

                <button type='button' id='profile-submit' onClick={() => handleSubmit()}>Save Changes</button>
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
    )
};

export default ProfileCard;