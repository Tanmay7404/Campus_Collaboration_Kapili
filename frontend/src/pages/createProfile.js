import React from "react";
import Button from 'react-bootstrap/Button';
import './profilePage.css';
import { IoCloseOutline } from 'react-icons/io5'; 
import profileImage from './profile_pic.jpg'; // Import your profile image
import TextField from '@mui/material/TextField';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Box } from "@mui/material";
import  { useState, useEffect } from 'react';
import Axios from 'axios';

export default function CreateProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
   // fullname: "",
    email: "",
    fullname:" ",
    department:" ",
    instagramLink:"",
    githubLink:"",
    linkedinLink:" "


    // bio: "",
    // profilePictureUrl: "",
    // profilePictureFilename: "",
    // skills: [],
    // projects: [],
    // coursesCompleted: []
  });
  

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file",files[0]);
    formData.append("upload_preset","xgz5toim");

    Axios.post("https://api.cloudinary.com/v1_1/dxkhzuvmr/image/upload", formData).then((res)=>{
      console.log(res.data.secure_url);
      setpp(res.data.secure_url);
    });
  };



  
  const handleSubmit = () => {
    // Assuming you have an API endpoint to send the data

    fetch('http://localhost:8080/addNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success response
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
  };

    const style = {
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "white"
          }
        }
      }

      var [profilepic,setpp] = useState(profileImage);

      // const handleAddSkill = (skill) => {
      //   const newSkills = [...formData.skills, formData.skill];
      //   setFormData({ ...formData, skills: newSkills, skill: "" });
      // };

  return (
<div class="containerPP">
  
  <div class="contentPP" style={{overflowY:'auto'}}>
    <div className="fillWidthDiv">
        <Button style={{display:"flex",backgroundColor:"transparent",borderColor:"transparent",justifyContent:"center",display: 'flex', alignItems: 'center'}} className="close-icon">
  <IoCloseOutline size={32} style={{ color: 'white' }}/> 
  </Button>
</div>

<div className="fillWidthDiv2">
    <h3 style={{color:"white"}} className="editProfile" ><b>Create Profile</b></h3>
</div>
<div className="fillWidthDiv3">
    <div className="imageContainer">

<img src={profilepic} alt="Profile" className="profile-image" />
</div>


<div className="buttonContainer" style={{paddingLeft:20}}>
<div>
      
   
        
        <input type="file" id="fileInput" name="fileInput" hidden onChange={(event)=>{
          uploadImage(event.target.files)
        }}/>
        <label for="fileInput" variant="outline-dark" className="buttonHover" style={{ width: 250, height: 50, backgroundColor: 'black',display:'flex',justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px',borderColor:'white' }}>
         <p > Upload new Picture </p></label>
               
    
      </div>
    </div>
      <div className="buttonContainer"style={{paddingLeft:10}} >

<Button variant="outline-light" style={{width:200}}  >
       Remove Picture
      </Button></div>
</div>
<div className="space"></div>
<div className="space"></div>

<div className="E-mail" >
    <p style={{color:"white"}} >Name</p>
</div>
<div className="textfield">
<TextField fullWidth  id="fullWidth" size="small" sx={style}
   value={formData.username}
   onChange={(event) => setFormData({ ...formData, username: event.target.value })}
 InputProps={{
    style: {
        
      color: 'white', // Text color
      borderColor: 'white', // Border color
      backgroundColor: '#3B3B3B', 
     
      // Background color
    },
    placeholder:"Type here"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } }} // Change label color
/>
</div>
<div className="space"></div>
<div className="space"></div>

<div className="E-mail">
    <div className="email1"><p style={{color:"white"}} className="editProfile">E-mail</p></div>
    <div className="email2"><p style={{color:"white"}} className="editProfile">Department</p></div>

</div>
<div className="name">
    <div className="email1"><TextField fullWidth  id="fullWidth" size="small"  sx={style}
    value={formData.email}
    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B'
        
          // Background color
        },
       
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }}/></div>
    <div className="email2"><TextField fullWidth  id="fullWidth" size="small"  sx={style}
value={formData.department}
onChange={(event) => setFormData({ ...formData, department: event.target.value })}

    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }}/></div>
</div>

<div className="space"></div>
<div className="space"></div>

<div className="E-mail" >
<p style={{color:"white"}} className="editProfile">Skills</p>
</div>

<div className="textfield" >

<div className="textfield" style={{padding:'20px',backgroundColor:"#131313",borderRadius: '10px 10px 0 0'}}  >
<TextField  fullWidth id="fullWidth" size="small"  sx={style}
 InputProps={{
    style: {
        
      color: 'white', // Text color
      backgroundColor: '#3B3B3B', 
  
      
        },
    placeholder:"Search Tags"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } 
}} // Change label color
/>
</div>
</div>
<div className="blackbg" style={{height:"150px"  }}>

    <div style={{ backgroundColor:"#131313",width:"100%",paddingLeft:20, overflowY: "auto",height: "150px",borderRadius: '0 0 10px 10px'}}>
<p style={{color:"white", backgroundColor:"#131313",width:"100%"}} className="editProfile">ab</p>
<div style={{width:"100%"}}>
<Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
      abc
         </Button>
         </div>
         <div style={{width:"100%"}}>
<Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
      abc
         </Button>
         </div>
         <div style={{width:"100%"}}>
<Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
      abc
         </Button>
         </div>
         <div style={{width:"100%"}}>
<Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
   abc
      </Button>
      <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
      abc
         </Button>
         </div>



         </div>
</div>


<div className="space"></div>

<div className="E-mail">
    <div className="email1"><p style={{color:"white"}} className="editProfile">Social Link Title</p></div>
    <div className="email2"><p style={{color:"white"}} className="editProfile">URL</p></div>

</div>
<div className="name">
    <div className="email1">
    <p style={{color:'white'}}>LinkedIn</p>


    </div>
    <div className="email2"><TextField fullWidth id="fullWidth" size="small"  sx={style}
      value={formData.linkedinLink}
      onChange={(event) => setFormData({ ...formData, linkedinLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }} /></div>
</div>
<div className="space"></div>
<div className="name">
    <div className="email1">
      <p style={{color:'white'}}>Instagram</p>

    </div>
    <div className="email2"><TextField fullWidth id="fullWidth" size="small"  sx={style}
      value={formData.instagramLink}
      onChange={(event) => setFormData({ ...formData, instagramLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }} /></div>
</div>
<div className="space">

</div>
<div className="name">
    <div className="email1">
      <p style={{color:'white'}}>Github</p>
    </div>
    <div className="email2"><TextField fullWidth id="fullWidth" size="small" 
     value={formData.githubLink}
     onChange={(event) => setFormData({ ...formData, githubLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }}/></div>
</div>
<div className="space">

</div>
<div className="space">

</div>


<div className="name">
<div className="buttonContainer" >
    

<Button variant="dark" className="buttonHover" style={{width:200, backgroundColor: 'black'}} onClick={handleSubmit} >
        Done
      </Button></div>
      </div>
      <div className="space">
</div>
<div className="space">
</div>
         </div>
         
</div>
  );
}