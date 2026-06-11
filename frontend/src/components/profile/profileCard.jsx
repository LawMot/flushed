import './profileCard.css';

import defaultPfp from '../../assets/defaultPfp.png';
import paper from '../../assets/rankIcons/whitePaper.svg';
import toilet from '../../assets/rankIcons/whiteToilet.svg';
import soap from '../../assets/rankIcons/whiteSoap.svg';
import crown from '../../assets/rankIcons/whiteCrown.svg';

import { useState, useEffect } from 'react';

function ProfileCard() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pfp, setPfp] = useState('');
    const [rankName, setRankName] = useState('Newbie');
    const [experience, setExperience] = useState( Number(localStorage.getItem('experience')) || 0);
    const [rankTotal, setRankTotal] = useState(30);
    const [isGoogleUser, setIsGoogleUser] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/auth/me', {
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Not authenticated');
            })
            .then(data => {
                if (data.success && data.user) {
                    const user = data.user;

                    setName(user.display_name || 'Display Name');
                    setEmail(user.email || 'Email');
                    setExperience(user.experience || 0);
                    setPfp(user.profile_pic || '');

                    localStorage.setItem(
                        'display_name',
                        user.display_name || ''
                    );
                    localStorage.setItem(
                        'email',
                        user.email || ''
                    );
                    localStorage.setItem(
                        'experience',
                        user.experience || 0
                    );

                    if (user.googleId) {
                        setIsGoogleUser(true);
                    }
                }
            })
            .catch(err =>
                console.error('Session fetch failed:', err)
            );
    }, []);

    useEffect(() => {
        if (experience < 30) {
            setRankName('Newbie');
            setRankTotal(30);
        } else if (experience < 60) {
            setRankName('Rookie');
            setRankTotal(60);
        } else if (experience < 90) {
            setRankName('Intermediate');
            setRankTotal(90);
        } else {
            setRankName('Expert');
            setRankTotal(120);
        }
    }, [experience]);

    async function updateName() {
        const newName = document.getElementById('display-name').value;

        if (!newName || newName === name) return;

        const response = await fetch(
            `http://localhost:5000/account/${localStorage.getItem(
                'userId'
            )}/update-name`,
            {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    display_name: newName
                })
            }
        );

        if (response.ok) {
            localStorage.setItem('display_name', newName);
            setName(newName);
        }
    }

    async function updateEmail() {
        if (isGoogleUser) return;

        const newEmail = document.getElementById('email').value;

        if (!newEmail || newEmail === email) return;

        const response = await fetch(
            `http://localhost:5000/account/${localStorage.getItem(
                'userId'
            )}/update-email`,
            {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: newEmail
                })
            }
        );

        if (response.ok) {
            localStorage.setItem('email', newEmail);
            setEmail(newEmail);
        }
    }

    async function updatePassword() {
        if (isGoogleUser) return;

        const newPassword =
            document.getElementById('password').value;

        if (!newPassword) return;

        await fetch(
            `http://localhost:5000/account/${localStorage.getItem(
                'userId'
            )}/update-password`,
            {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: newPassword
                })
            }
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await updateName();

        if (!isGoogleUser) {
            await updateEmail();
            await updatePassword();
        }

        window.alert('Account Details Updated!');
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
            localStorage.clear();
            window.location.href = '/';
        }
    }
    return (
        <div className='gradient' id='profile-card'>
            <button id='profile-button'>
                <img
                    src={pfp || defaultPfp}
                    alt='Profile'
                    id='profile-pic'
                />
            </button>
            

            <form onSubmit={handleSubmit}>
                <div className='label-input'>
                    <label className='profile-label'>
                        New Name:
                    </label>
                    <input
                        id='display-name'
                        type='text'
                        className='profile-input'
                        defaultValue={name}
                        placeholder={name}
                        disabled={isGoogleUser}
                    />
                </div>

                <div className='label-input'>
                    <label className='profile-label'>
                        New Email:
                    </label>
                    <input
                        id='email'
                        type='email'
                        className='profile-input'
                        defaultValue={email}
                        disabled={isGoogleUser}
                        placeholder={
                            isGoogleUser
                                ? 'Managed by Google'
                                : email
                        }
                    />
                </div>

                <div className='label-input'>
                    <label className='profile-label'>
                        New Password:
                    </label>
                    <input
                        id='password'
                        type='password'
                        className='profile-input'
                        disabled={isGoogleUser}
                        placeholder={
                            isGoogleUser
                                ? 'Managed by Google'
                                : '●●●●●●●●●●'
                        }
                    />
                </div>

                <button type='submit' id='profile-submit' disabled={isGoogleUser}>Save Changes</button>
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