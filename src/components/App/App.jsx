import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import MobileMenu from "../MobileMenu/MobileMenu";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { api } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { RequireAuth } from "../RequireAuth/RequireAuth";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
const App = () => {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isErrorPopup, setIsErrorPopup] = useState({
    open: false,
    status: false,
    message: "",
  });
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
    checkAuth();
    if(isLoggedIn) {
      getMovies()
    }
    console.log('tyt');
  }, [isLoggedIn]);

  const checkAuth = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
        .getUserMe(token)
        .then((data) => {
          if (data) {
            setCurrentUser({
              name: data.name,
              email: data.email,
            });
            setIsLoggedIn(true);
            console.log('isAuthGood');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getMovies = () => {
    setIsLoading(true);
    moviesApi
    .getMovies()
    .then((data) => {
      setMovies(data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(setIsLoading(false))
  }

  const handleRegistration = (data) => {
    console.log(data);
    api
      .registration(data.name, data.email, data.password)
      .then((data) => {
        if (data) {
          setIsErrorPopup({
            open: true,
            status: true,
            message: "Регистрация прошла успешно!",
          });
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const handleLogin = (data) => {
    api
      .login(data.email, data.password)
      .then((res) => {
        console.log(res);
        api
          .getUserMe(res.token)
          .then((data) => {
            setCurrentUser({
              name: data.name,
              email: data.email,
            });
            setIsLoggedIn(true);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUserInfo = (data) => {
    setIsLoading(true)
    api.updateUserMe(data)
    .then((res) => {
      setCurrentUser({
        name: res.name,
        email: res.email,
      });
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(setIsLoading(false))
  }

  const handleLogOut = () => {
    console.log('logout');
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleClosePopup = () => {
    setIsErrorPopup({ open: false, status: false, message: "" });
  };

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
                    user={currentUser}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                    isMenuToggle={handleMobileMenu}
                    onLogOut={handleLogOut}
                    onEdit={handleUpdateUserInfo}
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
        <ErrorPopup config={isErrorPopup} onClose={handleClosePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
