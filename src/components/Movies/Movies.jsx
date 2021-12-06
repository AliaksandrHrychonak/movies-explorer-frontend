import { React, useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import SearchInput from "../SearchInput/SearchInput";
import ContentContainer from '../ContentContainer/ContentContainer';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ButtonMoreMovies from "../Buttons/ButtonMoreMovies/ButtonMoreMovies";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
// UTILS
import { filterByKeyword, filterMoviesDuration } from "../../utils/filterMovieHelpers";
import { parseData, setItemLocal, getItemLocal } from '../../utils/localStorageHelpers'

const Movies = ({ movies, moviesSavedUser, configDisplayMovies, isLoading, isLoggedIn, isMobile, isMenuToggle, handleSaveMovieUser, handleDeleteSavedMovie }) => {
  const [valueButtonSwitch, setValueButtonSwitch] = useState(false)
  const [isRenderCount, setIsRenderCount] = useState(configDisplayMovies.count)
  const [isMovieFilterDuration, setisMovieFilterDuration] = useState([])
  const lastSearchLocalKeyword = parseData(getItemLocal('beat-film-search-result-keyword'))

  const setMoviesFilter = useCallback(
    () => {
      const lastSearchMovies = parseData(getItemLocal('beat-film-search-result'))
      if(valueButtonSwitch) {
        if (lastSearchMovies) {
          setisMovieFilterDuration(lastSearchMovies)
        } else {
          setisMovieFilterDuration(filterMoviesDuration(movies))
        }
      } else {
        if (lastSearchMovies) {
          setisMovieFilterDuration(lastSearchMovies)
        } else {
          setisMovieFilterDuration(movies)
        }
      }
    },
    [movies, valueButtonSwitch],
  )

  useEffect(() => {
    const switchButtonLocalStorage = parseData(getItemLocal('movies-switch-button'))
    if(switchButtonLocalStorage) {
      setValueButtonSwitch(switchButtonLocalStorage)
    }
  }, [])

  useEffect(() => {
    setMoviesFilter()
    setIsRenderCount(configDisplayMovies.count)
  }, [configDisplayMovies.count, setMoviesFilter])

  // Подгрузка новых карточек
  const handleRenderMore = () => {
    setIsRenderCount(isRenderCount + configDisplayMovies.increase)
  }
  
  const handleSeacrhMovieByKeyword = (keyword) => {
    const result = filterByKeyword(isMovieFilterDuration, keyword)
    setisMovieFilterDuration(result)
    setItemLocal('beat-film-search-result', result)
    setItemLocal('beat-film-search-result-keyword', keyword)
  }

  const handleSwitchButton = () => {
    setValueButtonSwitch(!valueButtonSwitch)
    setItemLocal('movies-switch-button', !valueButtonSwitch)
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isMobile={isMobile}
        isMenuToggle={isMenuToggle}
      />
      <ContentContainer type="movies" >
          <SearchInput
            setMoviesFilter={setMoviesFilter}
            stateCheckBox={valueButtonSwitch}
            toogleCheckBox={handleSwitchButton}
            onSearch={handleSeacrhMovieByKeyword}
            lastSearchLocal={lastSearchLocalKeyword}
          />
        { isLoading
          ?
            <Preloader />
          : 
          <>
            <MoviesCardList movies={isMovieFilterDuration} moviesSavedUser={moviesSavedUser} count={isRenderCount} locationMovies={true} onSave={handleSaveMovieUser} onDelete={handleDeleteSavedMovie} />
            { isRenderCount <= isMovieFilterDuration.length && <ButtonMoreMovies onClick={handleRenderMore} /> }
          </> 
        }
      </ContentContainer>
      <Footer />
    </>
  );
};

export default Movies;
