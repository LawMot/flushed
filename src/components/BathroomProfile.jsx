import "./BathroomProfile.css"

import female from "../assets/genderIcons/largeGrayFemale.svg";
import male from "../assets/genderIcons/largeGrayMale.svg";
import neutral from "../assets/genderIcons/largeGrayNeutral.svg";

import { useState } from "react";

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

function BathroomProfile(
    supplies = 0,
  footTraffic = 3,
  cleanliness = 5,
  aesthetic = 2,
) {
    const [genderFilter, setGenderFilter] = useState("all");

    //placeholder reviews
     const reviews = [
        { id: 1, gender: "female", text: "Very clean" },
        { id: 2, gender: "male", text: "Crowded" },
        { id: 3, gender: "neutral", text: "Nice lighting" },
    ];

    const filteredReviews =
    genderFilter === "all"
        ? reviews
        : reviews.filter(
                (review) => review.gender === genderFilter
            );

    return (
        <>
        <div className="bathroom-parent">
            <div className="bathroom-container">
                <div className="bathroom-col1"> 
                    <h2 className="bathroom-label">
                        The Hub<span id="floor">1st Floor</span>
                    </h2>
                    <div className="bathroom-rates">
                        <div className="bathroom-ratings">
                            <span className="bathroom-rating-label">Supplies</span>
                            <Stars value={supplies} />
                        </div>
                        <div className="bathroom-ratings">
                            <span className="">Foot Traffic</span>
                            <Stars value={footTraffic} />
                        </div>
                        <div className="bathroom-ratings">
                            <span className="">Cleanliness</span>
                            <Stars value={cleanliness} />
                        </div>
                        <div className="bathroom-ratings">
                            <span className="">Aesthetic</span>
                            <Stars value={aesthetic} />
                        </div>
                    </div>
                </div>
                <div className="bathroom-col2"> 
                    <div className="bathroom-image"></div>
                    <div>
                        <p id="bathroom-sort">Sort By:</p>
                        <div className="bathroom-gender">
                            <img src={female} alt="female" className={
                                genderFilter === "female"
                                    ? "bathroom-icon active"
                                    : "bathroom-icon"
                            } onClick={() => setGenderFilter("female")}/> 
                            <img src={male} alt="male" className={
                                genderFilter === "male"
                                    ? "bathroom-icon active"
                                    : "bathroom-icon"
                            } onClick={() => setGenderFilter("male")}/>  
                            <img src={neutral} alt="genderneutral"
                                className={
                                genderFilter === "neutral"
                                    ? "bathroom-icon active"
                                    : "bathroom-icon"
                            } onClick={() => setGenderFilter("neutral")}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews">
                {filteredReviews.map((review) => (
                    <div key={review.id}>
                        <p>{review.text}</p>
                    </div>
                ))}
                </div>
        </div>
        </>
    )
}

export default BathroomProfile;