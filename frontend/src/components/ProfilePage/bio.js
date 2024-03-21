import React from 'react';
import './bio.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import ProfileCard from './ProfileCard';
import Course from './course';
import { Button } from 'react-bootstrap';

const Bio = () => {
  const bio = "Hi I am a passionate developer ready for collab in any ML related projects. dhewiuhfdwuihqdiohidjijedoqejodjoq2pjdopjqdop"
  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "transparent"
      }
    }
  }
  const userSkills = [
    { skill: 'BlockChain', color: '#FF5733' },
    { skill: 'MySQL', color: '#33FF57' },
    { skill: 'iOS dev', color: '#5733FF' },
    { skill: 'TensorFlow', color: '#FF33D6' },
    { skill: 'Node JS', color: '#33D6FF' },
    { skill: 'BlockChain', color: '#FF5733' },
    { skill: 'MySQL', color: '#33FF57' },
    { skill: 'iOS dev', color: '#5733FF' },
    { skill: 'TensorFlow', color: '#FF33D6' },
    { skill: 'Node JS', color: '#33D6FF' },
    { skill: 'BlockChain', color: '#FF5733' },
    { skill: 'MySQL', color: '#33FF57' },
    { skill: 'iOS dev', color: '#5733FF' },
    { skill: 'TensorFlow', color: '#FF33D6' },
    { skill: 'Node JS', color: '#33D6FF' },
  ];  const profiles = {
    1: { name: "Sushant", imageUrl: "https://via.placeholder.com/150" },
    2: { name: "Wahid", imageUrl: "https://via.placeholder.com/150" },
    3: { name: "Tanmay", imageUrl: "https://via.placeholder.com/150" },
    4: { name: "Simon", imageUrl: "https://via.placeholder.com/150" },
    5: { name: "Simon", imageUrl: "https://via.placeholder.com/150" },
    6: { name: "Simon", imageUrl: "https://via.placeholder.com/150" },



    // Add more profiles as needed
  };
  return (
  <>
     




  
  <div className="rightcontentPP">
    <div className='rightcontent'>
      < div className="E-mail"   >
        <p style={{color:"white"}} >Bio</p>
      </div>
      <div className="textfield">
        <TextField 
          
          fullWidth 
          multiline // Enable multiline input
          rows={2} // Minimum number of rows to display, adjust as needed
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
    </div>


    <div className='rightcontent'>
      <div className="E-mail" >
        <p style={{color:"white"}} >Skills</p>
      </div>

      <div className="blackbg" style={{height:"fit-content"}}>

        <div style={{ backgroundColor:"#131313",width:"100%",paddingLeft:20,paddingTop:'20px',paddingBottom:'20px', overflowY: "auto",borderRadius: '0 0 10px 10px'}}>
          <div id="self4">
            {userSkills.map((skill, index) => (
              <div key={index} className="tags" style={{borderColor:skill.color}}>
                <p style={{color:skill.color}}> {skill.skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className='rightcontent'>
      <div className="E-mail">
          <p style={{color:"white"}} className="editProfile">Friends</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {Object.entries(profiles).map(([id, { name, imageUrl }]) => (
                <Button style={{textDecoration: 'none'}} ><ProfileCard key={id} name={name} imageUrl={imageUrl} /></Button>
            ))}
      </div>
    </div>
  </div>   
  </>
  );
};

export default Bio;