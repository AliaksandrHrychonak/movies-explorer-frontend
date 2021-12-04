import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import MobileMenu from "../MobileMenu/MobileMenu";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
//UTILS
import { mapMovieApi } from '../../utils/moviesHelper';
import { getItemLocal, setItemLocal, parseData, removeItemLocal, clearItemsLocal } from '../../utils/localStorageHelpers';
import { config } from '../../utils/configDisplayContent';
import { configMessages } from '../../utils/configUserMessage';
import { api } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation()
  //USERS
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  //POPUP
  const [isErrorPopup, setIsErrorPopup] = useState({ open: false, status: null, message: "" });
  //LOADING
  const [isLoading, setIsLoading] = useState(false);
  //WINDOW SIZE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWindowDimension, setIsWindowDimension] = useState(window.innerWidth);
  //MOVIES
  const [movies, setMovies] = useState([]);
  const [isConfigMovies, setIsConfigMovies] = useState({ count: config.IS_COUNT_MAX_WIDTH, increase: config.IS_INCREASE_MAX_WIDTH})
  const [isMoviesSavedUser, setIsMoviesSavedUser] = useState([])
  
  const isMobile = isWindowDimension <= config.IS_MOBILE_MENU_SIZE;

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {

        setIsWindowDimension(window.innerWidth);

        if(window.innerWidth <= config.IS_MIN_DISPLAY){
          setIsConfigMovies({ count: config.IS_COUNT_MIN_WIDTH, increase: config.IS_INCREASE_MIN_WIDTH })
        } else if (window.innerWidth <= config.IS_MIDDLE_DISPLAY) {
          setIsConfigMovies({ count: config.IS_COUNT_MIDDLE_WIDTH, increase: config.IS_INCREASE_MIDDLE_WIDTH })
        } else {
          setIsConfigMovies({ count: config.IS_COUNT_MAX_WIDTH, increase: config.IS_INCREASE_MAX_WIDTH })
        }

        if (isMobile) {
          setIsMobileMenuOpen(false);
        }

      }, config.IS_TIMEOUT);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [isConfigMovies, isMobile]);

  useEffect(() => {
    if(isErrorPopup.open === true) {
      const timer = setTimeout(() => {
        handleClosePopup()
      }, configMessages.IS_TIMOUT_POPUP);
      return () => clearTimeout(timer);
    }
  }, [isErrorPopup.open])

  const checkAuth = useCallback(() => {
    const token = getItemLocal("jwt");
    if (token) {
      api
        .getUserMe(token)
        .then((data) => {
          setCurrentUser({
            name: data.name,
            email: data.email,
          });
          setIsLoggedIn(true);
        })
        .catch((err) => {
          handleOpenPopup(false, configMessages.LOGIN_ERROR)
          console.log(err);
        });
    }
  }, []);

// Дописать сверку массива из апи и локального хранилища
  const getMovies = useCallback(
    () => {
      setIsLoading(true);
      const allMoviesLocal = getItemLocal("movies");
      if(!allMoviesLocal) {
        moviesApi
          .getMovies()
          .then((data) => {
            console.log(data);
            const movies = mapMovieApi(data)
            setMovies(movies);
            setItemLocal('movies', movies);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            handleOpenPopup(false, configMessages.GET_BEATFILM_ERROR)
            console.log(err);
          })
        } else {
          const movies = parseData(allMoviesLocal)
          setMovies(movies);
          setIsLoading(false);
        }
    },
    [],
  )

// Дописать сверку массива из апи и локального хранилища
const getSavedMoviesUser = useCallback(
  () => {
    setIsLoading(true);
    const userMoviesLocal = getItemLocal("movies-saved");
    if(!userMoviesLocal) {
      api
      .getUserMovies()
      .then((data) => {
        setIsMoviesSavedUser(data);
        setItemLocal('movies-saved', data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        handleOpenPopup(false, configMessages.GET_USERFILM_ERROR)
        console.log(err);
      })
    } else {
      const moviesUser = parseData(userMoviesLocal)
      setIsMoviesSavedUser(moviesUser);
      setIsLoading(false);
    }
  },
  [],
)

  useEffect(() => {
    checkAuth();
    if (isLoggedIn && (location.pathname === '/movies' || location.pathname === '/saved-movies')) {
      getMovies();
      getSavedMoviesUser()
    }
  }, [checkAuth, getMovies, getSavedMoviesUser, isLoggedIn, location.pathname]);

  const handleRegistration = (data) => {
    api
      .registration(data.name, data.email, data.password)
      .then((data) => {
        if (data) {
          navigate("/sign-in", { replace: true });
          handleOpenPopup(true, configMessages.REGISTRATION_OK)
        }
      })
      .catch((err) => {
        handleOpenPopup(false, configMessages.REGISTRATION_ERROR)
        console.log(err);
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
            navigate("/movies");
            handleOpenPopup(true, configMessages.LOGIN_OK)
          })
          .catch((err) => {
            handleOpenPopup(true, configMessages.LOGIN_ERROR)
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUserInfo = (data) => {
    setIsLoading(true);
    api
      .updateUserMe(data)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
        setIsLoading(false);
        handleOpenPopup(true, configMessages.UPDATE_USER_OK)
      })
      .catch((err) => {
        handleOpenPopup(false, configMessages.UPDATE_USER_ERROR)
        console.log(err);
      })
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    clearItemsLocal();
    navigate("/");
    handleOpenPopup(true, configMessages.LOGOUT_OK)
  };

  const handleDeleteSavedMovie = (movie) => {
    api
      .deleteMovie(movie._id)
      .then(() => {
        removeItemLocal('movies-saved')
        const newArray = isMoviesSavedUser.filter(item => item !== movie)
        setIsMoviesSavedUser(newArray)
        setItemLocal('movies-saved', newArray)
        handleOpenPopup(true, configMessages.DELETE_MOVIE_OK)
      })
      .catch((err) => {
        handleOpenPopup(false, configMessages.DELETE_MOVIE_ERROR)
        console.log(err);
      })
  }
 
  const handleSavedMovie = (movie) => {
    api
      .savedMovieUser(movie)
      .then((data) => {
        setIsMoviesSavedUser([...isMoviesSavedUser, data])
        removeItemLocal('movies-saved')
        setItemLocal('movies-saved', [...isMoviesSavedUser, data]);
        handleOpenPopup(true, configMessages.SAVE_MOVIE_OK)
      })
      .catch((err) => {
        handleOpenPopup(false, configMessages.SAVE_MOVIE_ERROR)
        console.log(err);
      })
  }

  const handleClosePopup = () => {
    setIsErrorPopup({ open: false, status: null, message: "" });
  };

  const handleOpenPopup = (status, message) => {
    setIsErrorPopup({ open: true, status: status, message: message });
  }

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
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                children={
                  <Movies
                    isLoggedIn={isLoggedIn}
                    movies={movies}
                    moviesSavedUser={isMoviesSavedUser}
                    configDisplayMovies={isConfigMovies}
                    isLoading={isLoading}
                    isMobile={isMobile}
                    isMenuToggle={handleMobileMenu}
                    handleSaveMovieUser={handleSavedMovie}
                  />
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                children={
                  <SavedMovies
                    moviesSavedUser={isMoviesSavedUser}
                    configDisplayMovies={isConfigMovies}
                    onDeleteMovie={handleDeleteSavedMovie}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                    isMenuToggle={handleMobileMenu}
                  />
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
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
          <Route path="/sign-up" element={<Register onRegistration={handleRegistration} />} />
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
