import './profileCard.css';
import defaultPfp from '../../assets/largePfpDefault.png';

import paper from '../../assets/rankIcons/whitePaper.svg';
import toilet from '../../assets/rankIcons/whiteToilet.svg'
import soap from '../../assets/rankIcons/whiteSoap.svg';
import crown from '../../assets/rankIcons/whiteCrown.svg';

import { useEffect, useState } from 'react';

function ProfileCard() {
    const [name, setName] = useState('Jane Doe');
    const [email, setEmail] = useState('janedoe@gmail.com');
    const [rankName, setRankName] = useState('Newbie');
    const [rankProgress, setRankProgress] = useState(66);
    const [experience, setExperience] = useState(20);
    const [rankTotal, setRankTotal] = useState(30);

    function handleSubmit() {
        console.log("Saving changes.");
    }

    return (
        <div className='gradient' id='profile-card'>
            <img  src={defaultPfp}/>
            <form>
                <div className='label-input'>
                    <label >Display Name: </label>
                    <input placeholder={name}/>
                </div>
                
                <div className='label-input'>
                    <label>Email: </label>
                    <input placeholder={email}/>
                </div>
                
                <div className='label-input'>
                    <label>Password: </label>
                    <input placeholder='**********'/>
                </div>

                <input type='button' id='profile-submit' value={'Save Changes'} onClick={handleSubmit}/>
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

                <div id='profile-rank-progress' style={{width: `${rankProgress}%`}}></div>

                <div id='full-rank'>{experience}/{rankTotal}</div>
            </div>
        </div>
    )
};

export default ProfileCard;