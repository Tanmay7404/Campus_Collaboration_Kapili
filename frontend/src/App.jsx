



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




import { Link, Route, Routes} from 'react-router-dom';
import './App.css';
import React from 'react';
// import ChatPage from './pages/ChatPage.js';
// import CreateProjectPage from './pages/createProject';
// import EditCoursePage from './pages/editCourse';
// import CreateCoursePage from './pages/createCourse';
// import CreateProfilePage from './pages/createProfile';
// import EditProfilePage from './pages/editProfilePage';
// import EditProjectPage from './pages/editProject';
// import Global from './pages/Global';
// import Card from './components/searchuser/carduser';
// import CardList from './components/searchuser/cardlist';
// import GlobalChat from './pages/GlobalChat';

//Import from Pages

import 'bootstrap/dist/css/bootstrap.min.css'

// import Home from "./pages/home.jsx";
import Login from './pages/login.jsx';
import Navbar from './components/NavBar/navbar.jsx';
import Explore from './pages/explore.jsx';
// import Profile from './pages/profile.js';
import TestPage from './pages/testPage.jsx';
// import Search from './pages/search.jsx'

function App() {
  return (

    <Routes>
      <Route path ="/login" element= {<Login/>}></Route>
      <Route element ={<Navbar/>}>
        <Route path ="/explore" element = {<Explore/>}/>
        <Route path ="/chat" element = {<TestPage/>}/>
        <Route path = "/profile/:username" element = {<TestPage/>} />
        <Route path = "/search/*" element = {<TestPage/>} />
      </Route>
      <Route path = "/createProfile" element={<TestPage/>}/>
      <Route path = "/createProject" element={<TestPage/>}/>
      <Route path = "/createCourse" element={<TestPage/>}/>
      <Route path = "/editProfile/:username" element={<TestPage/>}/>
      <Route path = "/editProject/:projectname" element={<TestPage/>}/>
      <Route path = "/editCourse/:coursename" element={<TestPage/>}/>
    </Routes>
    // <>
    // <Home/>
    // {/* <ChatPage people={peopleData} currentUser={currentUser} /> */}
    // </>

  );
}

export default App;
