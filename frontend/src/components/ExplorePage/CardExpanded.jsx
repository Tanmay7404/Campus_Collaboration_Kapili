import React, { useState } from "react";
import like from "../../assets/images/like.svg";
import cross from "../../assets/images/cross.svg";
import star from "../../assets/images/star.svg";
import unstar from "../../assets/images/unstared.svg";
import downarrow from "../../assets/images/Arrow.svg";
import FeedbackComponent from "./feedback.jsx";
import DemoSwiper from "./DemoSwiper.jsx";
// import "./CardExpanded.css";



const CardExpanded = ({
  tags,
  likes,
  ratings,
  modalImage,
  modalText,
  contactImage,
  contactName,
  additionalImages,
  aboutProjectText,
  feedbackArray, closeModal
}) => {
  var [flag,setFlag] = useState(0);
  var [rating,setRating] = useState(0);
  function feedback(){

    if(flag===0){
      setFlag(1);
    }
    else{
      setFlag(0);
    }
  }
  function writeFeedback(){
      // var feedback = {
      //   projectName: 
      // }
  }
  return (
    <div id="details-main">
      <img src={cross} id="cross" onClick={closeModal} style={{position:"absolute", top:"50px", right:"50px"}}/>
      {/* <button onClick={closeModal} style={{ float: 'right', zIndex:"1000", transform:"translateX(-50px)" }}>Close</button> */}
        <div id="details">
          <div id="banner">
            <img src={modalImage} alt="" id="banner-image" />
            <div id="layer"></div>
            
            <div id="inf">
              <h1>{modalText}</h1>
              <div id="inf2">
                <div id="like">
                  <img src={like} alt="" /> {likes}
                </div>
                <div id="line"></div>
                <div id="rate">
                  <img src={star} alt="" /> {ratings}
                </div>
              </div>
            </div>
          </div>
          <div id="deltails-page1">
            <div id="contactor">
              <div id="profile">
                <img src={contactImage} id="profile-picture" alt="" />
                <span id="name" />
                {contactName}
              </div>
              <div id="linker">
                <button id="getInTouch">Get In Touch</button>
                <button id="Collaborate">Collaborate</button>
              </div>
            </div>

            <div id="display-img">
                <DemoSwiper additionalImages = {additionalImages}/>
            </div>

            <div id="description-tags">
              <div id="description">
                <h1>About this project</h1>
                <div id="description-part2">{aboutProjectText}</div>
              </div>
              <div id="tags">
                {tags.map((tag, idx) => (
                  <a href="#" id={tag.name} className="tags1" key={idx} style={{borderColor: tag.color, color: tag.color}} >{tag.name}</a>
                ))}
              </div>
            </div>

            <div id="feedbacks-ratting">
                        <h1>Rating and Feedback</h1>
                        <div id="ratting">
                            <img src={contactImage} className="feedback-pic" alt="" />
                            <div className="profile-id">
                                <div className="profile-name">Nixshc Dchdcu</div>
                                <form id="submiting" action="#" style={{display: (flag===1) ? "flex" : "none"}}>
                                    <div className="stars">
                                      <img src={(rating>0)?star:unstar} className="star star-s" data-rating="1" alt="" onClick={()=>setRating(1)}/>
                                      <img src={(rating>1)?star:unstar} className="star star-s" data-rating="2" alt="" onClick={()=>setRating(2)}/>
                                      <img src={(rating>2)?star:unstar} className="star star-s" data-rating="3" alt="" onClick={()=>setRating(3)}/>
                                      <img src={(rating>3)?star:unstar} className="star star-s" data-rating="4" alt="" onClick={()=>setRating(4)}/>
                                      <img src={(rating>4)?star:unstar} className="star star-s" data-rating="5" alt="" onClick={()=>setRating(5)}/>
                                    </div>
                                    <input type="date" id="date" value=""/>
                                </form>
                            </div>
                            <div id="addFeedbackButton">
                                <div id="nox" onClick={feedback}>
                                    <span>Write a feedback</span><svg id="FeedBackDownButton" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: (flag==1) ? "rotate(90deg)" : "rotate(0deg)"}}>
                                        <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="#BCBCBC"/>
                                        </svg>
                                </div>
                            </div>
                        </div>
                        <div id="text" style={{display: (flag==1) ? "flex" : "none"}}>
                            <input type="text" id="feedBackText" placeholder="Describe your view..."/>
                            <button type="submit" onClick={writeFeedback}>Submit</button>
                        </div>

              
                <div>
                    <FeedbackComponent feedbackArray={feedbackArray}/>
                </div>   
                
              
            </div>
          </div>
        </div>
    </div>
  );
};

export default CardExpanded;
