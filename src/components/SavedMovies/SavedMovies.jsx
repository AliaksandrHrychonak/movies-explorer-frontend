import { React, useState } from 'react';
import './SavedMovies.css'
import Header from "../Header/Header";
import SearchInput from "../SearchInput/SearchInput";
import ContentContainer from '../ContentContainer/ContentContainer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

const SavedMovies = ({ movies, innerWidth, isLoggedIn, isMobile, isMenuToggle }) => {
  const [valueButtonSwitch, setValueButtonSwitch] = useState(true)
  
  const countMovies = () => {
    let count = 3;
    if(innerWidth <= 450){
      count = 3
    } else if (innerWidth <= 800) {
      count = 3
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
        <MoviesCardList movies={movies} count={countMovies()} locationMovies={false}/>
      </ContentContainer>
      <Footer />
    </>
  );
}

export default SavedMovies;
