import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import MobileMenu from "../MobileMenu/MobileMenu";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { api } from "../../utils/Api";
import { moviesApi } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { RequireAuth } from "../RequireAuth/RequireAuth";
const App = () => {
  let navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWindowDimension, setIsWindowDimension] = useState(window.innerWidth);
  const isMobile = isWindowDimension <= 768;

  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

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

  useEffect(() => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRegistration = (data) => {
    api
      .registration(data)
      .then((res) => {
        console.log(res);
        setCurrentUser({
          name: res.name,
          email: res.email,
          password: res.passsword,
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogin = (data) => {
    console.log(data);
    api
      .login(data)
      .then((res) => {
        console.log(res);
        setCurrentUser({
          name: res.name,
          email: data.email,
          password: data.passsword,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const user = {
    name: "Виталий",
    email: "pochta@yandex.ru",
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              <RequireAuth
                isLoggedIn={isLoggedIn}
                children={
                  <Movies
                    movies={movies}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                    isMenuToggle={handleMobileMenu}
                    innerWidth={isWindowDimension}
                  />
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <RequireAuth
                isLoggedIn={isLoggedIn}
                children={
                  <SavedMovies
                    movies={movies}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                    isMenuToggle={handleMobileMenu}
                    innerWidth={isWindowDimension}
                  />
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth
                isLoggedIn={isLoggedIn}
                children={
                  <Profile
                    user={user}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                    isMenuToggle={handleMobileMenu}
                  />
                }
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegistration={handleRegistration} />}
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
    </CurrentUserContext.Provider>
  );
};

export default App;
