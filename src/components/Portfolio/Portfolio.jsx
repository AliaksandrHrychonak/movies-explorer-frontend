import React from 'react';
import './Portfolio.css'
import EntryTitle from '../EntryTitle/EntryTitle';
import { infoMe } from '../../utils/infoMe'
import arrow from '../../images/arrow-link.svg'
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <EntryTitle title="Студент" number={4} />
      <article className="portfolio__info">
        <ul className="portfolio__list">
          <li className="portfolio__element">
            <h5 className="portfolio__title">{infoMe.name}</h5>
          </li>
          <li className="portfolio__element">
            <p className="portfolio__about">{infoMe.about}</p>
          </li>
          <li className="portfolio__element">
            <p className="portfolio__description">{infoMe.info}</p>
          </li>
          <li className="portfolio__element">
            {
              infoMe.links.map((e) =>
              <Link to={e.link} className="portfolio__social-link" key={e.name}>
                {e.name}
              </Link>
              )
            }
          </li>
        </ul>
        <Link to={infoMe.avatar.link}>
          <img src={infoMe.avatar.path} alt={infoMe.avatar.alt} className="portfolio__avatar"/>
        </Link>
      </article>
      <ul className="portfolio__projects">
        <h5 className="portfolio__project-title">Портфолио</h5>
        {
          infoMe.projects.map((e) => 
            <li className="portfolio__project" key={e.name}>
              <Link className="portfolio__project-link" to={e.link}>
                <p className="portfolio__project-name">{e.name}</p>
                <img src={arrow} alt="Перейти по ссылке" className="portfolio__project-arrow" />
              </Link>
            </li>
          )
        }
      </ul>
    </section>
  );
}

export default Portfolio;
