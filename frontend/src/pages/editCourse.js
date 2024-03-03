import React from "react";
import Button from 'react-bootstrap/Button';
import './profilePage.css';
import { IoCloseOutline } from 'react-icons/io5'; 
import profileImage from '../assets/images/profile_pic.jpg'; // Import your profile image
import TextField from '@mui/material/TextField';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Box } from "@mui/material";


export default function EditCoursePage() {
  
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

<div className="fillWidthDiv2">
    <h3 style={{color:"white"}} className="editProfile" ><b>Edit Course</b></h3>
</div>
<div className="space"></div>
<div className="space"></div>

<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >Course Name</p>
</div>
<div className="textfield">
<TextField fullWidth  id="fullWidth" size="small"  sx={style}
 InputProps={{
    style: {
      color: 'white', // Text color
      borderColor: 'white', // Border color
      backgroundColor: '#3B3B3B'
     
      // Background color
    },
    placeholder:"Type here"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } }} // Change label color
/>
</div>
<div className="space"></div>
<div className="space"></div>
<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >Course Title</p>
</div>
<div className="textfield">

<TextField fullWidth variant="outlined"  id="fullWidth" size="small"  
sx={style}

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
<div style={{paddingLeft:64}}>
    <Box style={{backgroundColor:"#3B3B3B",height:100,width:180,display: 'flex',borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',margin:'0'}}>
<AiOutlinePlusCircle color="white" size={36}></AiOutlinePlusCircle>

    </Box>
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

<Button variant="dark" className="buttonHover" style={{width:200, backgroundColor: 'black'}} >
       Save Changes
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
