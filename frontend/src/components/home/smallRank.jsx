import paper from '../../assets/rankIcons/bluePaper.svg'
import toilet from '../../assets/rankIcons/blueToilet.svg'
import soap from '../../assets/rankIcons/blueSoap.svg'
import crown from '../../assets/rankIcons/blueCrown.svg'
import './smallRank.css'

function SmallRank({ xp }) {
    return (
        <div>
            {(xp <= 30 && 
                <div id='rank'>
                    <img src={paper} alt='Toilet Paper Icon'/>
                    <p>Newbie</p>
                </div>) ||
            (xp > 30 && xp <= 60 && 
                <div id='rank'>
                    <img src={toilet} alt='Toilet Icon'/>
                    <p>Rookie</p>
                </div>) ||
            (xp > 60 && xp <= 90 && 
            <div id='rank'>
                <img src={soap} alt='Soap Icon'/>
                <p>Intermediate</p>
            </div>) || 
            (xp > 90 && 
                <div id='rank'>
                    <img src={crown} alt='Crown Icon'/>
                    <p>Expert</p>
                </div>)
            }
        </div>
    )
};

export default SmallRank;