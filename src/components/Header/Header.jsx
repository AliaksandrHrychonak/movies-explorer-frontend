import React from "react";
import "./Header.css";
import AccountBar from "../AccountBar/AccountBar";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

const Header = ({ isLoggedIn, isMobile, isMenuToggle }) => {
  return (
    <header className="header">
      <Logo />
      {isLoggedIn ? <Navigation row={true} /> : ""}
      <AccountBar
        isLoggedIn={isLoggedIn}
        isMobile={isMobile}
        isMenuToggle={isMenuToggle}
        accountBarMenu={true}
      />
    </header>
  );
};

export default Header;
