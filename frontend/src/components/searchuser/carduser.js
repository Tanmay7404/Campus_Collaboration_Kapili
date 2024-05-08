import React, { useState } from "react";
import likeImg from "../../assets/images/like.svg";
import starImg from "../../assets/images/star.svg";
// import friendImg from "../../assets/images/friend.svg";
// import contactImg from "../../assets/images/contact.svg";
// import CardExpanded from "./CardExpanded";
import sampleUserCardContent from "./carduserdata";
import './carduser.css'
import { useNavigate } from "react-router-dom";

const UserCard = ({ user ,currentUserName}) => {
const navigate=useNavigate()
    // const handleCardClick = () => {
    //     // Add logic to open the link when the card is clicked
    //     window.location.href = user.link;
    // };

    const handleAddFriend = async(user) => {
        // Add logic to handle adding the user as a friend
        const link = "http://localhost:8080/user/addFriend" ;
        console.log(link);
      const response= await fetch(link, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify( {
            "currentUserName":currentUserName,"friendUserName":user
          }),
        });
         const res = await response.text()

         window.alert( res);

    };
    const getInTouch = async(user) => {
        try {
         const firstResponse = await fetch('http://localhost:8080/chats/personalChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friendUsername: user,
         currUsername: currentUserName,
      }),
    });
    const userData = await firstResponse.json();
       if(userData){   
        navigate("/chat/"+currentUserName+"?name="+user)}
          return;
      }
      catch(err){
        console.log(err)
          console.log("error in get in touch");
          return;
      }
      }; 
    // const handleGetInTouch = (e) => {
    //     // Add logic to handle getting in touch with the user
    //     e.stopPropagation();
    //     console.log(`Getting in touch with ${user.username}`);
    // };

    return (
        <div>
            <div className="user-card" >
                <div id="upperpart">
                    <div id="imgi"> <img src={user.image}  alt="" /></div>

                    <div className="user-buttons">
                        
                        <div className="but">
                            <button onClick={()=>{getInTouch(user.username)}} className="button">
                                
                                Get in Touch
                            </button>


                        </div>

                        <div className="but">
                            <button onClick={()=>{handleAddFriend(user.username)}} className="button">
                            
                                Add Friend
                            </button>

                        </div>
                        
                    </div>

                </div>
                
            
                <div id="downpart">
                    <div className="nameu">
                        <h1>{user.name}</h1>
                    </div>

                    <div className="username">
                        <h3>{user.username}</h3>
                    </div>

                    <div className="useremail">
                        <p>{user.email}</p>
                    </div>
                    
                    
                    
                    
                </div>
                
            </div>
        </div>
    );
};




const Card = (/*{ details }*/) => {
    // const [modalOpen, setModalOpen] = useState(false);

    // const openModal = () => setModalOpen(true);
    // const closeModal = () => setModalOpen(false);

    return (
        
         <div className="nothing" >     {/*onClick={openModal}>*/}
                
                

            <UserCard user={sampleUserCardContent} />

        </div>
            // {/* {modalOpen && <UserCard user={details} />} */}
       
    );
};

export default UserCard;
