import React, { useState,useEffect, useContext,useRef } from "react";
import like from "../../assets/images/like.svg";
import cross from "../../assets/images/cross.svg";
import star from "../../assets/images/star.svg";
import unstar from "../../assets/images/unstared.svg";
import downarrow from "../../assets/images/Arrow.svg";
import FeedbackComponent from "./feedback.jsx";
import DemoSwiper from "./DemoSwiper.jsx";
import "./CardExpanded.css";
import TextField from '@mui/material/TextField';
// import UserContext from "../../userContext.jsx";
import UserdataContext from "../../userdataContext.js";
import { useNavigate } from "react-router-dom";
import unstarsss from "../../assets/images/project-planning-header@2x.png";
import pro from "../../assets/images/discord-profile-pictures-jktaycg4bu6l4s89.jpg";
import { useModel } from './../../tsModelContext.js'; // import the useModel hook

const CardExpanded = ({
  tags,
  likes,
  ratings,
  modalImage,
  modalText,
  projectname,
  additionalImages,
  aboutProjectText,
  feedbackArray,
  open,
  completed, 
  projectlinks,
  createdate,
  finishdate,
  level,
  creator,
  _id,
  closeModal,
  modalOpen,
  setongoingData,
  setcompletedData,
  likedUsers,
  chatId,
  check
}) => {
  console.log(check);
 const model=useModel()
  var [flag,setFlag] = useState(0);
  const[feed,setfeed]=useState(false);
  // const {currUser} = useContext(UserContext);

  const [currUser,setCurrUser] =useState(null);
 useEffect(()=>{
     const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
        //   const foundUser = JSON.parse(loggedInUser);
          setCurrUser(loggedInUser);
        } else
        {
navigate('/login')
        }
 },[])
  const{userdata}=useContext(UserdataContext);
  const[isliked,setisliked]=useState(false);
 const navigate=useNavigate()

  const initialfeedbackData={
    projectname:projectname,
    img:userdata.profileInfo.profilePicture.url,
    rating:0,
    text:''
  };
  const [feedbackData,setfeedbackData]=useState(initialfeedbackData);
  // useEffect(()=>{console.log(feedbackData)},[feedbackData])
  function feedback(){

    if(flag===0){
      setFlag(1);
    }
    else{
      setFlag(0);
    }
  }

  function checkFeedbackForCurrentUser(feedbackArray, currUser) {
    feedbackArray.forEach((feedback) => {
      if (feedback.reviewer === currUser) {
        setfeed(true);
      }
    });
  }
