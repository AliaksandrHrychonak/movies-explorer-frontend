import { React, useState, useCallback, useEffect } from 'react';
import Header from "../Header/Header";
import SearchInput from "../SearchInput/SearchInput";
import ContentContainer from '../ContentContainer/ContentContainer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

const SavedMovies = ({ moviesSavedUser, configDisplayMovies, isLoading, isLoggedIn, isMobile, isMenuToggle, onDeleteMovie }) => {
  const [valueButtonSwitch, setValueButtonSwitch] = useState(false)
  const [isRenderCount, setIsRenderCount] = useState(configDisplayMovies.count)
  const [isMovieFilterDuration, setisMovieFilterDuration] = useState([])

  const setMoviesFilter = useCallback(
    () => {
      if(valueButtonSwitch) {
        setisMovieFilterDuration(filterMoviesDuration(moviesSavedUser))
      } else {
        setisMovieFilterDuration(moviesSavedUser)
      }
    },
    [moviesSavedUser, valueButtonSwitch],
  )

  useEffect(() => {
    setMoviesFilter()
    setIsRenderCount(configDisplayMovies.count)
  }, [configDisplayMovies.count, setMoviesFilter])

  //Поиск по ключевому слову
  const handleSeacrhMovieByKeyword = (keyword) => {
    setisMovieFilterDuration(filterByKeyword(isMovieFilterDuration, keyword))
  }

  const filterByKeyword = (collection, keyword) => collection.filter(({ nameRU }) => nameRU.toLowerCase().includes(keyword.toLowerCase()));

  const filterMoviesDuration = (collection) => collection.filter(({ duration }) => duration <= 40);

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
            toogleCheckBox={() => setValueButtonSwitch(!valueButtonSwitch)}
            onSearch={handleSeacrhMovieByKeyword}
          />
        <MoviesCardList movies={isMovieFilterDuration} count={isRenderCount} locationMovies={false} onDelete={onDeleteMovie} />
      </ContentContainer>
      <Footer />
    </>
  );
}

export default SavedMovies;
