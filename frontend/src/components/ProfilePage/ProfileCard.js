// ProfileCard.js
import React from 'react';

function ProfileCard({ name, imageUrl }) {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    width: '200px', // Adjust the width as needed
    backgroundColor: 'rgb(19, 19, 19)'
  };

  const imageStyle = {
    width: '100px', // Adjust the image size as needed
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover'
  };

  const nameStyle = {
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff'
  };

  return (
    <div style={cardStyle}>
      <img src={imageUrl} alt="Profile" style={imageStyle} />
      <div style={nameStyle}>{name}</div>
    </div>
  );
}

export default ProfileCard;
