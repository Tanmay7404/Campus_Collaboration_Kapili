import React from "react";
import Button from 'react-bootstrap/Button';
import './profilePage.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5'; 
import TextField from '@mui/material/TextField';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Box } from "@mui/material";
import  { useState, useEffect } from 'react';
import Project from "./project";

export default function CreateCoursePage({projects}) {
   const initialFormData = {
      title: '',
      description: ''
    
    };
    const initialImages = [];
    const [images, setImages] = useState(initialImages);

  const addImage = () => {
    // Placeholder for a new image URL, you may want to get this from user input or another source
    const newImageUrl = "path_to_new_image.jpg";
    setImages([...images, newImageUrl]);
  };

  const removeImage = (imageUrl) => {
    console.log("Removing image with URL:", imageUrl); // For debugging
    const filteredImages = images.filter(image => image !== imageUrl);
    console.log("Remaining images:", filteredImages); // For debugging
    setImages(filteredImages);
  };
  

    const [formData, setFormData] = useState(initialFormData);
    useEffect(() => {
      console.log(formData);
    }, [formData]);
    const handleSubmit = () => {
      // Assuming you have an API endpoint to send the data
  
      fetch('http://localhost:8080/courses/addCourse', {
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
  return (
<div class="containerPP">
  
  <div class="contentPP" style={{overflowY:"scroll"}}>
    <div className="fillWidthDiv">
    <Link 
      to='/Project' 
      style={{
        display: "flex",
        backgroundColor: "transparent",
        borderColor: "transparent",
        justifyContent: "center",
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none', // remove underline from link
        color: 'white', // set default color
      }} 
      className="close-icon"
    >
      <IoCloseOutline size={32} style={{ color: 'white' }}/> 
    </Link>
    <Routes>
              <Route exact path="/Project" element={<Project projects = {projects} />} />
    </Routes>
</div>

<div className="fillWidthDiv2">
    <h3 style={{color:"white",margin:'0'}} className="editProfile" ><b>Create Course</b></h3>
</div>
<div className="space"></div>
<div className="space"></div>


<div className="space"></div>
<div className="space"></div>
<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >Course Title</p>
</div>
<div className="textfield">

<TextField fullWidth variant="outlined"  id="fullWidth" size="small"  
sx={style}
value={formData.title}
onChange={(e)=> setFormData({...formData,title:e.target.value})}
 InputProps={{
    style: {
        
      color: 'white', // Text color
      backgroundColor:'#3B3B3B'
      // Background color
    },
    placeholder:"Type here"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } }} 
 // Change label color
/>
</div>
<div className="space"></div>
<div className="space"></div>
<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >About This Course</p>
</div>
<div className="textfield">
<TextField  fullWidth id="fullWidth" size="small"  sx={style}
value={formData.description}
onChange={(e)=> setFormData({...formData,description:e.target.value})}
 InputProps={{
    style: {
        
      color: 'white', // Text color
      backgroundColor: '#3B3B3B', 
  
      
        },
    placeholder:"Type here"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } 
}} // Change label color
/>
</div>
<div className="E-mail" >
<p style={{color:"white",margin:'0'}} className="editProfile">Skills</p>
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
<div className="space"></div>
<div className="space">

</div>
<div className="space">
</div>

<div style={{ paddingLeft: '64px', display: 'flex', alignItems: 'flex-start' }}>
    <button onClick={addImage} style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      marginRight: '10px', // adds space between button and images
    }}>
      <div style={{
        backgroundColor: "#3B3B3B",
        height: '100px',
        width: '180px',
        display: 'flex',
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Replace this with your plus icon component */}
        <AiOutlinePlusCircle color="white" size={36} />
      </div>
    </button>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {images.map((imageUrl, index) => (
        <div key={index} style={{
          position: 'relative',
          display: 'flex', // use flex for image alignment
          flexDirection: 'column', // stack image and button vertically
          margin: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <img src={imageUrl} alt={`Gallery item ${index}`} style={{
            width: '180px',
            height: '100px',
            objectFit: 'cover'
          }} />
          <button onClick={() => removeImage(imageUrl)} style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: '0',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}>
            {/* Replace this with your close icon component */}
            X
          </button>
        </div>
      ))}
    </div>
  </div>

<div className="space">

</div>
<div className="space">

</div>


<div className="space">
</div>
<div className="space">
</div>

<div className="space"></div>



<div className="name">
<div className="buttonContainer" >

<Button variant="dark" className="buttonHover" onClick={handleSubmit}>
  Create Course
</Button>
      </div>
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
