import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Header from '../Header/Header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;