useEffect(()=>{
  setisliked(likedUsers.some(use => use === currUser)); 
},[currUser])

  useEffect(() => {
    checkFeedbackForCurrentUser(feedbackArray, currUser);
  }, [feedbackArray, currUser]);

  useEffect(()=>{
    

  },[])
  const sendCollaborate=async ()=>
  {
    console.log("collaborate")
    const response = await fetch('http://localhost:8080/chats/collaborateProject/'+chatId+"/"+userdata.username, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

  }
const [likeInProgress, setLikeInProgress] = useState(false);
const handleLike = () => {
  console.log(1)
  console.log(isliked);
  console.log(2);

  if (likeInProgress) {
    return;
  }
  setLikeInProgress(true);
  if (isliked) {
    fetch(`http://localhost:8080/projects/removeLikedProject/` + currUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ projectname: projectname, endorsements: likes - 1 })
    })
      .then(response => {
        if (response.ok) {
          
          if (completed == true||check=='profile') {
            setongoingData(prevData => {
              return prevData.map(project => {
                if (project.name == projectname) {
                  var lik = project.endorsements;
                  return {
                    ...project,
                    endorsements: lik - 1,
                    likedUsers: project.likedUsers.filter(use => use != currUser)
                  };
                }
                return project;
              });
            });
            setisliked(false);
          } else {
            setcompletedData(prevData => {
              return prevData.map(project => {
                if (project.name == projectname) {
                  var lik = project.endorsements;
                  return {
                    ...project,
                    endorsements: lik - 1,
                    likedUsers: project.likedUsers.filter(use => use != currUser)
                  };
                }
                return project;
              });
            });
            setisliked(false);
          }
        } else {
          window.alert('Failed to remove project from liked projects');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLikeInProgress(false);
      });
  } else {
    fetch(`http://localhost:8080/projects/addLikedProject/` + currUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ projectname: projectname, endorsements: likes + 1 })
    })
      .then(response => {
        if (response.ok) {
          if (completed == true||check=='profile') {
            setongoingData(prevData => {
              return prevData.map(project => {
                if (project.name == projectname) {
                  var lik = project.endorsements;
                  return {
                    ...project,
                    endorsements: lik + 1,
                    likedUsers: project.likedUsers.concat(currUser)
                  };
                }
                return project;
              });
            });
            setisliked(true);

          } 
          else {
            setcompletedData(prevData => {
              return prevData.map(project => {
                if (project.name == projectname) {
                  var lik = project.endorsements;
                  return {
                    ...project,
                    endorsements: lik + 1,
                    likedUsers: project.likedUsers.concat(currUser)
                  };
                }
                return project;
              });
            });
            setisliked(true);
          }
        } else {
          window.alert('Failed to remove project from liked projects');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLikeInProgress(false);
      });
  }
};

