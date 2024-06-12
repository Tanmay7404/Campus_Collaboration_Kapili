import React,{useState} from 'react';
import './profile.css';
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Card from '../ExplorePage/card.jsx';


const  Course = ({usercourses,setongoingData,setcompletedData,setcourseData,check, user,person}) => {  

    const listcourse = usercourses.map((element) => {
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
                 <NavLink to="/createCourse" className="nav-link"><i class="bi bi-plus-circle" style={{fontSize:'3rem'}}></i></NavLink>
                 <div>Create Course </div>
                
            </div>)}

           {listcourse.length === 0 ? (
          <div className="no-message">No courses available</div>
        ) : (
          listcourse
        )}

            </div>

            </>
    );
};

export default Course;