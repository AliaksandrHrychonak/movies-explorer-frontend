import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import ContentContainer from '../ContentContainer/ContentContainer';

const Main = ({isLoggedIn, isMobile, isMenuToggle}) => {
  return (
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
