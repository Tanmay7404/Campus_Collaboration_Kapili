import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
//Import from Pages
import TestPage from "./pages/testPage.jsx";
import Chat from "./components/testSocket.js"

function App() {
  return (<Routes>
    <Route path="/" element = {    <Chat></Chat>
} ></Route>
  </Routes>

  );
}

export default App;
