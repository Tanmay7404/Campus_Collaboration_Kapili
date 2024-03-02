import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import ChatPage from './pages/ChatPage.js';
import profile from './assets/images/profile.jpeg';
import prof from './assets/images/profile2.jpeg';

//Import from Pages

import 'bootstrap/dist/css/bootstrap.min.css'



// const peopleData = [
//   {
//     id: 2,
//     name:'Shushant',  
//     messages: [
      
//       { text: 'Hello there!', date: '10/02/2024', time: '10:45 AM', senderId: 1 },
//       { text: '!', date: '3/12/23', time: '10:45 AM', senderId: 1 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Ysdas...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yasadas...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

//       { text: 'asda...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

//       // Add more messages as needed
//     ],
    
//     isGroup: false,
//   },
//   {
//     id: 3,
//     name: 'Priyan',
//     profilePic: prof,
//     messages: [
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 3 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 3 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 1 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 1 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },
//       { text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2 },

//       // Add more messages as needed
//     ],
//     lastSeen: { date: '3/12/23', time: '10:50 AM' },
//     isGroup: false,
//   },
//   // Add more people as needed
// ];

// const currentUser = {
//   id: 1, // Set the current user's id
//   name: 'Simon', // Set the current user's name
//   profilePic: profile, // Set the current user's profile picture
// };




import Home from "./pages/home.jsx";

function App() {
  return (
    <>
    <Home/>
    {/* <ChatPage people={peopleData} currentUser={currentUser} /> */}
    </>

  );
}

export default App;
