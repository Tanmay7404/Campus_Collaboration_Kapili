import React from "react";
import './profilePage.css';
import  { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Starting from "../components/createPages/starting";
import ProfilePicAdd from "../components/createPages/ProfilePic";
import TextInputs from "../components/createPages/textInputs";
import SelectTags from "../components/createPages/selectTags";
import ToggleButton from "../components/createPages/toggleButton";
import Links from "../components/createPages/links";
import AddUsers from "../components/createPages/addUsers";
import SubmitButton from "../components/createPages/submit";
import DemoUpload from "../components/createPages/demoUpload";
import Difficulty from "../components/createPages/difficulty";
import profileImage from '../assets/images/profile_pic.jpg';


export default function CreateProjectPage() {

  var [values, setValues] = useState([""]); // Initial state with one empty string for collaboratos
  var [values2, setValues2] = useState([{ name: '', link: '' }]);
  var [projectName,setPname] = useState("");
  var [projectTitle,setPtitle] = useState("");
  var [projectDesc,setPdesc] = useState("");
  var [selectedTags, setSelectedTags] = useState([]);
  var [ongoing,setOngoing] = useState(false);
  var [openForCollaboration,setOpenForCollab] = useState(false);
  var [demolinks,setDemo] = useState([]);
  var [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  var [url,setURL] = useState(profileImage);
  var [imageName,setImgN] = useState('');

  const navigate=useNavigate()

   const formData = {
      title: projectTitle,
      name:projectName,
      description: projectDesc,
      tags: selectedTags,
      url:url,
      imageName:imageName,
      collaboratorName:values,
      ongoing:ongoing,
      openForCollaboration:openForCollaboration,
      links:values2,
      projectImages:demolinks,
      level: selectedDifficulty
    };
    
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
   
    useEffect(()=>{console.log(formData)},[formData]) 
    const [trigger,setTrigger]=useState(1)
    const handleSubmit = () => {
      if(formData.name===''){
        window.alert('Name is required');
        return;
      }
      else if(formData.title===''){
        window.alert('Title is required');
        return ;
      }
      // Assuming you have an API endpoint to send the data
      setTrigger(prevTrigger => prevTrigger + 1); // Update trigger separately
    };

    useEffect(() => {
      
      if(trigger!==1){
      console.log(formData)
      fetch('http://localhost:8080/projects/addNewProject', {
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
      
      <Starting text="Create Project"/>
        
      <ProfilePicAdd profilepic={url} setpp={setURL} setImgN={setImgN} />
    
      <TextInputs name="Project Name" state={projectName} setState={setPname} fixed={false}/>

      <TextInputs name="Project Title" state={projectTitle} setState={setPtitle} fixed={false}/>

      <TextInputs name="About The Project" state={projectDesc} setState={setPdesc} fixed={false}/>
      
      <SelectTags text = "Project Tags" selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      <DemoUpload text="Project Demo Images" demoImages = {demolinks} setDemo = {setDemo}/>

      <Difficulty selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}/>
    
      <div className="fillWidthDiv5" >
        <ToggleButton text="Open For Collaboration : " val = {openForCollaboration} changeVal={setOpenForCollab} />
        <ToggleButton text="Ongoing : " val={ongoing} changeVal={setOngoing} />
      </div>

      <AddUsers values2={values} setValues2={setValues}/>

      <Links values2={values2} setValues2={setValues2}/>

      <SubmitButton text="Create Project" onClick={handleSubmit} />
          
    </div>
    </div>
  );
}
//npm install @emotion/react @emotion/styled
//npm install @mui/material
