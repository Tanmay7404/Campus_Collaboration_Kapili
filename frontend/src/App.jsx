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

function App() {
  return (
  <Routes>
    <Route path="/" element = {   
<CreateProfilePage/>
} ></Route>
  </Routes>

  );
}

export default App;
