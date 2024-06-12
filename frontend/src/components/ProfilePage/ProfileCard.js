import React from 'react';
import { useNavigate } from "react-router-dom";
import '../Log-in/team.css';

function ProfileCard({ name, imageUrl,email,department }) {
  console.log('tama');
  console.log(name);
  const navigate=useNavigate()
  const imageStyle = {
    width: '100%', // Adjust the image size as needed
    height: '100%',
    // width: "100%",
    // height: "100%"
    objectFit: 'cover'
  };
  return (
    // <div>
    //     <img src={imageUrl} alt="Profile" style={imageStyle} id="" onClick={()=>{navigate("/profile/" + name)}} />
    // </div>
    <div  className="team-member" onClick={()=>{navigate('/profile/'+name)}}>
    <img src={imageUrl} alt={name}/>
    <h3>{name}</h3>
    <p>{department}</p>
    <div className="description">{email}</div>
  </div>
  );
}
    
export default ProfileCard;
