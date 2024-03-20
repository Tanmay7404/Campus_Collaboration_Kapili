import React from "react";
import logo from '../../assets/images/logo.svg';
import search from '../../assets/images/search.svg';
import './coursecardlist.css'
import coursedata from "./coursedata";
import Coursecard from "./coursecard";

const CardListc = () => {
    return (
    <div id="wholepage">
        <div id="navbar">
            <nav>
              <img src={logo} id="logo" alt="" />
              <div id="search">
                <input type="text" name="" id="sch" placeholder="Search" />
                <img src={search} alt="" />
              </div>
              <div id="nav-part2">
                <a href="#">Explore</a>
                <a href="#">Chats</a>
                <a href="#">Profile</a>
              </div>
            </nav>
        </div>
  
        <div id="typeButton">
                <button id="global">Profile</button>
                <button id="global">Project</button>
                <button id="personal">Course</button>
  
        </div>
      
        <div className="card-list">
          {coursedata.map((coursedata, index) => (
              <Coursecard key={index} course={coursedata} />
          ))}
        </div>
    </div>
    );
  };
  
  export default CardListc;