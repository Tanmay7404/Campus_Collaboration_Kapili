import React,{useState} from 'react';
import './profile.css';
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Card from '../ExplorePage/card.jsx';

const  Project = ({userprojects,setongoingData,setcompletedData,setcourseData,check,user,person}) => {


  
    const listproject = userprojects.map((element) => {
        return (
          <div className="project" key={element.id}>
            <Card details = {element}  setongoingData={setongoingData} setcompletedData={setcompletedData} setcourseData={setcourseData} check={check} />
          </div>
        );
      });

      
    return (
            <>
            
            
            <div id="projects" >
            {user===person&&(
            <div id="upload"> 
                 <NavLink to="/createProject" className="nav-link"><i class="bi bi-plus-circle" style={{fontSize:'3rem'}}></i></NavLink>
                 <div>Create Project </div>
                
            </div>)}

            {listproject.length === 0 &&user!=person ? (
          <div className="no-message">No project available</div>
        ) : (
          listproject
        )}

            </div>

            </>
    );
};

export default Project;