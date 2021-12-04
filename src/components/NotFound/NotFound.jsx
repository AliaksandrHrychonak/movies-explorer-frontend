import React from 'react';
import './NotFound.css'
const NotFound = ({onClick}) => {
  return (
    <section className="error">
      <h1 className="error__title">
        404
      </h1>
      <p className="error__subtitle">
        Страница не найдена
      </p>

      <span className="error__button-back" onClick={onClick}>Назад</span>
    </section>
  );
}

export default NotFound;
