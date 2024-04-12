import React, { useContext, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './profile.css';
// import Project from './project.js';
// import Course from './course.js';
// import EditProfile from './editProfilePage.js';
import profilePic from '../assets/images/profile.jpg';
import Bio from '../components/ProfilePage/bio'
import Project from '../components/ProfilePage/project'
import UserdataContext from '../userdataContext';

const Profile = () => {
  const{userdata}=useContext(UserdataContex);
  const handleLogOut = () => {
    window.location.href = 'http://localhost:8080/logout';
  };
  const [selectedButton, setSelectedButton] = useState('project');

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  //dynamic variables (for backend)
  const userName = 'Soumya Savarn';
  const userEmail = 's.savarn@iitg.ac.in';
  const userDepartment = 'DSAI, IITG';
  const userSkills = ['BlockChain', 'MySQL', 'iOS dev', 'TensorFlow'];

  const projects = [{
    title: "Nirvanna",
    likes: 10,
    contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg", "./Images/profile3.jpg"],
    projectImage: "./Images/swigy.png"
  },{
    title: "Nirvanna",
    likes: 10,
    contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg"],
    projectImage: "./Images/swigy.png"
  },{
    title: "Nirvanna",
    likes: 10,
    contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg", "./Images/profile3.jpg"],
    projectImage: "./Images/swigy.png"
  }];

  const courses = [{
    title: "C++ Basics",
    likes: 78,
    contributors: ["./Images/profile.jpeg"],
    courseImage: "./Images/swigy.png"
    },{
      title: "C++ Basics",
      likes: 56,
      contributors: ["./Images/profile.jpeg"],
      courseImage: "./Images/swigy.png"
      }];
    
//-----------------------------------------//
  return (
        
    <>
        <div id="profilelayer"></div>
        <div id="profilelayer1"></div>
        <div id="profilelayer2"></div>
        {/* <div id="profileellips1"></div> */}
        
        <div id="profilepage1">
            
          <div id="profileleft">
            
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
                <img src="./Images/facebook.svg" alt="" />
                <img src="./Images/linkedin.svg" alt="" />
                <img src="./Images/apple.svg" alt="" />
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
                <h3 onClick={handleLogOut}>Log Out</h3>
              </div>
            </div>
          </div>
          <div id="profileright">
          
            <div id="buttons">
            <Link style={{textDecoration: 'none'}}
                to="/"
                className={
                  selectedButton === 'bio'
                    ? 'now-selected'
                    : 'not-selected'
                }
                onClick={() => handleButtonClick('bio')}
              >
                Bio
              </Link>
              <Link style={{textDecoration: 'none'}}
                to="/"
                className={
                  selectedButton === 'project'
                    ? 'now-selected'
                    : 'not-selected'
                }
                onClick={() => handleButtonClick('project')}
              >
                Projects
              </Link>
              <Link style={{textDecoration: 'none'}}
                to="/Course"
                className={
                  selectedButton === 'course'
                    ? 'now-selected'
                    : 'not-selected'
                }
                onClick={() => handleButtonClick('course')}
              >
                Courses
              </Link>
            </div>

            <div>
{/* <Bio></Bio> */}
{/* <Project></Project> */}
            </div>
            {/* <Routes>
              <Route exact path="/EditProfile" element={<EditProfile/>} />
              <Route path="/" element={<Project projects = {projects} />} />
              <Route exact path="/Course" element={<Course courses = {courses}/>} />
            </Routes> */}
            
          </div>
        </div>
        {/* <Routes>      <Route exact path="/EditProfile" element={<EditProfile/>} />
            </Routes> */}
    </>
  );
};

export default Profile;
