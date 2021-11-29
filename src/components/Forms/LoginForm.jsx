import React from 'react';
import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <form className="form">
      <label htmlFor="name-signup" className="form__label">
        E-mail
      </label>
      <input
        id="email-signup"
        name="email-signup"
        type="email"
        className="form__input form__input_theme_bold"
      />

      <label htmlFor="password-signup" className="form__label">
        Пароль
      </label>
      <input
        id="passsword-signup"
        name="password-signup"
        type="password"
        className="form__input"
      />
      <span className="form__error">Что-то пошло не так...</span>

      <button className="form__button form__button_type_signin">Войти</button>
      <Link to="/sign-up" className="form__link">
        <p className="form__subtitle">
          Ещё не зарегистрированы?<span className="form__span">Регистрация</span>
        </p>
      </Link>
    </form>
  );
}

export default LoginForm;
