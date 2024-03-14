import React from 'react';
import './style.css'; // Import your stylesheet
import GlobalChat from './GlobalChat.js';
import profile from '../assets/images/profile.jpeg';
import prof from '../assets/images/profile2.jpeg';
import logo from '../assets/images/logo.svg'


import ChatPage from './ChatPage.js';
// import reportWebVitals from './reportWebVitals';
const peopleData = [
  {
    id: 2,
    name:'Shushant',  
    messages: [
      
      { text: 'Hello there!', date: '10/02/2024', time: '10:45 AM', senderId: 1 },
      { text: '!', date: '3/12/23', time: '10:45 AM', senderId: 1 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Ysdas...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yasadas...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

      { text: 'asda...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

      // Add more messages as needed
    ],
    
    isGroup: false,
  },
  {
    id: 3,
    name: 'Priyan',
    profilePic: prof,
    messages: [
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 3 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 3 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 1 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 1 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
      { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

      // Add more messages as needed
    ],
    lastSeen: { date: '3/12/23', time: '10:50 AM' },
    isGroup: false,
  },
  // Add more people as needed
];

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

const Chatpagecalling = () => {
    return (
      <div>
        <ChatPage   currentUser={currentUser} />
      </div>
    );
  };
  
export default Chatpagecalling;