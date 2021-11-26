import { React, useState } from "react";
import Header from "../Header/Header";
import SearchInput from "../SearchInput/SearchInput";
import ContentContainer from '../ContentContainer/ContentContainer';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ButtonMoreMovies from "../Buttons/ButtonMoreMovies/ButtonMoreMovies";
import "./Movies.css";
import Footer from "../Footer/Footer";
const Movies = ({ movies, innerWidth, isLoggedIn, isMobile, isMenuToggle }) => {
  const [valueButtonSwitch, setValueButtonSwitch] = useState(true)
  const countMovies = () => {
    let count = 12;
    if(innerWidth <= 450){
      count = 4
    } else if (innerWidth <= 800) {
      count = 8
    }
    return count
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
            stateCheckBox={valueButtonSwitch}
            toogleCheckBox={() => setValueButtonSwitch(!valueButtonSwitch)}
          />
        <MoviesCardList movies={movies} count={countMovies()} locationMovies={true} />
        <ButtonMoreMovies />
      </ContentContainer>
      <Footer />
    </>
  );
};

export default Movies;
