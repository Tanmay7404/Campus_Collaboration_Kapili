import React from "react";
import "./login.css";
import bg2 from "../assets/images/bg2.png";
import logo from "../assets/images/logo.png";
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
                hi friends 
              </div>
              <div id="para2">
                this is me 
              </div>
            </div>
          </div>
          <div id="right">
            <img src={bg2} id="bg-img2" alt="" />
            <div id="lay"></div>
            <div id="box">
              {/* <h3 id="guest" onClick={handleLogin2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="22px"
                  height="22px"
                >
                  <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z" />
                </svg>
                <a href="#">Continue with Google</a>
              </h3> */}
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

              {/* <button onClick={handleLogin} className="outlookButton">
                <img src="./Images/outlook.svg" alt="" /> Outlook
              </button>
              <button onClick={handleLogin2} className="googleButton">
                <img src="./Images/outlook.svg" alt="" /> Google */}
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
