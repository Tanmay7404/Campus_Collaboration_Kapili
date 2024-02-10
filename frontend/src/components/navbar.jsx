import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logoImg from "../Images/logo.png";
import searchSVG from "../Images/search.svg";

import './navbar.css';
import Explore from './ExplorePage/explore.jsx';
// import Chats from './chat.jsx';
// import Profile from './profile.jsx';
import Tag from "./tag.jsx";

const Navbar = (props) => {
  const [selectedButton, setSelectedButton] = useState("explore");
  const [search, setSearch] = useState(false);
  

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  return (
    <>
      
      <BrowserRouter>
        <nav>
          <img src= {logoImg} style={{ height: '35px' }} id="logo" alt="" onClick={()=>setSearch(false)}/>
          <div id="search" onClick={()=>setSearch(true)}>
            <input type="text" name="" id="" placeholder="Search" />
            <img src={searchSVG} alt=""/>
            {search? <Tag/> : null}
          </div>
          <div id="nav-part2" onClick={()=>setSearch(false)}>
            <Link to="/" className={`nav-link ${selectedButton === "explore" ? "selected" : ""}`} onClick={() => handleButtonClick("explore")}>Explore</Link>
            <Link to="/Chats" className={`nav-link ${selectedButton === "chats" ? "selected" : ""}`} onClick={() => handleButtonClick("chats")}>Chats</Link>
            <Link to="/Profile" className={`nav-link ${selectedButton === "profile" ? "selected" : ""}`} onClick={() => handleButtonClick("profile")}>Profile</Link>
          </div>
        </nav >
        <div onClick={()=>setSearch(false)}>
          <Routes>
            <Route exact path="/" element={<Explore data= {props.data.explore} />} />
            {/* <Route exact path="/Chats" element={<Chats data = {props.data.chat} />} />
            <Route exact path="/Profile" element={<Profile data = {props.data.profile} />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Navbar;
