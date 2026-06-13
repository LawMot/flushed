import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReviewCardPopulater from './home/ReviewCardPopulater';
import BathroomProfile, { BUILDING_CONFIGS } from './bathoom/BathroomProfile';

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const buildingQuery = queryParams.get('q') || 'The Hub';

  const [floor, setFloor] = useState('');
  const [restroom, setRestroom] = useState('');
  const [gender, setGender] = useState('');

  const [loadedReviews, setLoadedReviews] = useState([]);

  const isValidBuilding = Object.keys(BUILDING_CONFIGS).some(
    (key) => key.toLowerCase() === buildingQuery.toLowerCase()
  );

  const exactBuildingName = Object.keys(BUILDING_CONFIGS).find(
    (key) => key.toLowerCase() === buildingQuery.toLowerCase()
  ) || buildingQuery;

  const apiFilter = {
    building: buildingQuery,
    floor: floor || undefined,
    restroom: restroom || undefined,
    gender: gender || undefined,
  };

  const getAverageRating = (key) => {
    if (!loadedReviews || loadedReviews.length === 0) return 0;
  
    const validReviews = loadedReviews.filter(r => r.ratings && r.ratings[key] !== undefined);
    if (validReviews.length === 0) return 0;

    const sum = validReviews.reduce((acc, review) => acc + review.ratings[key], 0);
    
    
    return Math.round(sum / validReviews.length); 
  };

  return (
    <div>
     {!isValidBuilding || !buildingQuery ? (
        
        <div className="search-not-found">
          <h1>No Results Found</h1>
          <p>We couldn't find any building matching "{buildingQuery}".</p>
          <p id="search-subtext">Try searching for: Winston Chung Hall, The Hub, or Student Success Center.</p>
        </div>

      ) : (
        <>
          <BathroomProfile 
            buildingName={exactBuildingName} 
            supplies={getAverageRating('supplies')}
            footTraffic={getAverageRating('footTraffic')}
            cleanliness={getAverageRating('cleanliness')}
            aesthetic={getAverageRating('aesthetic')}
            floor={floor}
            setFloor={setFloor}
            restroom={restroom}
            setRestroom={setRestroom}
            gender={gender}
            setGender={setGender}
          />
          <div className='bathroom-reviews'>
            <ReviewCardPopulater 
              filter={apiFilter} 
              onReviewsLoaded={setLoadedReviews}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;