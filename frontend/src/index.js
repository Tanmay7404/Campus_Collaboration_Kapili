import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import EditProfilePage from './editProfilePage';
import CreateProfilePage from './createProfile';
import CreateProjectPage from './createProject';
import CreateCoursePage from './createCourse';
import EditCoursePage from './editCourse';
import App2 from './App2';
import Global  from './Global.js';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App2/>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 //reportWebVitals();
