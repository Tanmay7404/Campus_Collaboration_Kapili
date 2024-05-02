import React,{ useEffect, useState} from "react";
import logo from '../../assets/images/logo.svg';
import search from '../../assets/images/search.svg';
import './coursecardlist.css'
import coursedata from "./coursedata";
import Coursecard from "./coursecard";

const CourseCardList = ({searchInput,selectedTags,searchTrigger }) => {
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
            type:"course",
            title:searchInput,
            tags:selectedTags

           })   //if data to be given to the backend, uncomment this and the header, with data input in function
       });
       
       const res = await response.json()
//setUserData(res)
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
    
      
        <div className="card-listc">
          {coursedata.map((coursedata, index) => (
              <Coursecard key={index} course={coursedata} />
          ))}
        </div>
    );
  };
  
  export default CourseCardList;