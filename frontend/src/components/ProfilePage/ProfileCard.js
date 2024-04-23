import React from 'react';
import { useNavigate } from "react-router-dom";
import '../Log-in/team.css';

function ProfileCard({ name, imageUrl,email,department }) {
  console.log('tama');
  console.log(name);
  const navigate=useNavigate()
  const cardStyle = {
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    width: "100%", // Adjust the width as needed
    backgroundColor: 'rgb(1,1,1)'
  };

  const imageStyle = {
    width: '70%', // Adjust the image size as needed
    height: '70%',
    // width: "100%",
    // height: "100%"
    objectFit: 'cover'
  };

  const nameStyle = {
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff'
  };
  return (
    // <div>
    //     <img src={imageUrl} alt="Profile" style={imageStyle} id="" onClick={()=>{navigate("/profile/" + name)}} />
    // </div>
    <div  className="team-member">
    <img src={imageUrl} alt={name} />
    <h3>{name}</h3>
    <p>{department}</p>
    <div className="description">{email}</div>
  </div>
  );
}
    
export default ProfileCard;
