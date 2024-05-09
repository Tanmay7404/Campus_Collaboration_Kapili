import React,{ useEffect, useState,useContext} from "react";
import UserCard from "./carduser"; // Assuming carduser.js is in the same directory
import sampleUserCardContent from "./carduserdata"; // Import your user data array
import "./cardlist.css"
import logo from '../../assets/images/logo.svg';
import search from '../../assets/images/search.svg';
import UserdataContext from '../../userdataContext';

const CardListu = ({searchInput,selectedTags,searchTrigger }) => {
    const{userdata}=useContext(UserdataContext);
 
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


     
        <div className="card-list">
        {userData.map((userData, index) => (
            
            <UserCard key={index} user={userData} currentUserName={userdata.username}/>
        ))}
        </div>
    </>
  );
};

export default CardListu;
