import React from "react";
import Button from 'react-bootstrap/Button';
import './profilePage.css';
import { IoCloseOutline } from 'react-icons/io5'; 
import profileImage from '../assets/images/profile_pic.jpg'; // Import your profile image
import TextField from '@mui/material/TextField';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Box } from "@mui/material";
import  { useState, useEffect } from 'react';


export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    department: "",
    instagramLink: "",
    githubLink: "",
    linkedinLink: ""
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        console.log('fetching')
        const response = await fetch('http://localhost:8080/getUser/ssadsadsadasada'); // Adjust the endpoint to fetch user data
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setFormData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    //   fetch('http://localhost:8080/getUser/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   // Handle success response
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   // Handle error
    // });
    }

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


    const style = {
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "white"
          }
        }
      }


  return (
<div class="containerPP">
  
  <div class="contentPP" style={{overflowY:'auto'}}>
    <div className="fillWidthDiv">
        <Button style={{display:"flex",backgroundColor:"transparent",borderColor:"transparent",justifyContent:"center",display: 'flex', alignItems: 'center'}} className="close-icon">
  <IoCloseOutline size={32} style={{ color: 'white' }}/> 
  </Button>
</div>

<div className="fillWidthDiv2" style={{}}>
    <h3 style={{color:"white"}}  ><b>Edit Profile</b></h3>
</div>
<div  >
<div className="fillWidthDiv3" >

    <div className="imageContainer"  >
<img src={profileImage} alt="Profile" className="profile-image" />
</div>
<div className="buttonContainer" style={{paddingLeft:'20px'}}>

<Button variant="dark" className="buttonHover" style={{width:250,height:50, backgroundColor: 'black',margin:'0'}}  >
       Upload new Picture
      </Button></div>

      <div className="buttonContainer"style={{paddingLeft:'10px'}}  >

<Button variant="outline-light" style={{width:200}}  >
       Remove Picture
      </Button></div>
</div>
</div>
<div className="space"></div>
<div className="space"></div>

<div className="E-mail"   >
    <p style={{color:"white",margin:0}} >Name</p>
</div>
<div className="textfield">
<TextField fullWidth  id="fullWidth" size="small" sx={style}
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
    <div className="email2"><TextField fullWidth  id="fullWidth" size="small"  sx={style}
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

<div className="E-mail">
<p style={{color:"white",margin:0}} >Skills</p>
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
    <div className="email1"><TextField fullWidth  id="fullWidth" size="small"  sx={style}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }}
    /></div>
    <div className="email2"><TextField fullWidth id="fullWidth" size="small"  sx={style}
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
    <div className="email1"><TextField fullWidth  id="fullWidth" size="small"  sx={style}
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
    <div className="email2"><TextField fullWidth id="fullWidth" size="small"  sx={style}
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
    <div className="email1"><TextField fullWidth  id="fullWidth" size="small"  sx={style}
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
    <div className="email2"><TextField fullWidth id="fullWidth" size="small" 
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
<div className="E-mail" >

<Button className="box" variant="dark" style={{  height: 25, width: 25, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h2 >+</h2>
    </Button>
<p style={{color:"white",marginLeft:10}} className="editProfile">Add Social Link</p>
</div>
<div className="space">
</div>
<div className="space">
</div>
<div className="name">
<div className="buttonContainer" >
    

<Button variant="dark" className="buttonHover" style={{width:200, backgroundColor: 'black'}} >
       Save changes
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
//npm install @emotion/react @emotion/styled
//npm install @mui/material
//npm install react-icons
//npm install react-bootstrap bootstrap

