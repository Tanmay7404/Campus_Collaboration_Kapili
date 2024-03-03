import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter } from "react-router-dom"
import CreateProjectPage from './pages/createProject';
import ChatPage from './pages/ChatPage';
import EditCoursePage from './pages/editCourse';
import CreateCoursePage from './pages/createCourse';
import CreateProfilePage from './pages/createProfile';
import EditProfilePage from './pages/editProfilePage';
import EditProjectPage from './pages/editProject';
import Global from './pages/Global';


// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //   <App/>
  //   </BrowserRouter>

  // </React.StrictMode>
  <Global/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 //reportWebVitals();
