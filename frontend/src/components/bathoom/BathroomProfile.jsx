import "./BathroomProfile.css"
import female from "../../assets/genderIcons/largeGrayFemale.svg";
import male from "../../assets/genderIcons/largeGrayMale.svg";
import neutral from "../../assets/genderIcons/largeGrayNeutral.svg";
import location from '../../assets/location.svg'
import HUB from '../../assets/bathroomPhotos/Hub.jpg'
import SSC from '../../assets/bathroomPhotos/SSC.png'
import WCH from '../../assets/bathroomPhotos/WCH.jpg'

export const BUILDING_CONFIGS = {
  'Winston Chung Hall': {
    image: WCH,
    floors: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'],
    restrooms: {
      'Floor 1': ['Past the Transfer Center', 'Near the Lab'],
      'Floor 2': ['Outside', 'Main'],
      'Floor 3': ['Professor', 'Outside'],
      'Floor 4': ['Professor', 'Outside'],
    }
  },
  'The Hub': {
    image: HUB,
    floors: ['Floor 1', 'Floor 2', 'Floor 3'],
    restrooms: { 'Floor 1': ['Main'], 'Floor 2': ['Main'], 'Floor 3': ['Main'] }
  },
  'Student Success Center': {
    image: SSC,
    floors: ['Floor 1', 'Floor 2', 'Floor 3'],
    restrooms: { 'Floor 1': ['Main'], 'Floor 2': ['Main'], 'Floor 3': ['Main'] }
  }
};

function Stars({ value = 0, max = 5 }) {
  return (
    <span className="review-stars" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={i < value ? 'bathroom-star filled' : 'bathroom-star'}
        >
          {i < value ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

function BathroomProfile({
  buildingName = "The Hub",
  supplies = 0,
  footTraffic = 3,
  cleanliness = 5,
  aesthetic = 2,
 
  floor,
  setFloor,
  restroom,
  setRestroom,
  gender,
  setGender
}) {

  const buildingConfig = BUILDING_CONFIGS[buildingName] || { floors: [], restrooms: {} };
  const availableRestrooms = floor ? buildingConfig.restrooms[floor] || [] : [];
  const currentBuildingImage = buildingConfig.image || defaultPhoto;

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
    setRestroom(''); 
  };

  const handleGenderToggle = (selected) => {
    setGender(gender === selected ? '' : selected);
  };

  return (
    <div className="bathroom-parent">
        <div className="bathroom-container">
            <div className="bathroom-col1">
                <h2 className="bathroom-label">
                    <img src={location} alt="location icon" id="bathroom-location-icon"/>
                    {buildingName}
                    <span id="floor">{floor || "All Floors"}</span>
                </h2>
                <div className="bathroom-rates">
                    <div className="bathroom-ratings"><span className="bathroom-rating-label">Supplies</span><Stars value={supplies} /></div>
                    <div className="bathroom-ratings"><span>Foot Traffic</span><Stars value={footTraffic} /></div>
                    <div className="bathroom-ratings"><span>Cleanliness</span><Stars value={cleanliness} /></div>
                    <div className="bathroom-ratings"><span>Aesthetic</span><Stars value={aesthetic} /></div>
                </div>
            </div>
            
            <div className="bathroom-col2">
                <img 
                  src={currentBuildingImage} 
                  alt={`${buildingName} Profile`} 
                  className="bathroom-image" 
                  
                />
                <div className="bathroom-filters">
                    
                    <div>
                        <label htmlFor="floor-select" className="bathroom-sort">Floor: </label>
                        <select id="floor-select" value={floor} onChange={handleFloorChange}>
                            <option value="">All Floors</option>
                            {buildingConfig.floors.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="restroom-select" className="bathroom-sort">Restroom: </label>
                        <select 
                            id="restroom-select" 
                            value={restroom} 
                            onChange={(e) => setRestroom(e.target.value)}
                            disabled={!floor}
                        >
                            <option value="">All Restrooms</option>
                            {availableRestrooms.map(room => (
                                <option key={room} value={room}>{room}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p id="bathroom-gender-sort">Sort By:</p>
                        <div className="bathroom-gender">
                            <img src={female} alt="female" className={gender === "female" ? "bathroom-icon active" : "bathroom-icon"} 
                                 onClick={() => handleGenderToggle("female")}/>
                            <img src={male} alt="male" className={gender === "male" ? "bathroom-icon active" : "bathroom-icon"} 
                                 onClick={() => handleGenderToggle("male")}/>
                            <img src={neutral} alt="genderneutral" className={gender === "neutral" ? "bathroom-icon active" : "bathroom-icon"} 
                                 onClick={() => handleGenderToggle("neutral")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BathroomProfile;