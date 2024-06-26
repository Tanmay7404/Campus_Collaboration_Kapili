import React from "react";
import "./login.css";
import bg2 from "../assets/images/bg2.png";
import logo from "../assets/images/logo.png";
import Team from "../components/Log-in/team.js";

const Login = () => {


  
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/auth_outlook";
  };
  // const handleLogin2 = () => {
  //   window.location.href = "http://localhost:3000/auth_google";
  // };

  return (
    <>
      <div id="login">
        <nav>
          <img src={logo} id="logo" alt="" />
        </nav>
        <div id="loginpg1">
          <div id="left">
            <h1>
              Start working in projects <br />
              <span>you’re needed.</span>
            </h1>

            <div id="para">
              <div id="para1">
              <h3>Join Forces, Create Impact</h3>
              </div>
              <div id="para2">
              Welcome to our collaborative platform where innovation meets opportunity. Here, you can work with like-minded individuals, share ideas, and work on exciting projects and courses. Engage in real-time chats, collaborate seamlessly, and transform your ideas into reality.!
              </div>
            </div>
          </div>
          <div id="right">
            <img src={bg2} id="bg-img2" alt="" />
            <div id="lay"></div>
            <div id="box">
            <h5>Sign in </h5>
              <h3 id="outlook" onClick={handleLogin}>
                <svg
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.97802 5.66667C5.38685 5.66667 4.80896 5.83284 4.31742 6.14417C3.82588 6.4555 3.44277 6.89801 3.21654 7.41573C2.9903 7.93345 2.93111 8.50314 3.04644 9.05276C3.16178 9.60237 3.44645 10.1072 3.86447 10.5035C4.28249 10.8997 4.81508 11.1696 5.3949 11.2789C5.97471 11.3882 6.5757 11.3321 7.12187 11.1177C7.66804 10.9032 8.13486 10.5401 8.46329 10.0741C8.79173 9.60818 8.96703 9.06038 8.96703 8.5C8.96703 7.74855 8.65212 7.02788 8.09157 6.49653C7.53102 5.96518 6.77076 5.66667 5.97802 5.66667ZM5.97802 9.91667C5.68244 9.91667 5.39349 9.83358 5.14772 9.67791C4.90195 9.52225 4.71039 9.301 4.59728 9.04214C4.48416 8.78327 4.45457 8.49843 4.51223 8.22362C4.5699 7.94882 4.71224 7.69639 4.92125 7.49827C5.13026 7.30014 5.39655 7.16522 5.68646 7.11055C5.97636 7.05589 6.27686 7.08395 6.54994 7.19117C6.82303 7.29839 7.05644 7.47997 7.22066 7.71294C7.38488 7.94591 7.47253 8.21981 7.47253 8.5C7.47253 8.87572 7.31507 9.23606 7.0348 9.50173C6.75452 9.76741 6.37439 9.91667 5.97802 9.91667ZM17.9341 6.375H17.1868V1.41667C17.1868 1.04094 17.0294 0.680609 16.7491 0.414932C16.4688 0.149255 16.0887 0 15.6923 0H8.21978C7.82341 0 7.44328 0.149255 7.16301 0.414932C6.88273 0.680609 6.72528 1.04094 6.72528 1.41667V2.83333H1.49451C1.09814 2.83333 0.718005 2.98259 0.43773 3.24827C0.157456 3.51394 0 3.87428 0 4.25V12.75C0 13.1257 0.157456 13.4861 0.43773 13.7517C0.718005 14.0174 1.09814 14.1667 1.49451 14.1667H4.48352V15.5833C4.48352 15.9591 4.64097 16.3194 4.92125 16.5851C5.20152 16.8507 5.58165 17 5.97802 17H17.9341C18.3304 17 18.7106 16.8507 18.9908 16.5851C19.2711 16.3194 19.4286 15.9591 19.4286 15.5833V7.79167C19.4286 7.41594 19.2711 7.05561 18.9908 6.78993C18.7106 6.52426 18.3304 6.375 17.9341 6.375ZM8.21978 1.41667H15.6923V8.25562L11.956 10.8136V4.25C11.956 3.87428 11.7986 3.51394 11.5183 3.24827C11.238 2.98259 10.8579 2.83333 10.4615 2.83333H8.21978V1.41667ZM1.49451 12.75V4.25H10.4615V12.75H1.49451ZM5.97802 15.5833V14.1667H10.4615C10.8579 14.1667 11.238 14.0174 11.5183 13.7517C11.7986 13.4861 11.956 13.1257 11.956 12.75V12.5614L16.3704 15.5833H5.97802ZM17.9341 14.906L13.232 11.6875L17.9341 8.46901V14.906Z"
                    fill="#BCBCBC"
                  />
                </svg>
                <a >Continue with Outlook</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Team/>
    </>
  );
};

export default Login;
