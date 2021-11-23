import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import MobileMenu from '../MobileMenu/MobileMenu';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';

const Main = ({isLoggedIn, isMobile, isMenuToggle, isOpen}) => {
  return (
    <main className="main">
      <Header isLoggedIn={isLoggedIn} isMobile={isMobile} isMenuToggle={isMenuToggle} />
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />
      <MobileMenu isLoggedIn={isLoggedIn} isOpen={isOpen} isMobile={isMobile} isMenuToggle={isMenuToggle}/>
    </main>
  );
}

export default Main;
