import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWindowDimension, setIsWindowDimension] = useState(0);
  const isMobile = isWindowDimension <= 768;

  React.useEffect(() => {
    return setIsWindowDimension(window.innerWidth);
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setIsWindowDimension(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
              isMenuToggle={handleMobileMenu}
              isOpen={isMobileMenuOpen}
            />
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
