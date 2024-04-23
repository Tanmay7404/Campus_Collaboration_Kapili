import React from "react";
import UserCard from "./carduser"; // Assuming carduser.js is in the same directory
import sampleUserCardContent from "./carduserdata"; // Import your user data array
import "./cardlist.css"
import logo from '../../assets/images/logo.svg';
import search from '../../assets/images/search.svg';

const CardListu = () => {
  return (
    <div id="wholepage">
        {/* <div id="navbar">
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
        </div> */}

        {/* <div id="typeButton">
              <button id="personal">Profile</button>
              <button id="global">Project</button>
              <button id="global">Course</button>

        </div> */}
    
        <div className="card-list">
        {sampleUserCardContent.map((userData, index) => (
            <UserCard key={index} user={userData} />
        ))}
        </div>
    </div>
  );
};

export default CardListu;
