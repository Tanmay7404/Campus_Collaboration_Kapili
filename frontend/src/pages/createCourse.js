import React from "react";
import './profilePage.css';
import  { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Starting from "../components/createPages/starting";
import ProfilePicAdd from "../components/createPages/ProfilePic";
import TextInputs from "../components/createPages/textInputs";
import SelectTags from "../components/createPages/selectTags";
import Links from "../components/createPages/links";
import AddUsers from "../components/createPages/addUsers";
import SubmitButton from "../components/createPages/submit";
import DemoUpload from "../components/createPages/demoUpload";
import profileImage from '../assets/images/profile_pic.jpg';
import Difficulty from "../components/createPages/difficulty";

export default function CreateCoursePage() {

    var [values, setValues] = useState([""]); // Initial state with one empty string for collaboratos
    var [values2, setValues2] = useState([{ name: '', link: '' }]);
    var [courseTitle,setCtitle] = useState("");
    var [courseDesc,setCdesc] = useState("");
    var [selectedTags, setSelectedTags] = useState([]);
    var [demolinks,setDemo] = useState([]);
    var [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    var [url,setURL] = useState(profileImage);
    var [imageName,setImgN] = useState('');
    const navigate=useNavigate()

   const formData = {
      title: courseTitle,
      description: courseDesc,
      tags: selectedTags,
      url:url,
      imageName:imageName,
      collaboratorName:values,
      links:values2,
      courseImages:demolinks,
      level: selectedDifficulty
    };   
    useEffect(()=>{console.log(formData)},[formData])

    
    const [currUser,setCurrUser] =useState(null);
    useEffect(()=>{
      const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            
        //   const foundUser = JSON.parse(loggedInUser);
          setCurrUser(loggedInUser);
          setValues([loggedInUser]);
        } else
        {
            navigate("/login")
        }
        
    },[])
    


   
    const [trigger,setTrigger]=useState(1)
    const handleSubmit = () => {
        if(formData.title===''){
          window.alert('Title is required');
          return ;
        }
      // Assuming you have an API endpoint to send the data
      setTrigger(prevTrigger => prevTrigger + 1); // Update trigger separately
    };

    useEffect(() => {
      
      if(trigger!==1){
      console.log(formData)
      fetch('http://localhost:8080/courses/addCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {response.json;console.log(1);})
      .then(data => {
        console.log(2);
        console.log('Success:', data);
        // Handle success response
      })
      .catch((error) => {
        console.log(3);
        console.error(error.message);
        if (error.message.includes('duplicate key error')) {
          window.alert('Duplicate error occurred. Please enter unique data.');
        } else {
          console.log(4);
          console.error(error);
          window.alert('er.');
        }
        // Handle error
      
      });}

    },[trigger])

  return (
<div className="createPage">
    
    <div className="contentPP">
    
    <Starting text="Create Course"/>
      
    <ProfilePicAdd profilepic={url} setpp={setURL} setImgN={setImgN} />

    <TextInputs name="Course Title" state={courseTitle} setState={setCtitle} fixed={false}/>

    <TextInputs name="About The Course" state={courseDesc} setState={setCdesc} fixed={false}/>
    
    <SelectTags text = "Course Tags" selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

    <DemoUpload text="Course Demo Images" demoImages = {demolinks} setDemo = {setDemo}/>

    <Difficulty selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}/>

    <AddUsers values2={values} setValues2={setValues}/>

    <Links values2={values2} setValues2={setValues2}/>

    <SubmitButton text="Create Course" onClick={handleSubmit} />
        
  </div>
  </div>
  );
}
//npm install @emotion/react @emotion/styled
//npm install @mui/material
