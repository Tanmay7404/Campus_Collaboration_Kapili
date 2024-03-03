import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter } from "react-router-dom"
import CreateProjectPage from './pages/createProject';
//import ChatPage from './pages/ChatPage';


// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //   <App/>
  //   </BrowserRouter>

  // </React.StrictMode>
  <CreateProjectPage/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 //reportWebVitals();
