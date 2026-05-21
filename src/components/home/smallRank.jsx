import toilet from '../../assets/rankIcons/blueToilet.svg'
import './smallRank.css'

function SmallRank({ xp }) {
    return (
        <div id='rank'>
            <img src={toilet}/>
            {xp <= 30 && <p>Rookie</p>}
        </div>
    )
};

export default SmallRank;