import React from 'react';
import './style.css'; // Import your stylesheet
import GlobalChat from './GlobalChat.js';
import profile from './images/profile.jpeg';
import prof from './images/profile2.jpeg';
import logo from './images/logo.svg'



const peopleData = [
    {
      id: 0,
      name: 'Global Chat for everyone',
      profilePic: logo,
      messages: [
        { image:profile,text: 'Hello there!', date: '3/12/23', time: '10:45 AM', senderId: 1,senderName:'tanmay' },
        { image:profile,text: 'this meesage was sent by tanmay', date: '3/12/23', time: '10:45 AM', senderId: 1,senderName:'tanmay' },
        { image:profile,text: '!', date: '3/12/23', time: '10:45 AM', senderId: 1,senderName:'tanay' },
        { image:prof,text: 'abcd', date: '3/12/23', time: '10:50 AM', senderId: 2,senderName:'sushant' },
        { image:profile,text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2,senderName:'shreyansh' },
        { image:profile,text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 2,senderName:'sh' },
        { image:profile,text: 'Yeah...', date: '3/12/23', time: '10:50 AM', senderId: 4,senderName:'shreyansh' },
        { image:profile,text: 'Hello there!', date: '3/12/23', time: '10:45 AM', senderId: 1,senderName:'tanmay' },
        { image:profile,text: 'this meesage was sent by tanmay', date: '3/12/23', time: '10:45 AM', senderId: 1,senderName:'tanmay' },
        { image:profile,text: '!', date: '3/12/23', time: '10:45 AM', senderId: 1,senderName:'tanay' },
        { image:prof,text: 'abcd', date: '09/02/2024', time: '10:50 AM', senderId: 2,senderName:'sushant' },
        { image:profile,text: 'Yeah...', date: '08/02/2024', time: '10:50 AM', senderId: 2,senderName:'shreyansh' },
        // Add more messages as needed
      ],
      lastSeen: { date: '3/12/23', time: '10:45 AM' },
      isGroup: false,
    }
];


const currentUser ={
    id: 1,
    name: 'Tanmya',
    image : '',


};



const Global = () => {
    return (
      <div>
        <GlobalChat peopleArray={peopleData}  currentUser={currentUser} />
      </div>
    );
  };
  
export default Global;