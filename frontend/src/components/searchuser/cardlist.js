import React,{ useEffect, useState} from "react";
import UserCard from "./carduser"; // Assuming carduser.js is in the same directory
import sampleUserCardContent from "./carduserdata"; // Import your user data array
import "./cardlist.css"
import logo from '../../assets/images/logo.svg';
import search from '../../assets/images/search.svg';

const CardListu = ({searchInput,selectedTags,searchTrigger }) => {
  const [userData,setUserData]=useState([])
  useEffect(()=>{
    async function fetchData() {
   try {
    console.log("fetching")
       const response = await fetch("http://localhost:8080/courses/search", {
           method: "POST", // GET, POST, PUT, DELETE, PATCH, etc.
           headers: {
           "Content-Type": "application/json" 
          //  As sending JSON data to API
           },
           body: JSON.stringify({
            type:"user",
            title:searchInput,
            tags:selectedTags

           })   //if data to be given to the backend, uncomment this and the header, with data input in function
       });
       
       const res = await response.json()
setUserData(res)
       console.log(res)
      //  setongoingData(res);
       return;
   }
   catch(err){
      //  setongoingData([]);
       return;
   }
   
}
fetchData();
  },[searchTrigger])


  return (
    <>
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
        {userData.map((userData, index) => (
            <UserCard key={index} user={userData} />
        ))}
        </div>
    </>
  );
};

export default CardListu;
