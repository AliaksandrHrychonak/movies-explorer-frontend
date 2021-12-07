import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";
const RegistrationForm = () => {
  return (
    <form className="form">
      <label htmlFor="name-signup" className="form__label">
        Имя
      </label>
      <input
        id="name-signup"
        name="name-signup"
        type="text"
        className="form__input"
      />

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

      <button className="form__button">Зарегистрироваться</button>
      <Link to="/sign-in" className="form__link">
        <p className="form__subtitle">
          Уже зарегистрированы?<span className="form__span">Войти</span>
        </p>
      </Link>
    </form>
  );
};

export default RegistrationForm;
