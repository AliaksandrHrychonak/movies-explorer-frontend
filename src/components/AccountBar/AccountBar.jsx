import React from 'react';
import { Link } from 'react-router-dom';
import './AccountBar.css'

const AccountBar = ({ isLoggedIn }) => {
  return (
    <div className="account-bar">
     { 
      isLoggedIn ?
        <>
          <Link to="profile" className="account-bar__link">
            <button className="account-bar__button account-bar__button_type_account">
              <span className="account-bar__button-icon" />
              Аккаунт
            </button>
          </Link>
          <button className="acccount-bar__burger-button">
            <span className="acccount-bar__burger-button_line"/>
          </button>
        </>
      : 
      <>
        <Link to="sign-up" className="account-bar__link">
          <button className="account-bar__button account-bar__button_type_signup">Регистрация</button>
        </Link>
        <Link to="sign-in" className="account-bar__link">
          <button className="account-bar__button account-bar__button_type_signin">Войти</button>
        </Link>
      </>
    }
    </div>
  );
}

export default AccountBar;
