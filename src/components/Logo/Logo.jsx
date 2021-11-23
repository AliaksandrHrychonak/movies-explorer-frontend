import React from 'react';
import './Logo.css'
import { Link } from 'react-router-dom';
import logo from "../../images/logo.svg"

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <img src={logo} alt="логотип" className="logo"/>
    </Link>
  );
}

export default Logo;
