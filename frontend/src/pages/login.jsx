import React from 'react';
import './login.css';
const Login = () => {

  return (
    <>
    <div id="main">
      
      <nav>
          <img src="./Images/logo.png" id="logo" alt=""/>
      </nav>
      <div id="page1">
          <div id="left">
              <h1>Start working in projects <br/><span>you’re needed.</span></h1>
              
              <div id="para">

                
                  <div id="para1">
                  </div>
                  <div id="para2">
                  </div>
              </div>
          </div>
          <div id="right">
              <img src="./Images/bg2.png" id="bg-img2" alt=""/>
              <div id="lay"></div>
              <div id="box">
                  <h3 id="guest"><img src="./Images/guest.svg" alt=""/><a href="#">Guest Login</a></h3>
                  <h3 id="outlook"><img src="./Images/outlook.svg" alt=""/><a href="#">Continue with Outlook</a></h3>
              </div>
          </div>
      </div>
    </div>
    </>
  );
};

export default Login;
