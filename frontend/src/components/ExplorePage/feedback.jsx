import React,{useState,useContext,useEffect}from 'react';
import star from '../../assets/images/star.svg'; // Import your star image
import unstar from '../../assets/images/unstared.svg'; 
// Import your unstar image
import UserContext from '../../userContext';




const FeedbackComponent = ({ feedbackArray }) => {
  const{currUser}=useContext(UserContext);
  const currentUserIndex = feedbackArray.findIndex(feedback => feedback.reviewer === currUser);

  if (currentUserIndex >= 0) {
    const currentUserReview = feedbackArray.splice(currentUserIndex, 1)[0];
    feedbackArray.unshift(currentUserReview);
  }
  
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    e.currentTarget.style.userSelect = 'none'; // Prevent text selection during drag
    setStartY(e.pageY - e.currentTarget.offsetTop); // Capture the initial point of contact
    setScrollTop(e.currentTarget.scrollTop); // Capture the initial scroll position
  };

  const onMouseMove = (e) => {
    if (!isDragging) return; // Only scroll if dragging is true
    e.preventDefault(); // Prevent default behavior (selection, etc.)
    const y = e.pageY - e.currentTarget.offsetTop; // Current mouse Y
    const walk = (y - startY) * 2; // Distance moved (multiply by 2 for faster scrolling)
    e.currentTarget.scrollTop = scrollTop - walk; // Adjust scroll position
  };

  const onMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = 'auto'; // Re-enable text selection
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.userSelect = 'auto'; // Re-enable text selection on leave
    }
  };
  
  return (
    <div id="feedbacks"  style={{
      overflowY: 'auto', // Enables vertical scrolling
      height: 'auto', // Sets height to grow with content
      maxHeight: '500px',
      cursor: 'pointer',
    }}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
    >
      {feedbackArray.map((feedback, index) => ( 
        
        <div key={index} id={`feed${index + 1}`}>
          <inf>
            <img src={feedback.img} className="feedback-pic" alt="" />
            <div className="profile-id">
              <div className="profile-name">{feedback.reviewer}</div>
              <form>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={i < feedback.message.rating ? star : unstar}
                      className="star"
                      alt=""
                    />
                  ))}
                </div>
                <span id="date">{new Date(feedback.message.timestamp).toLocaleDateString('en-GB')}</span>
              </form>
            </div>
          </inf>
          <p>{feedback.message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackComponent;


