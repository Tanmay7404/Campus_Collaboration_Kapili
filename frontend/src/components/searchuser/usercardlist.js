import React from "react";
import UserCard from "./usercard"; // Assuming carduser.js is in the same directory
import sampleUserCardContent from "./carduserdata"; // Import your user data array
import "./usercardlist.css"

const UserCardList = () => {
  return (
    <>
    <div id="layer0"></div>
    <div id="layer1"></div>
    <div id="layer2"></div>
    <div id="layer3"></div>
    <div id = "searchPage">
      <div className="card-list">
        {sampleUserCardContent.map((userData, index) => (
            <UserCard key={index} user={userData} />
        ))}
      </div>
    </div>
    </>
  );
};

export default UserCardList;
