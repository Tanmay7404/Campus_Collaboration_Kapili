import React from 'react';
import star from '../../Images/star.svg'; // Import your star image
import unstar from '../../Images/unstared.svg'; // Import your unstar image

const FeedbackComponent = ({ feedbackArray }) => {
  return (
    <div id="feedbacks">
      {feedbackArray.map((feedback, index) => (
        <div key={index} id={`feed${index + 1}`}>
          <inf>
            <img src={feedback.image} className="feedback-pic" alt="" />
            <div className="profile-id">
              <div className="profile-name">{feedback.heading}</div>
              <form>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={i < feedback.stars ? star : unstar}
                      className="star"
                      alt=""
                    />
                  ))}
                </div>
                <span id="date">{feedback.date}</span>
              </form>
            </div>
          </inf>
          <p>{feedback.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackComponent;
