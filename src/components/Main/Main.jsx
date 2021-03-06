import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import ContentContainer from '../ContentContainer/ContentContainer';
import Preloader from '../Preloader/Preloader';

const Main = ({ isLoading, isLoggedIn, isMobile, isMenuToggle}) => {
  return (
    isLoading ? 
      <Preloader />
    : 
    <ContentContainer type="landing">
      <Header isLoggedIn={isLoggedIn} isMobile={isMobile} isMenuToggle={isMenuToggle} />
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />
    </ContentContainer>
  );
}

export default Main;
