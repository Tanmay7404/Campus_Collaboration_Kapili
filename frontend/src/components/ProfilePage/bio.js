import React,{useContext} from 'react';
import './bio.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import ProfileCard from './ProfileCard';
import Course from './course';
import { Button } from 'react-bootstrap';

const Bio = (data) => {
  console.log('pama');
  console.log(data.dataprofile.friends)
  const bio = data.dataprofile.profileInfo.bio;
  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "transparent"
      }
    }
  }

  return (
  <>
     




  
  <div className="rightcontentPP">
    <div className='rightcontent'>
      < div className="E-mail"   >
      <i class="bi bi-person-vcard-fill"  style={{fontSize:'1.5rem'}}></i>
        <p style={{fontSize:'1.5rem'}} >Bio</p>
      </div>
<div>{bio}</div>
    </div>


    <div className='rightcontent'>
      <div className="E-mail" >
      <i class="bi bi-laptop" style={{fontSize:'1.5rem'}}></i>
        <div style={{fontSize:'1.5rem'}} >Skills</div>
      </div>

      <div className="blackbg" style={{height:"fit-content"}}>

        <div style={{width:"100%",paddingTop:'20px',paddingBottom:'20px', overflowY: "auto"}}>
          <div id="self4">
            {data.dataprofile.skills.map((skill, index) => (
              <div key={index} className="tags" style={{borderColor:skill.color}}>
                <p style={{color:skill.color}}> {skill.tagname}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className='rightcontent'>
      <div className="E-mail">
      <i class="bi bi-person-lines-fill" style={{fontSize:'1.5rem'}}></i>
          <p style={{fontSize:'1.5rem'}} className="editProfile">Friends</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {data.dataprofile.friends.map(( friend,index ) => (
                <div className="profileCard">
                  <ProfileCard key={index} name={friend.name} imageUrl={friend.imageUrl}  email={friend.email} department={friend.department}/>
                </div>
            ))}
      </div>
    </div>
  </div>   
  </>
  );
};

export default Bio;