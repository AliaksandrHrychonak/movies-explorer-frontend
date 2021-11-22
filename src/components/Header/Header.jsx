import React from 'react';
import './Header.css'
import logo from "../../images/logo.svg"
import AccountBar from '../AccountBar/AccountBar';
import Navigation from '../Navigation/Navigation';

const Header = ({ isLoggedIn, isMobile, isMenuToggle }) => {

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="logo"/>
      <Navigation row={true} />
      <AccountBar isLoggedIn={isLoggedIn} isMobile={isMobile} isMenuToggle={isMenuToggle} accountBarMenu={true}/>
    </header>
  );
}

export default Header;
