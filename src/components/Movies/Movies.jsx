import { React, useState } from "react";
import Header from "../Header/Header";
import SearchInput from "../SearchInput/SearchInput";
import ContentContainer from '../ContentContainer/ContentContainer';
import "./Movies.css";
import Footer from "../Footer/Footer";
const Movies = ({ isLoggedIn, isMobile, isMenuToggle }) => {
  const [valueButtonSwitch, setValueButtonSwitch] = useState(true)

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
      </ContentContainer>
      <Footer />
    </>
  );
};

export default Movies;
