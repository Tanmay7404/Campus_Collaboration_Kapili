import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
//Import from Pages
import TestPage from "./pages/testPage.jsx";
import Chat from "./components/testSocket.js"
import CreateProfilePage from './createProfile.js';
import CreateCoursePage from './createCourse.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import EditProfilePage from './editProfilePage.js';
import EditProjectPage from './editProject.js';
import CreateProjectPage from './createProject.js';
import Home from "./pages/home.jsx";

function App() {
  return (
  <Routes>
    <Route path="/" element = {   
<Home/>
} ></Route>
  </Routes>

  );
}

export default App;
