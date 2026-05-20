import rookie from '../../assets/rank/rookie.svg'
import './smallRank.css'

function SmallRank({ xp }) {
    return (
        <div id='rank'>
            <img src={rookie}/>
            {xp <= 30 && <p>Rookie</p>}
        </div>
    )
};

export default SmallRank;