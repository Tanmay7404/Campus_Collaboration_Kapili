import React from "react";
import logo from '../../assets/images/logo.svg';
import search from '../../assets/images/search.svg';
import './coursecardlist.css'
import coursedata from "./coursedata";
import Coursecard from "./coursecard";

const CourseCardList = () => {
    return (
    
      
        <div className="card-listc">
          {coursedata.map((coursedata, index) => (
              <Coursecard key={index} course={coursedata} />
          ))}
        </div>
    );
  };
  
  export default CourseCardList;