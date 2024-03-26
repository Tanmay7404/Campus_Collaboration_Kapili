import React, { useState } from "react";
import like from "../../assets/images/like.svg";
import cross from "../../assets/images/cross.svg";
import star from "../../assets/images/star.svg";
import unstar from "../../assets/images/unstared.svg";
import downarrow from "../../assets/images/Arrow.svg";
import FeedbackComponent from "./feedback.jsx";
import DemoSwiper from "./DemoSwiper.jsx";
import "./CardExpanded.css";
import TextField from '@mui/material/TextField';



const CardExpanded = ({
  tags,
  likes,
  ratings,
  modalImage,
  modalText,
  projectname,
  contactImage,
  contactName,
  additionalImages,
  aboutProjectText,
  feedbackArray,
  open,
  completed, 
  projectlinks,
  createdate,
  finishdate,
  contributor,
  level,
  closeModal
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

  const formattedCreateDate = new Date(createdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'});
  const formattedFinishDate = new Date(finishdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'});
  const difficultyOptions = [
    { label: 'Easy', value: 'easy', color: 'green' },
    { label: 'Medium', value: 'medium', color: 'orange' },
    { label: 'Hard', value: 'hard', color: 'red' },
  ];


  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    e.currentTarget.style.userSelect = 'none';
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX);
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = (e) => {
    setIsDragging(false);
    e.currentTarget.style.userSelect = 'auto';
  };

  const onMouseLeave = (e) => {
    setIsDragging(false);
    e.currentTarget.style.userSelect = 'auto';
  };
    
  return (
    <div id="details-main">
      <img src={cross} id="cross" onClick={closeModal} style={{position:"absolute", top:"50px", right:"50px"}}/>
      {/* <button onClick={closeModal} style={{ float: 'right', zIndex:"1000", transform:"translateX(-50px)" }}>Close</button> */}
        <div id="details">
          <div id="banner">
            <img src={modalImage} alt="" id="banner-image" />
            <div id="layer"></div>
            <div id="inf1">
              <h1 id="projectName">{projectname}</h1>
              <h1 id="modalText">{modalText}</h1>
              <div id="inf2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ display: 'flex', gap: '10px' }}> {/* Adjusted for proper alignment of children */}
    <div id="like">
      <img src={like} alt="" /> {likes}
    </div>
    {/* <div id="line"></div> Commented out but you can uncomment and adjust as needed */}
    <div id="rate">
      <img src={star} alt="" /> {ratings}
    </div>
  </div>
  <div> {/* This div will now be on the right */}
    {difficultyOptions.map((option) => (
      level === option.value && (
        <div
          key={option.value}
          className={`btn m-2 ${level === option.value ? 'btn-' + option.color : 'btn-outline-' + option.color}`}
          style={{
            borderRadius: '20px',
            borderColor: option.color,
            color: '#fff',
            cursor: 'pointer',
            backgroundColor: option.color,
            padding: '5px 10px', // Decrease padding to reduce button size
            fontSize: '14px',
          }}
        >
          {option.label}
        </div>
      )
    ))}
  </div>
</div>

            </div>
            



          </div>
          <div id="deltails-page1">
            <div id="contactor">
              <div id="profile">
                <img src={contactImage} id="profile-picture" alt="" />
                <span id="name" />
                <div style={{ height: '50px', display: 'flex',alignItems: 'center',justifyContent: 'flex-start',fontSize: '1.2rem' }}>
                <a href={`/profile/${contactName}`} className="project-link" >
                    {contactName}
                  </a>
                </div>
              </div>
              <div id="linker"> 
              {/* <div className="clickable-area" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => console.log(7)}>
                <i className="bi bi-chat-left-dots-fill clickable-icon" style={{ fontSize: '30px' }}></i>
                <div>Get In Touch</div> 
              </div> */}
              
              <div>
                  {open && ( 
                    <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => console.log(7)}>
                      <i className="bi bi-people-fill clickable-icon" style={{ fontSize: '30px' }}></i>
                      <div>Collaborate</div>
                    </div>
                  )}
              </div>

              <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => console.log(7)}>
                <i className="bi bi-chat-left-dots-fill clickable-icon" style={{ fontSize: '30px' }}></i>
                <div style={{ marginRight: '5px' }}>Get In Touch</div> 
              </div>
               
              

              </div>
            </div>

            

           

            <div id="display-img">
                <DemoSwiper additionalImages = {additionalImages}/>
            </div>

            <div id="description-tags">
              <div id="description">
                <div style={{fontSize:'1.3rem'}}>
                  About this project
                  </div>
                <div id="description-part2">{aboutProjectText}</div>
              </div>
              <div 
                style={{
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseLeave}
              >
                {tags.map((tag, idx) => (
                  <div
                    key={idx}
                    id="tag"
                    style={{
                      display: 'inline-block',
                      padding: '10px',
                      margin: '0 5px',
                      border: '1px solid',
                      borderColor: tag.color,
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
            







            <div style={{ marginTop: '2rem' }}>
              <div style={{ fontSize: '1.3rem' }}>
                <i className="bi bi-link" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}></i>
                Project Links
              </div>
              {projectlinks.map((item, index) => (
                <div key={index} style={{ background: 'transparent', fontSize: '1.2rem', marginTop: '0.5rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>&bull;</span>
                  <a href={item.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </div>
              ))}
          </div>


            <div id="feedbacks-ratting">
            <div style={{ fontSize: '1.3rem' }}>
              <i className="bi bi-star-fill" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}></i>
              Rating and Feedback
            </div>
                        <div id="ratting">
                            <img src={contactImage} className="feedback-pic" alt="" />
                            <div className="profile-id">
                                <div className="profile-name">Sushant81</div>
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
<div id="text" style={{
    display: (flag == 1) ? "flex" : "none",
    flexDirection: "row", // Align items in a line
    alignItems: "stretch", // Stretch items to fill the container
    gap: "0", // No space between the TextField and the send button
    backgroundColor: '#1B1B1B', // Match the background color of the TextField
    borderRadius: '4px', // Match your design preference for border radius
}}>
    <TextField 
        fullWidth 
        id="fullWidth" 
        size="medium" 
        multiline={true} 
        variant="outlined"
        
        sx={{
            // ...style,
            borderColor: 'rgb(27, 27, 27)', // Border color for the TextField
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'rgb(27, 27, 27)', // Apply white border
                },
                '&:hover fieldset': {
                    borderColor: 'rgb(27, 27, 27)', // Apply white border on hover
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'rgb(27, 27, 27)', // Apply white border when focused
                },
            }
        }}
        InputProps={{
            style: {
                color: 'white',
                backgroundColor: '#1B1B1B',
                borderTopLeftRadius: '4px', // Top left border radius
                borderBottomLeftRadius: '4px', // Bottom left border radius
                borderRight: 'none', // Hide the right border to merge with the send button
            },
            placeholder: "Describe your view..."
        }}
        InputLabelProps={{ style: { color: 'gray' } }}
    />
    <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: '0 12px', // Padding for the send button
        backgroundColor: '#1B1B1B', // Match the background color of the TextField
        borderTopRightRadius: '4px', // Top right border radius
        borderBottomRightRadius: '4px', // Bottom right border radius
        // border: '1px solid white', // Apply white border
        borderLeft: 'none', // Hide the left border to merge with the TextField
        
    }} onClick={() => console.log(7)}>
       <i className="bi bi-send clickable-icon" style={{ fontSize: '25px', marginBottom: '9px' }}></i>

    </div>
    
</div>




              
                <div>
                    <FeedbackComponent feedbackArray={feedbackArray}/>
                </div>   
                
              
            </div>
            
            <div style={{ borderTop: '.5px  solid #736d6d', marginTop: '1rem', marginBottom: '1rem' }}></div>
            <div>
              <h3>Additional Information</h3>
            <div>

              <span style={{ color:'#7a7777' }}>Contributors:</span>
              {contributor.map((name, index) => (
                <span key={index}>
                  <a href={`/profile/${name}`} className="project-link" >
                    {name}
                  </a>
                  {index < contributor.length - 1 ? ', ' : ''}
                </span>
              ))}


            </div>
            <div><span style={{ color: '#7a7777' }}>Created Date:</span> {formattedCreateDate}</div>
            <div>{completed&&(
            <div><span style={{ color: '#7a7777' }}>Completed Date:</span> {formattedFinishDate}</div>
            )}
            {!completed&&(
            <div><span style={{ color: '#7a7777' }}>Completed Date:</span>  Ongoing</div>
            )}
            
            </div>







            </div>
          </div>
        </div>
    </div>
  );
};

export default CardExpanded;
