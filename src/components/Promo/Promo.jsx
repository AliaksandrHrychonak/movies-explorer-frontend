import React from 'react';
import './Promo.css'
import promoImage from '../../images/promo.svg'

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__text">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="promo__button-more">Узнать больше</button>
      </div>
      <div className="promo__image" style={{backgroundImage: `url(${promoImage})` }} />
    </section>
  );
}

export default Promo;
