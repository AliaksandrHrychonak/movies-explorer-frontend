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

const Movies = ({ movies, moviesSavedUser, configDisplayMovies, isLoading, isLoggedIn, isMobile, isMenuToggle, handleSaveMovieUser }) => {
  const [valueButtonSwitch, setValueButtonSwitch] = useState(false)
  const [isRenderCount, setIsRenderCount] = useState(configDisplayMovies.count)
  const [isMovieFilterDuration, setisMovieFilterDuration] = useState([])

  const setMoviesFilter = useCallback(
    () => {
      if(valueButtonSwitch) {
        setisMovieFilterDuration(filterMoviesDuration(movies))
      } else {
        setisMovieFilterDuration(movies)
      }
    },
    [movies, valueButtonSwitch],
  )

  useEffect(() => {
    setMoviesFilter()
    setIsRenderCount(configDisplayMovies.count)
  }, [configDisplayMovies.count, setMoviesFilter])

  // Подгрузка новых карточек
  const handleRenderMore = () => {
    setIsRenderCount(isRenderCount + configDisplayMovies.increase)
  }
  
  const handleSeacrhMovieByKeyword = (keyword) => {
    setisMovieFilterDuration(filterByKeyword(isMovieFilterDuration, keyword))
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
            toogleCheckBox={() => setValueButtonSwitch(!valueButtonSwitch)}
            onSearch={handleSeacrhMovieByKeyword}
          />
        { isLoading
          ?
            <Preloader />
          :
          <>
            <MoviesCardList movies={isMovieFilterDuration} moviesSavedUser={moviesSavedUser} count={isRenderCount} locationMovies={true} onSave={handleSaveMovieUser} />
            { isRenderCount <= isMovieFilterDuration.length && <ButtonMoreMovies onClick={handleRenderMore} /> }
          </>
        }
      </ContentContainer>
      <Footer />
    </>
  );
};

export default Movies;
