import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Header from '../Header/Header';
import MobileMenu from '../MobileMenu/MobileMenu';
import Promo from '../Promo/Promo';
import AbouteProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWindowDimension, setIsWindowDimension] = useState(0);
  const isMobile = isWindowDimension <= 768;

  React.useEffect(() => {
    return setIsWindowDimension(window.innerWidth);
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setIsWindowDimension(window.innerWidth);
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} isMobile={isMobile} isMenuToggle={handleMobileMenu} />
      <Promo />
      <AbouteProject />
      <Techs />
      <MobileMenu isLoggedIn={isLoggedIn} isOpen={isMobileMenuOpen} isMobile={isMobile} isMenuToggle={handleMobileMenu}/>
    </div>
  );
}

export default App;

