import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
//Import from Pages
import TestPage from "./pages/testPage.jsx";

function App() {
  return (<Routes>
    <Route path="/" element = {<TestPage />} ></Route>
  </Routes>

  );
}

export default App;
