import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import './profile.css';
import Project from './project.js';
import Course from './course.js';
import EditProfile from './editProfilePage.js';
import CreateCoursePage from './createCourse.js';
import CreateProjectPage from './createProject';

const Profile = () => {
  const [selectedButton, setSelectedButton] = useState('project');
  
  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  //dynamic variables (for backend)
  const userName = 'Soumya Savarn';
  const userEmail = 's.savarn@iitg.ac.in';
  const profilePic = './Images/profile.jpeg';
  const userDepartment = 'DSAI, IITG';
  const userSkills = ['BlockChain', 'MySQL', 'iOS dev', 'TensorFlow'];
  const github = '';
  const linkedin = '';
  const insta = '';

  const projects = [
    {
      title: "Nirvanna",
      likes: 10,
      contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg", "./Images/profile3.jpg"],
      projectImage: "./Images/swigy.png"
    },
    {
      title: "Campus Collab",
      likes: 12,
      contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg"],
      projectImage: "./Images/swigy.png"
    },
    {
      title: "Cab Sharing",
      likes: 34,
      contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg", "./Images/profile3.jpg"],
      projectImage: "./Images/swigy.png"
    }
  ];

  const courses = [
    {
      title: "C++ Basics",
      likes: 78,
      contributors: ["./Images/profile.jpeg"],
      courseImage: "./Images/swigy.png"
    },
    {
      title: "Ruby on Rails",
      likes: 56,
      contributors: ["./Images/profile.jpeg"],
      courseImage: "./Images/swigy.png"
    }
  ];
    
  return (
    <BrowserRouter>
      <div id="main">
        <div id="layer"></div>
        <div id="layer1"></div>
        <div id="layer2"></div>
        <div id="ellips1"></div>
        
        <div id="page1">
          <div id="left">
            <h1>Profile</h1>
            <div id="self-in">
              <img src={profilePic} id="profile-picture" alt="" />
              <div id="self2">
                <h2>{userName}</h2>
                <h3>{userEmail}</h3>
                <h3>{userDepartment}</h3>
              </div>
              <div id="self3">
                <img src="./Images/insta.svg" alt="" />
                <img src="./Images/linkedin.svg" alt="" />
                <img src="./Images/github.svg" alt="" />
              </div>
              <div id="self4">
                {userSkills.map((skill, index) => (
                  <div key={index} className="tags">
                    {skill}
                  </div>
                ))}
              </div>
              <div id="self5">
                <button id="Edit">
                  <img src="./Images/pencil.png" alt="" id="pencil" />
                  <Link style={{textDecoration: 'none'}} to="/EditProfile">Edit Your Profile</Link>
                </button>
                <h3>Log Out</h3>
              </div>
            </div>
          </div>
          <div id="right">
            <div id="buttons">
              <Link style={{textDecoration: 'none'}} to="/" id={selectedButton === 'project' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('project')}>Projects</Link>
              <Link style={{textDecoration: 'none'}} to="/Course" id={selectedButton === 'course' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('course')}>Courses</Link>
            </div>
            <Routes>
              <Route exact path="/" element={<Project projects={projects} />} />
              <Route exact path="/Course" element={<Course courses={courses} />} /> 
              <Route exact path="/CreateCoursePage" element={<CreateCoursePage projects={projects} />} /> 
              <Route exact path="/CreateProjectPage" element={<CreateProjectPage projects={projects}/>} />  
              <Route exact path="/EditProfile" element={<EditProfile projects={projects} name={userName} 
              email={userEmail} profilePic={profilePic} dept={userDepartment} userSkills={userSkills}/>} /> 
            </Routes> 
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Profile;
