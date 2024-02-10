// App.js

import React from 'react';
import './style.css'; // Import your stylesheet
import ChatPage from './ChatPage';
import profile from './images/profile.jpeg';
import prof from './images/profile2.jpeg';




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
  id: 1, // Set the current user's id
  name: 'Simon', // Set the current user's name
  profilePic: profile, // Set the current user's profile picture
};

const App2 = () => {




  return (
    <div>



      <ChatPage people={peopleData} currentUser={currentUser} />


    </div>
  );
};

export default App2;
