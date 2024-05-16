import React,{useState} from 'react';
import './profile.css';
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Card from '../ExplorePage/card.jsx';

const  Project = ({userprojects,setongoingData,setcompletedData,setcourseData,check}) => {


  
    const listproject = userprojects.map((element) => {
        return (
          <div className="project" key={element.id} >
            {/* <div id="like-div">
              <img src="./Images/like.svg" id="like" alt="" />
              <span>{element.likes}</span>
            </div>
            <div id="contri">
                        {element.contributors.map((contributor, index) => (
                            <img key={index} src={contributor} alt={`Contributor ${index + 1}`} />
                        ))}
            </div>
            <img src={element.projectImage} className="www" alt={element.title} />
            <p>{element.title}</p> */}
            <Card details = {element}  setongoingData={setongoingData} setcompletedData={setcompletedData} setcourseData={setcourseData} check={check} />









          </div>
        );
      });

      
    return (
            <>
            
            
            <div id="projects" >

            <div id="upload" style={{height:'auto'}}> 
                 <NavLink to="/createProject" className="nav-link"><i class="bi bi-plus-circle" style={{fontSize:'3rem'}}></i></NavLink>
                 <div>Create Project </div>
                
            </div>

            {listproject}

            </div>

            </>
    );
};

export default Project;