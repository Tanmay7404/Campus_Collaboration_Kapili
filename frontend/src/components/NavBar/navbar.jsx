import React, { useState } from 'react';
import { Link,NavLink, Outlet } from 'react-router-dom';
import logoImg from "../../assets/images/logo.png";
import searchSVG from "../../assets/images/search.svg";

import './navbar.css';
import Explore from '../../pages/explore.jsx';
// import Chats from './chat.jsx';
// import Profile from './profile.jsx';
import Tag from "./tag.jsx";

const Navbar = (props) => {
  
  const [search, setSearch] = useState(false);
  
  return (
    <div id = "main">
        <nav>
          <img src= {logoImg} style={{ height: '35px' }} id="logo" alt=""/>
          
          <div id="search" onFocus={()=>setSearch(true)} onBlur={()=>setSearch(false)}>
            <input type="text" name="" id="" placeholder="Search" />
            <img src={searchSVG} alt=""/>
          </div>

            
          
          <div id="nav-part2">
            <NavLink to="/explore" className="nav-link">Explore</NavLink>
            <NavLink to="/chat" className="nav-link">Chats</NavLink>
            <NavLink to="/profile/username" className="nav-link">Profile</NavLink>
          </div>
        </nav >
        <div id="up">
            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="#000000"/>
            </svg>
        </div>
        <div id="layer0"></div>
        <div id="layer1"></div>
        <div id="layer2"></div>
        <div id="layer3"></div>
        {search? <Tag/> : null}
        <Outlet/>
    </div>
  );
};

export default Navbar;
