import { React, useState, useCallback, useEffect } from 'react';
import Header from "../Header/Header";
import SearchInput from "../SearchInput/SearchInput";
import ContentContainer from '../ContentContainer/ContentContainer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";
// UTILS
import { filterByKeyword, filterMoviesDuration } from "../../utils/filterMovieHelpers";
import { parseData, setItemLocal, getItemLocal } from '../../utils/localStorageHelpers';

const SavedMovies = ({ moviesSavedUser, configDisplayMovies, isLoading, isLoggedIn, isMobile, isMenuToggle, onDeleteMovie }) => {
  
  const [valueButtonSwitch, setValueButtonSwitch] = useState(false)
  const [isRenderCount, setIsRenderCount] = useState(configDisplayMovies.count)
  const [isMovieFilterDuration, setisMovieFilterDuration] = useState([])
  const lastSearchLocalKeyword = parseData(getItemLocal('saved-film-search-result-keyword'))

  const setMoviesFilter = useCallback(
    () => {
      const lastSearchMovies = parseData(getItemLocal('saved-film-search-result'))
      if(valueButtonSwitch) {
        if (lastSearchMovies) {
          setisMovieFilterDuration(lastSearchMovies)
        } else {
          setisMovieFilterDuration(filterMoviesDuration(moviesSavedUser))
        }
      } else {
        if (lastSearchMovies) {
          setisMovieFilterDuration(lastSearchMovies)
        } else {
          setisMovieFilterDuration(moviesSavedUser)
        }
      }
    },
    [moviesSavedUser, valueButtonSwitch],
  )

  useEffect(() => {
    const switchButtonLocalStorage = parseData(getItemLocal('saved-movies-switch-button'))
    if(switchButtonLocalStorage) {
      setValueButtonSwitch(switchButtonLocalStorage)
    }
  }, [])

  useEffect(() => {
    setMoviesFilter()
    setIsRenderCount(configDisplayMovies.count)
  }, [configDisplayMovies.count, setMoviesFilter])

  //Поиск по ключевому слову
  const handleSeacrhMovieByKeyword = (keyword) => {
    const result = filterByKeyword(isMovieFilterDuration, keyword)
    setisMovieFilterDuration(result)
    setItemLocal('saved-film-search-result', result)
    setItemLocal('saved-film-search-result-keyword', keyword)
  }

  const handleSwitchButton = () => {
    setValueButtonSwitch(!valueButtonSwitch)
    setItemLocal('saved-movies-switch-button', !valueButtonSwitch)
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
        { isLoading ? 
           'Ничего не найденно'
          :
          <MoviesCardList movies={isMovieFilterDuration} count={isRenderCount} locationMovies={false} onDelete={onDeleteMovie} />
        }
        
      </ContentContainer>
      <Footer />
    </>
  );
}

export default SavedMovies;
