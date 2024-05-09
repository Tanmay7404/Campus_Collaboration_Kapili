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
    return (
        
            <div className="user-card" >
                <div id="upperpart">
                    <div id="imgi" onClick={()=>{navigate("/profile/"+user.username)}} > <img src={user.image}  alt="" /></div>
                    <div className="user-buttons">
                        
                        <div className="but">
                        {user.username!=currentUserName&&(
                            <button onClick={()=>{getInTouch(user.username)}} className="button">
                                Get in Touch    
                            </button>
                        )}

                        </div>
                        <div className="but">
                            {user.username!=currentUserName&&(
                            <button onClick={()=>{handleAddFriend(user.username)}} className="button">
                                Add Friend
                            </button>)}
                        </div>
                        <div className="but">
                        {user.username==currentUserName&&(
                            <button  className="button">
                                You  
                            </button>
                        )}

                        </div>
                        
                    </div>

                </div>
                
            
                <div id="donpart">
                    <div className="nameu">
                        {/* <h1>{user.name}</h1> */}
                   <h1>
                            {user.name.length > 10 ? <marquee > {user.name} </marquee>: user.name}
                        </h1>   
                    </div>

                    <div className="username">
                        <h3>
                            {user.username.length>14 ? <marquee > {user.usernamename} </marquee> : user.username}
                        </h3>
                    </div>

                    <div className="useremail">
                    
                        <p>{user.email.length>30 ? <marquee > {user.email} </marquee> : user.email}</p>
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
