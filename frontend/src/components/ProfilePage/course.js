import React from 'react';
import './profile.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

const Course = ({ courses }) => {
  const listcourse = courses.map((element) => {
    return (
      <div className="project" key={element.id}>
        <div id="like-div">
          <img src="./Images/like.svg" id="like" alt="" />
          <span>{element.likes}</span>
        </div>
        <div id="contri">
          {/* Render contributors here */}
        </div>
        <img src={element.courseImage} className="www" alt={element.title} />
        <p>{element.title}</p>
      </div>
    );
  });

  return (
    <>
      <div id="projects">
        <div id="upload">
          <div>
            <div id="circle">
            <Link to="/CreateCoursePage" style={{textDecoration: 'none'}}><img src="./Images/plus-1512-svgrepo-com.svg" alt="" /></Link>
            </div>
            
            
            Create
                    
            
          </div>
        </div>
        {listcourse}
      </div>
    </>
  );
};

export default Course;