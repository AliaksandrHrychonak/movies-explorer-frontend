import React from 'react';
import { Link } from 'react-router-dom';
import './AccountBar.css'

const AccountBar = ({ isLoggedIn, isMobile, isMenuToggle, accountBarMenu }) => {
  return (
    <div className="account-bar">
     { 
      isLoggedIn ?
        <>
          {
            isMobile && accountBarMenu ?
            <button className="acccount-bar__burger-button" onClick={isMenuToggle}>
              <span className="acccount-bar__burger-button_line"/>
            </button>
            :
            <Link to="/profile" className="account-bar__link">
              <button className="account-bar__button account-bar__button_type_account">
                <span className="account-bar__button-icon" />
                Аккаунт
              </button>
            </Link>
          }
        </>
      : 
      <>
        <Link to="/sign-up" className="account-bar__link">
          <button className="account-bar__button account-bar__button_type_signup">Регистрация</button>
        </Link>
        <Link to="/sign-in" className="account-bar__link">
          <button className="account-bar__button account-bar__button_type_signin">Войти</button>
        </Link>
      </>
    }
    </div>
  );
}

export default AccountBar;
