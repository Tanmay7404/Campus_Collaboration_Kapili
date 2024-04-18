
import { Link, Route, Routes} from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
// import CreateProjectPage from './pages/createProject';
// import EditCoursePage from './pages/editCourse';
// import CreateCoursePage from './pages/createCourse';
import CreateProfilePage from './pages/createProfile';
// import EditProfilePage from './pages/editProfilePage';
// import EditProjectPage from './pages/editProject';
// import Global from './pages/Global';
// import Card from './components/searchuser/carduser';
// import CardList from './components/searchuser/cardlist';
// import GlobalChat from './pages/GlobalChat';
import ChatpageCalling from './pages/Chatpagecalling';
import ChatPage from './pages/ChatPage.js';

//Import from Pages

import 'bootstrap/dist/css/bootstrap.min.css'
import { ModelProvider } from './tsModelContext.js';

// import Home from "./pages/home.jsx";
import Login from './pages/login.jsx';
import Navbar from './components/NavBar/navbar.jsx';
import Explore from './pages/explore.jsx';
// import Profile from './pages/profile.js';
import TestPage from './pages/testPage.jsx';
// import Search from './pages/search.jsx'
// import { UserProvider } from './userContext.jsx';
import UserdataState from './userdataState.js';
import Profile from './components/ProfilePage/profile.js';
import SucessLogin from "./pages/sucessLogin.jsx"
import UserCardList from './components/searchuser/usercardlist.js';
import CreateProjectPage from './pages/createProject.js';
import ExplorePg1 from './components/ExplorePage/explorePage1.jsx';

function App() {
  return (
    
  //  <UserProvider>
      <UserdataState>
        <ModelProvider>
      <Routes>
        <Route path ="/login" element= {<Login/>}/>
        <Route path = "/sucesslogin/:username" element = {<SucessLogin/>}/>
        <Route element ={<Navbar/>}>
          <Route path ="/*" element = {<Explore/>}/>
          <Route path ="/chat/:username" element = {<ChatPage/>}/>
          <Route path = "/profile/:userName" element = {<Profile/>} />
          <Route path = "/search/*" element = {<UserCardList/>} />
        </Route>
        <Route path = "/createProfile/:email/:fullname" element={<CreateProfilePage/>}/>
        <Route path = "/createProject" element={<CreateProjectPage/>}/>
        <Route path = "/createCourse" element={<TestPage/>}/>
        <Route path = "/editProfile/:username" element={<TestPage/>}/>
        <Route path = "/editProject/:projectname" element={<TestPage/>}/>
        <Route path = "/editCourse/:coursename" element={<TestPage/>}/>
      </Routes>
      </ModelProvider>
      </UserdataState>
    // </UserProvider>
    // <>
    // <Home/>
    // {/* <ChatPage people={peopleData} currentUser={currentUser} /> */}
    // </>
 
  );
}

export default App;
