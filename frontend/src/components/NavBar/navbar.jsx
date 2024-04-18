import React, { useState, useEffect, useRef,useContext } from 'react';
import { Link, NavLink, Outlet,useNavigate } from 'react-router-dom';
import logoImg from "../../assets/images/logo.png";
import searchSVG from "../../assets/images/search.svg";
import './navbar.css';
import Tag from "./tag.jsx";
// import UserContext from '../../userContext.jsx';

const Navbar = (props) => {
  const [currUser,setCurrUser] =useState(null);

  const navigate=useNavigate()
  useEffect(()=>{
      const loggedInUser = localStorage.getItem("user");
         if (loggedInUser) {
             
         //   const foundUser = JSON.parse(loggedInUser);
           setCurrUser(loggedInUser);
         } else
         {
navigate('/login')
         }
  },[])  
  const [showTag, setShowTag] = useState(false);
  const searchRef = useRef(null);
  const tagRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState({tagname: "Projects", color:"white"});
  
  const toggleTagSelection = (tag) => {
    setSelectedTags((prevTags) => {
      console.log(prevTags);
      // Check if any tag in prevTags has the same tagname as the current tag
      const tagIndex = prevTags.findIndex(t => t.tagname === tag.tagname);
      if (tagIndex !== -1) {
        // Tag already exists, remove it from the list
        return prevTags.filter((_, index) => index !== tagIndex);
      } else {
        // Tag doesn't exist, add it to the list
        return [...prevTags, tag];
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside of searchRef and tagRef
      if (searchRef.current && !searchRef.current.contains(event.target) && 
          tagRef.current && !tagRef.current.contains(event.target)) {
        setShowTag(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef, tagRef]);

  return (
    <div id="main">
      <nav>
        <img src={logoImg} style={{ height: '35px' }} id="logo" alt="" />
        <div id="search" ref={searchRef} onClick={() => setShowTag(true)}>
          <input type="text" placeholder="Search" />
          <img src={searchSVG} alt="" />
        </div>
        
        <div id="nav-part2">
          <NavLink to="/explore" className="nav-link">Explore</NavLink>
          {/* <NavLink to="/chat/" className="nav-link">Chats</NavLink> */}
          <NavLink to={`/chat/${currUser}`} className="nav-link">Chats</NavLink>
          <NavLink to={`/profile/${currUser}`} className="nav-link">Profile</NavLink>
        </div>
      </nav>
      <div id="up">
        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="#000000"/>
          </svg>
        </div>
      {showTag ? <div ref={tagRef} id = "filterTags"><Tag onTagClick = {toggleTagSelection} tagList={selectedTags} setSelectedSearch={setSelectedSearch} selectedSearch={selectedSearch}/></div> : null}
      <Outlet />
    </div>
  );
};

export default Navbar;
