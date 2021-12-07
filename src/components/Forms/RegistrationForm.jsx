import { React } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

const RegistrationForm = ({ onRegistartion }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegistartion(values);
      resetForm()
    }
    return
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name-signup" className="form__label">
        Имя
      </label>
      <input
        id="name-signup"
        name="name"
        type="text"
        className={`form__input ${errors.name && "form__input_theme_error"}`}
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        value={values.name || ""}
      />
      <span
        className={`form__error ${errors.name && "form__error_type_visible"}`}
      >
        {errors.name}
      </span>

      <label htmlFor="name-signup" className="form__label">
        E-mail
      </label>
      <input
        id="email-signup"
        name="email"
        type="email"
        required
        className={`form__input form__input_theme_bold ${
          errors.email && "form__input_theme_error"
        }`}
        onChange={handleChange}
        value={values.email || ""}
      />
      <span
        className={`form__error ${errors.email && "form__error_type_visible"}`}
      >
        {errors.email}
      </span>

      <label htmlFor="password-signup" className="form__label">
        Пароль
      </label>
      <input
        id="passsword-signup"
        name="password"
        type="password"
        required
        minLength="8"
        className={`form__input ${
          errors.password && "form__input_theme_error"
        }`}
        onChange={handleChange}
        value={values.password || ""}
      />
      <span
        className={`form__error ${
          errors.password && "form__error_type_visible"
        }`}
      >
        {errors.password}
      </span>

      {!isValid && (
        <span className={`form__error ${isValid && 'form__error_type_visible'}`}>Что-то пошло не так...</span>
      )}

      <button
        disabled={!isValid}
        className={`form__button ${
          isValid ? "form__button_type_active" : "form__button_type_disabled"
        }`}
      >
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="form__link">
        <p className="form__subtitle">
          Уже зарегистрированы?<span className="form__span">Войти</span>
        </p>
      </Link>
    </form>
  );
};

export default RegistrationForm;
