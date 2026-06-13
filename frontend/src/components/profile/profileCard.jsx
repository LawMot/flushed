import './profileCard.css';

import defaultPfp from '../../assets/defaultPfp.png';
import paper from '../../assets/rankIcons/whitePaper.svg';
import toilet from '../../assets/rankIcons/whiteToilet.svg';
import soap from '../../assets/rankIcons/whiteSoap.svg';
import crown from '../../assets/rankIcons/whiteCrown.svg';

import { useState, useEffect } from 'react';

function ProfileCard() {
    const [name, setName] = useState(localStorage.getItem('display_name') || 'Display Name');
    const [email, setEmail] = useState(localStorage.getItem('email') || 'Email');
    const [pfp, setPfp] = useState(localStorage.getItem('pfp') || defaultPfp);
    const [selectedPfp, setSelectedPfp] = useState(null);
    const [rankName, setRankName] = useState('Newbie');
    const [experience, setExperience] = useState( Number(localStorage.getItem('experience')) || -1);
    const [rankTotal, setRankTotal] = useState(30);
    const [isGoogleUser, setIsGoogleUser] = useState(false);

    async function getExperience() {
        const response = await fetch('http://localhost:5000/reviews/' + localStorage.getItem('userId'), { credentials: 'include' });
        const data = await response.json();
        if (Array.isArray(data)) {
            localStorage.setItem('experience', data.length * 10);
            setExperience(data.length * 10)
        } else {
            localStorage.setItem('experience', 0);
            setExperience(0);
        }
    }

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
                    setPfp(user.profile_pic || defaultPfp);

                    localStorage.setItem(
                        'display_name',
                        user.display_name || ''
                    );
                    localStorage.setItem(
                        'email',
                        user.email || ''
                    );
                    localStorage.setItem(
                        'pfp',
                        user.profile_pic || defaultPfp
                    );
                    localStorage.setItem(
                        'experience',
                        user.experience || 0
                    );
                    localStorage.setItem(
                        'userId',
                        user._id || user.userId || ''
                    );

                    if (user.googleId) {
                        setIsGoogleUser(true);
                    }
                }
            })
            .catch(err =>
                console.error('Session fetch failed:', err)
            );

        getExperience();
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

    async function compressImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxSize = 500; // max width/height
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions maintaining aspect ratio
                    if (width > height) {
                        if (width > maxSize) {
                            height = Math.round((height * maxSize) / width);
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = Math.round((width * maxSize) / height);
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Export as JPEG with 80% quality to compress
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.onerror = () => reject(new Error('Failed to load image'));
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
        });
    }

    async function handlePfpSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file);
            setSelectedPfp(compressedImage);
        } catch (error) {
            console.error('Image compression failed:', error);
            alert('Failed to process image');
        }
    }

    async function updatePfp() {
        if (!selectedPfp) return;

        const response = await fetch(
            'http://localhost:5000/account/' + localStorage.getItem('userId') + '/update-pfp',
            {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profile_pic: selectedPfp
                })
            }
        );

        if (response.ok) {
            localStorage.setItem('pfp', selectedPfp);
            setPfp(selectedPfp);
            setSelectedPfp(null);
            document.getElementById('profile-pic-upload').value = '';
        } else {
            console.log('something went wrong with pfp');
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        await updateName();

        if (!isGoogleUser) {
            await updateEmail();
            await updatePassword();
            await updatePfp();
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
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        id='profile-pic-upload' 
                        type='file' 
                        hidden 
                        accept='image/png,image/jpeg'
                        onChange={handlePfpSelect}
                        disabled={isGoogleUser}
                    />
                    <label htmlFor='profile-pic-upload' id='profile-pic-input'>
                            <img
                                src={selectedPfp || pfp || defaultPfp}
                                alt='Profile'
                                id='profile-pic-preview'
                            />
                    </label>
                </div>

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
