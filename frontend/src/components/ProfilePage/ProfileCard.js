// ProfileCard.js
import React from 'react';
import profilepic from "../../assets/images/profile.jpg"

function ProfileCard({ name, imageUrl }) {
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
    <div >
      <img src={profilepic} alt="Profile" style={imageStyle} />
      {/* <div style={nameStyle}>{name}</div> */}
    </div>
  );
}
    
export default ProfileCard;
