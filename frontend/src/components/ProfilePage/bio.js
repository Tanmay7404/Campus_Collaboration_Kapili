import React from 'react';
import './profilePage.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import ProfileCard from './ProfileCard';
import Course from './course';

const Bio = () => {
  const bio = "Hi I am a passionate developer ready for collab in any ML related projects. dhewiuhfdwuihqdiohidjijedoqejodjoq2pjdopjqdop"
  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  }
  const userSkills = ['BlockChain', 'MySQL', 'iOS dev', 'TensorFlow',"Node JS"];
  const profiles = {
    1: { name: "Sushant", imageUrl: "https://via.placeholder.com/150" },
    2: { name: "Wahid", imageUrl: "https://via.placeholder.com/150" },
    3: { name: "Tanmay", imageUrl: "https://via.placeholder.com/150" },
    4: { name: "Simon", imageUrl: "https://via.placeholder.com/150" },

    // Add more profiles as needed
  };
  return (
    <>
     



<div class="containerPP">
  
  <div class="contentPP" style={{overflowY:'scroll'}}>
    <div className="fillWidthDiv">
      
</div>
<div className="space"></div>
<div className="space"></div>

<div className="E-mail"   >
    <p style={{color:"white",margin:0}} >Bio</p>
</div>
<div className="textfield">
  <TextField 
    fullWidth 
    multiline // Enable multiline input
    rows={4} // Minimum number of rows to display, adjust as needed
    id="fullWidth" 
    size="large" 
    sx={{
      ...style,
      // Additional styles here if necessary
    }}
    InputProps={{
      style: {
        color: 'white', // Text color
        borderColor: 'white', // Border color (Note: this might not apply directly here and could require custom theming or classes)
        backgroundColor: '#3B3B3B', // Background color
        // Removed fixed height to allow dynamic sizing
      },
      value: bio,
      readOnly: true, // Make input field read-only
    }}
    InputLabelProps={{ style: { color: 'gray' } }} // Change label color
  />
</div>
<div className="space"></div>
<div className="space"></div>



<div className="space"></div>
<div className="space"></div>

<div className="E-mail">
<p style={{color:"white",margin:0}} >Skills</p>
</div>
<div className="textfield" >

<div className="textfield" style={{padding:'20px',backgroundColor:"#131313",borderRadius: '10px 10px 0 0'}}  >

</div>
</div>
<div className="blackbg" style={{height:"150px"  }}>

<div style={{ backgroundColor:"#131313",width:"100%",paddingLeft:20, overflowY: "auto",height: "150px",borderRadius: '0 0 10px 10px'}}>
<p style={{color:"white", backgroundColor:"#131313",width:"100%"}} className="editProfile"></p>

<div id="self4">
                {userSkills.map((skill, index) => (
                  <div key={index} className="tags">
                    {skill}
                  </div>
                ))}
              </div>



</div>
</div>
<div className="space"></div>
<div className="space"></div>
<div className="space"></div>

<div className="E-mail">
    <div className="email1"><p style={{color:"white"}} className="editProfile">Friends</p></div>
</div>

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {Object.entries(profiles).map(([id, { name, imageUrl }]) => (
          <Link style={{textDecoration: 'none'}} to="/"><ProfileCard key={id} name={name} imageUrl={imageUrl} /></Link>
      ))}
    </div>
    {/* <Routes>
    <Route exact path="/" element={<Course />} /> 
    </Routes>  */}


<div className="space"></div>
<div className="space"></div>


</div>
         
</div>


    </>
  );
};

export default Bio;