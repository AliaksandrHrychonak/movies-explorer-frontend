import React from 'react';
import './ProfileForm.css'

const ProfileForm = ({ name, email }) => {
  return (
    <form className="form-profile">
      <label htmlFor="" className="form-profile__label">
        Имя
        <input
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
          placeholder={name}
          className="form-profile__input"
          autoComplete="off"
        />
      </label>
      <hr className="form-profile__line"/>
      <label htmlFor="" className="form-profile__label">
        E-mail
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email || ""}
          placeholder={email}
          className="form-profile__input"
          autoComplete="off"
        />
      </label>
      <span
        className={`form__error form__error_type_profile ${
          errors.email && "form__error_type_visible"
        }`}
      >
        {errors.email}
      </span>

      <button
        disabled={!isValid || !(values.name !== name) || !(values.email !== email)}
        className={`form-profile__button ${
          isValid && (values.name !== name && values.email !== email)
            ? "form-profile__button_type_active"
            : "form-profile__button_type_disabled"
        }`}
      >
        Редактировать
      </button>
      <button
        className="form-profile__button form-profile__button_theme_red"
        onClick={onLogOut}
      >
        Выйти из аккаунта
      </button>
    </form>
  );
}

export default ProfileForm;
