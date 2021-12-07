import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__section">
        <p className="footer__copy">&copy; 2021</p>
        <ul className="footer__list">
          <li className="footer__list_item">
            <a href="https://practicum.yandex.ru/web/" className="footer__link" target="_blank" rel="noopener noreferrer">
              <p className="footer__subtitle">
                Яндекс.Практикум
              </p>
            </a>
          </li>
          <li className="footer__list_item">
            <a href="https://github.com/AliaksandrHrychonak" className="footer__link" target="_blank" rel="noopener noreferrer">
              <p className="footer__subtitle">
                Github
              </p>
            </a>
          </li>
          <li className="footer__list_item">
            <a href="https://www.facebook.com/profile.php?id=100010777031212" className="footer__link" target="_blank" rel="noopener noreferrer">
              <p className="footer__subtitle">
                Facebook
              </p>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
