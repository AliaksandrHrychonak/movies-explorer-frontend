import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';

const Main = ({isLoggedIn, isMobile, isMenuToggle}) => {
  return (
    <main className="main">
      <Header isLoggedIn={isLoggedIn} isMobile={isMobile} isMenuToggle={isMenuToggle} />
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default Main;
