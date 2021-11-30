import React from "react";
import "./ProfileForm.css";
import useForm from "../../hooks/useForm";
const ProfileForm = ({ name, email, onEdit, onLogOut }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onEdit(values);
      resetForm();
    }
    return;
  };

  return (
    <form className="form-profile" onSubmit={handleSubmit} noValidate>
      <label htmlFor="" className="form-profile__label">
        Имя
        <input
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ''}
          placeholder={name}
          className="form-profile__input"
        />
      </label>
      <span className={`form__error ${errors.name && "form__error_type_visible"}`}>
        {errors.name}
      </span>
      <hr className="form-profile__line" />
      <label htmlFor="" className="form-profile__label">
        E-mail
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email || ''}
          placeholder={email}
          className="form-profile__input"
        />
      </label>
      <span className={`form__error ${errors.email && "form__error_type_visible"}`}>
        {errors.email}
      </span>
      <button disabled={!isValid} className={`form-profile__button ${isValid ? '' : ''}`}>Редактировать</button>
      <button className="form-profile__button form-profile__button_theme_red" onClick={onLogOut}>
        Выйти из аккаунта
      </button>
    </form>
  );
};

export default ProfileForm;
