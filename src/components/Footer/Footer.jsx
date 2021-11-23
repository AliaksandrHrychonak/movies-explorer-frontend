import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__section">
        <p className="footer__copy">&copy; 2021</p>
        <ul className="footer__list">
          <li className="footer__list_item">
            <Link to="" className="footer__link" >
              <p className="footer__subtitle">
                Яндекс.Практикум
              </p>
            </Link>
          </li>
          <li className="footer__list_item">
            <Link to="https://github.com/AliaksandrHrychonak" className="footer__link" >
              <p className="footer__subtitle">
                Github
              </p>
            </Link>
          </li>
          <li className="footer__list_item">
            <Link to="" className="footer__link" >
              <p className="footer__subtitle">
                Facebook
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
