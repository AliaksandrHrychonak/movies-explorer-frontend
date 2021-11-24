import React from 'react';
import './ProfileForm.css'

const ProfileForm = ({ name, email }) => {
  return (
    <form className="form-profile">
      <label htmlFor="" className="form-profile__label">
        Имя
        <input type="text" value={ name || '' } placeholder="Имя" className="form-profile__input"/>
      </label>
      <hr className="form-profile__line"/>
      <label htmlFor="" className="form-profile__label">
        E-mail
        <input type="email" value={ email || '' } placeholder="E-mail" className="form-profile__input"/>
      </label>
      <button className="form-profile__button">Редактировать</button>
      <button className="form-profile__button form-profile__button_theme_red">Выйти из аккаунта</button>
    </form>
  );
}

export default ProfileForm;
