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
import { filterMovieDelete, updatesArrayMovies } from '../../utils/filterMovieHelpers'
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
      setIsLoading(true)
      api
        .getUserMe(token)
        .then((data) => {
          setCurrentUser({
            name: data.name,
            email: data.email,
            id: data._id,
          });
          setIsLoggedIn(true);
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          handleOpenPopup(false, configMessages.LOGIN_ERROR)
          console.log(err);
        });
    }
  }, []);

  const getMovies = useCallback(
    () => {
      setIsLoading(true);
      const allMoviesLocal = getItemLocal("movies");
      if(!allMoviesLocal) {
        moviesApi
          .getMovies()
          .then((data) => {
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

  const getSavedMoviesUser = useCallback(
    (id) => {
      setIsLoading(true);
      const token = getItemLocal("jwt")
      const userMoviesLocal = getItemLocal("movies-saved");
      if(!userMoviesLocal) {
        api
        .getUserMovies(token)
        .then((data) => {
          // получения только тех фильмов который сохранил User
          const currentUserMovies = data.filter(item => item.owner === id)
          setIsMoviesSavedUser(currentUserMovies);
          setItemLocal('movies-saved', currentUserMovies);
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
    if(currentUser && isLoggedIn && (location.pathname === '/movies' || location.pathname === '/saved-movies')) {
      getMovies();
      getSavedMoviesUser(currentUser.id)
    }
    if(isLoggedIn && (location.pathname === '/sign-in' || location.pathname === '/sign-up')) {
      handleOpenPopup(true, configMessages.USER_IS_AUTH)
    }
  }, [currentUser, getMovies, getSavedMoviesUser, isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    if(!isLoggedIn) {
      checkAuth();
    }
  }, [checkAuth, isLoggedIn])

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
        api
          .getUserMe(res.token)
          .then((data) => {
            setCurrentUser({
              name: data.name,
              email: data.email,
              id: data._id
            });
            setIsLoggedIn(true);
            navigate('/movies')
            handleOpenPopup(true, configMessages.LOGIN_OK)
          })
          .catch((err) => {
            handleOpenPopup(false, configMessages.LOGIN_ERROR)
            console.log(err);
          });
      })
      .catch((err) => {
        if(err === 401) {
          handleOpenPopup(false, configMessages.LOGIN_UNAUTHORIZED)
        } else {
          handleOpenPopup(false, configMessages.LOGIN_ERROR)
        }
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
    clearItemsLocal();
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
    handleOpenPopup(true, configMessages.LOGOUT_OK)
  };

  const handleDeleteSavedMovie = (movie) => {
    const movieDelete = isMoviesSavedUser.find(item => item.movieId === movie.movieId)
    const beatFilmItem = movies.find(item => item.movieId === movie.movieId)
    if( movieDelete.movieId === beatFilmItem.movieId) {
      api
      .deleteMovie(movieDelete._id)
      .then(() => {
        removeItemLocal('movies-saved')
        const newArray = filterMovieDelete(isMoviesSavedUser, movie)
        setIsMoviesSavedUser(newArray)
        setItemLocal('movies-saved', newArray)
        handleOpenPopup(true, configMessages.DELETE_MOVIE_OK)
      })
      .catch((err) => {
        handleOpenPopup(false, configMessages.DELETE_MOVIE_ERROR)
        console.log(err);
      })
    }
  }
 
  const handleSavedMovie = (movie) => {
    api
      .savedMovieUser(movie)
      .then((data) => {
        const newArrayAllMovies = updatesArrayMovies(movies, data)

        setMovies(newArrayAllMovies)
        removeItemLocal('movies')
        setItemLocal('movies', newArrayAllMovies)

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

  const handleHistoryBack = () => {
    navigate(-1)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                isMobile={isMobile}
                isMenuToggle={handleMobileMenu}
              />
            }
          />
          <Route
            path="/movies"
            element={
             isLoggedIn && 
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
                    handleDeleteSavedMovie={handleDeleteSavedMovie}
                  />
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
             isLoggedIn && 
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
             isLoggedIn &&
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
          <Route path="/sign-in" element={!isLoggedIn ? <Login onLogin={handleLogin}/> : <NotFound onClick={handleHistoryBack}/>} />
          <Route path="/sign-up" element={!isLoggedIn ? <Register onRegistration={handleRegistration}/> : <NotFound onClick={handleHistoryBack}/> } />
          <Route path="*" element={<NotFound onClick={handleHistoryBack} />} />
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
