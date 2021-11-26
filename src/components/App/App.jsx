import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import MobileMenu from "../MobileMenu/MobileMenu";
import Movies from "../Movies/Movies";
import { moviesApi } from "../../utils/MoviesApi";
import SavedMovies from "../SavedMovies/SavedMovies";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isWindowDimension, setIsWindowDimension] = useState(window.innerWidth);
  const isMobile = isWindowDimension <= 768;

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsWindowDimension(window.innerWidth);
      }, 180);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const user = {
    name: "Виталий",
    email: "pochta@yandex.ru",
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
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              movies={movies}
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
              isMenuToggle={handleMobileMenu}
              innerWidth={isWindowDimension}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              movies={movies}
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
              isMenuToggle={handleMobileMenu}
              innerWidth={isWindowDimension}
            />
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
              isMenuToggle={handleMobileMenu}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileMenu
        isLoggedIn={isLoggedIn}
        isOpen={isMobileMenuOpen}
        isMobile={isMobile}
        isMenuToggle={handleMobileMenu}
      />
    </div>
  );
};

export default App;