const checkToxicity = async (currentMessage) => {
  try {
    const predictions = await model.classify([currentMessage]);
    console.log(
      "toxic",predictions[6].results[0].match);
      console.log(
        "sexual",predictions[4].results[0].match);
        console.log(
          "threat",predictions[5].results[0].match);
    if (predictions[6].results[0].match === true ||predictions[4].results[0].match === true ||predictions[5].results[0].match === true) {
      return 0;

  }
  return 1;

} catch (error) {
    console.error('Error:', error);
    // Handle error
    return 2;
  }
};
  const handleClick = async() => {
    
    if (feedbackData.rating === 0) {
      window.alert('Rating is required');
      return;
    } else if (feedbackData.text === '') {
      window.alert('Text is required');
      return;
    }
  const toxic=await checkToxicity(feedbackData.text)
if(toxic===1 ||toxic===2){
  await  fetch('http://localhost:8080/projects/addfeedback/' + currUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    })
    .then(response => {
      window.alert('Submitted');
      const feed = {
        reviewer: currUser,
        img: userdata.profileInfo.profilePicture.url,
        message: {
          rating: feedbackData.rating,
          text: feedbackData.text,
          timestamp: Date.now()
        }
      };
  
      if (completed===true||check=='profile') {
        // Updating ongoingData with new feedback
        setongoingData(prevData => {
          return prevData.map(project => {
            if (project.name === projectname) {
              var n=project.feedbacks.length;
             let rate=(ratings*n+feedbackData.rating)/(n+1);
              return {
                ...project,
                feedbacks: [...project.feedbacks, feed],
                rating:rate.toString()
                
              };
            }
            return project;
          });
        });
      }
      else{
        setcompletedData(prevData => {
          return prevData.map(project => {
            if (project.name === projectname) {
              var n=project.feedbacks.length;
             let  rate=(project.rating*n+feedbackData.rating)/(n+1);
              return {
                ...project,
                feedbacks: [...project.feedbacks, feed],
                rating:rate.toString()
              };
            }
            return project;
          });
        });



      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }else
  {
    window.alert("Toxic Message Detected")
  }


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






  function toggleShareOptions() {
    const shareOptions = document.getElementById('shareOptions');
    shareOptions.style.display = shareOptions.style.display === 'none' ? 'block' : 'none';
  }
  
  function closeShareOptions() {
    const shareOptions = document.getElementById('shareOptions');
    shareOptions.style.display = 'none';
  }
  function shareOnWhatsApp() {
    const projectUrl = encodeURIComponent(window.location.href);
    const message = encodeURIComponent('Check out this link!');
    window.open(`https://api.whatsapp.com/send?text=${message}%0A${projectUrl}`);
}

  function shareOnTelegram() {
    const projectUrl = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${projectUrl}&text=Check out this project`);
  }
  function shareOnTwitter() {
    const projectUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this project: ");
    window.open(`https://twitter.com/intent/tweet?text=${text}${projectUrl}`);
  }



  function copyLinkToClipboard() {
    const projectUrl =window.location.href; // Replace with the actual URL you want to copy
    navigator.clipboard.writeText(projectUrl).then(() => {
      alert("Link copied to clipboard. You can now paste it anywhere!");
    }).catch(err => {
      console.error('Failed to copy the link to clipboard:', err);
      alert("Sorry, the link could not be copied.");
    });
  }
  
  

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

    


  let modalRef=useRef();
  function checkOutsideClick(e){

    if((modalOpen&& modalRef.current &&!modalRef.current.contains(e.target) )
  ){
      closeModal();
    }
  }
  useEffect(()=>{
    document.addEventListener('mousedown',checkOutsideClick);
  })
  return (
    console.log(78),
    <div id="details-main"  >
      
      {/* <button onClick={closeModal} style={{ float: 'right', zIndex:"1000", transform:"translateX(-50px)" }}>Close</button> */}
        <div id="details" ref={modalRef} >
        <i class="bi bi-x-lg" onClick={closeModal} style={{ fontSize:"25px",position: "absolute", top: "35px", right: "335px", cursor: "pointer", zIndex: "1000" }}></i>
          <div id="banner">
            <img src={modalImage?modalImage:unstarsss} alt="" id="banner-image" />
            <div id="layer"></div>
            <div id="inf1">
              <h1 id="projectName">{projectname}</h1>
              <h1 id="modalText">{modalText}</h1>
              <div id="inf2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ display: 'flex', gap: '10px' }}> {/* Adjusted for proper alignment of children */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="like">  
        <i className={`bi ${isliked ? 'bi-heart-fill' : 'bi-heart'} clickable-icon`}
          style={{ color: 'red', fontSize: '1.4rem' }}
          onClick={handleLike}
        ></i>
      </div>   
      <div style={{marginLeft:'8px'}}>{likes}</div>
    </div>
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
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <i class="bi bi-calendar-month" style={{fontSize:'40px', marginRight:'25px'} }></i>
              <div>
              <div><span style={{ color: '#7a7777' }}>Created Date:</span> {formattedCreateDate}</div>
              <div>{!completed&&(
            <div><span style={{ color: '#7a7777' }}>Completed Date:</span> {formattedFinishDate}</div>
            )}
            {completed&&(
            <div><span style={{ color: '#7a7777' }}>Completed Date:</span>  Ongoing</div>
            )}
            
            </div>
            </div>
            </div>
              <div id="linker"> 
              <div>
                  {open && completed&& ( 
                    <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => {sendCollaborate()}}>
                      <i className="bi bi-person-plus-fill clickable-icon" style={{ fontSize: '30px' }}></i>
                      <div>Collaborate</div>
                    </div>
                  )}
              </div>

              <div id="shareOptions" style={{ display: 'none', position: 'fixed', bottom: '20%', right: '20%', backgroundColor: '3B3B3B', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', textAlign: 'center', zIndex: 1000 }}>
                  <i class="bi bi-x-lg" style={{position: 'absolute',cursor: 'pointer',top:'5px',right:'5px'}}onClick={closeShareOptions}></i>
                <div style={{ marginBottom: '10px' }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); shareOnWhatsApp(); }}><i className="bi bi-whatsapp" style={{ fontSize: '24px',marginRight:'5px' }}></i></a>
                  <a href="#" onClick={(e) => { e.preventDefault(); shareOnTelegram(); }}><i className="bi bi-telegram" style={{ fontSize: '24px' }}></i></a>
                  <a href="#" onClick={(e) => { e.preventDefault(); shareOnTwitter(); }}><i className="bi bi-twitter-x" style={{ fontSize: '24px' }}></i></a>
                  <a href="#" onClick={(e) => { e.preventDefault(); copyLinkToClipboard(); }}><i className="bi bi-clipboard-check-fill" style={{ fontSize: '24px' }}></i></a>
                </div>
              </div>


              <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={toggleShareOptions}>
                <i className="bi bi-send clickable-icon" style={{ fontSize: '30px' }}></i>
                <div style={{ marginRight: '5px' }}>Share</div> 
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



            








                     {!feed&&( 
                      <div>
                     <div id="ratting">
                            <img src={userdata.profileInfo.profilePicture.url} className="feedback-pic" alt="" />
                            <div className="profile-id">
                                <div className="profile-name">{currUser}</div>
                                <form id="submiting" action="#" style={{display: (flag===1) ? "flex" : "none"}}>
                                    <div className="stars">
                                      <img src={(feedbackData.rating>0)?star:unstar} className="star star-s" data-rating="1" alt="" onClick={()=>setfeedbackData({...feedbackData,rating:1})}/>
                                      <img src={(feedbackData.rating>1)?star:unstar} className="star star-s" data-rating="2" alt="" onClick={()=>setfeedbackData({...feedbackData,rating:2})}/>
                                      <img src={(feedbackData.rating>2)?star:unstar} className="star star-s" data-rating="3" alt="" onClick={()=>setfeedbackData({...feedbackData,rating:3})}/>
                                      <img src={(feedbackData.rating>3)?star:unstar} className="star star-s" data-rating="4" alt="" onClick={()=>setfeedbackData({...feedbackData,rating:4})}/>
                                      <img src={(feedbackData.rating>4)?star:unstar} className="star star-s" data-rating="5" alt="" onClick={()=>setfeedbackData({...feedbackData,rating:5})}/>
                                    </div>
                                    {/* <input type="date" id="date" value=""/> */}
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
                                value={feedbackData.text}
                                onChange={(e)=> setfeedbackData({...feedbackData,text:e.target.value})}
                                

                                
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
                                borderLeft: 'none', // Hide the left border to merge with the TextField
                                
                            }} onClick={handleClick}>
                              <i className="bi bi-send clickable-icon" style={{ fontSize: '25px', marginBottom: '9px' }}></i>

                            </div>
                            
                        </div>
                        </div>
                        )}
                <div>

                <FeedbackComponent feedbackArray={feedbackArray}/>
                </div>   
                
              
            </div>
            
           <div>
            <div style={{fontSize:"1.3rem", marginTop:'15px',marginBottom:'15px'}}> <i class="bi bi-people-fill" style={{fontSize:'1.5rem',marginRight:'0.5rem'}}></i> Contributors</div>
            <div style={{
              overflowY: 'auto',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              maxHeight:'300px'
              }}
              >
{
  creator.map((image, index) => (
    <>
      {/* <a href={`/profile/${image.username}`} className="profile-link"> */}
        <div id="profile" onClick={()=>{navigate("/profile/"+image.username)}}>
          <img src={image.profilePic?image.profilePic:pro} id="profile-picture" alt="" />
          <div className="profile-details">
            <span>{image.username}</span>
          </div>
        </div>
      {/* </a> */}
      {index < creator.length - 1 && <div style={{ borderTop: '.5px solid #736d6d', marginTop: '1rem', marginBottom: '1rem' }}></div>}
    </>
  ))
}            
              </div>
              </div>
              <div style={{ borderTop: '.5px  solid #736d6d', marginTop: '1rem', marginBottom: '1rem' }}></div>
           
          </div>
        </div>
    </div>
  );
};

export default CardExpanded;















