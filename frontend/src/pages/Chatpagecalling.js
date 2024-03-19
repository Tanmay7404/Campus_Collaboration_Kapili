import React, { useContext } from 'react';
// import './style.css'; // Import your stylesheet
import GlobalChat from './GlobalChat.js';
import profile from '../assets/images/profile.jpeg';
import prof from '../assets/images/profile2.jpeg';
import logo from '../assets/images/logo.svg'
import { useState ,useEffect} from 'react';
import { userContext } from '../userContext.jsx';

import ChatPage from './ChatPage.js';
// import reportWebVitals from './reportWebVitals';


const currentUser = {
  id: "65c68489cb8fad53daf0f3d4", // Set the current user's id
  name: 'Simon', // Set the current user's name
  profilePic: profile, // Set the current user's profile picture

};
const currentUser2 = {
  id: "65c684013c2779afe793e1c2", // Set the current user's id
  name: 'Shushant', // Set the current user's name
  profilePic: profile, // Set the current user's profile picture

};
const currentUser3 = {
  id: "65c739c5470e4ba5247c3025", // Set the current user's id
  name: 'Ramu', // Set the current user's name
  profilePic: profile, // Set the current user's profile picture

};
const Chatpagecalling = () => {
 // const currUser=useContext(userContext)
 const currUser="Simon"
  useEffect(()=>{
    const fetchData = async () => {
      try {
    const response = await fetch('http://localhost:8080/user/getUserChatPage/' + currUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      // You can include additional headers or body if needed
    });

    const data = await response.json();
   setSelectedUser(data)
    console.log(data)

  }
    catch (error) {
      console.error('Error fetching userId:', error);
    }
  }

  fetchData()

  },[])
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserSelection = (user) => {
    console.log(user)
    setSelectedUser(user)  };

    return (

      <div>
        {!selectedUser && (
          <div>
      <h2>Choose a User:</h2>
      <button onClick={() =>  handleUserSelection(currentUser)}>Simon</button>
      <button onClick={() => handleUserSelection(currentUser2)}>Shushant</button>
      <button onClick={() => handleUserSelection(currentUser3)}>Ramu</button>

      <br />
      </div>
       ) }
      {selectedUser && (
        <div>
          <ChatPage currentUser={selectedUser} />
        </div>
      )}
    </div>

    );
  };
  
export default Chatpagecalling;