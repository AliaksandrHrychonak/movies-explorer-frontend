import React from 'react';
import './AboutProject.css'
import EntryTitle from '../EntryTitle/EntryTitle';

const AboutProject = () => {
  return (
    <section className="aboute-project">
      <EntryTitle title="О проекте" number={2} />
      <ul className="aboute-project__list">
        <li className="aboute-project__element">
          <p className="aboute-project__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="aboute-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="aboute-project__element">
          <p className="aboute-project__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="aboute-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="aboute-project__progress">
        <li className="aboute-project__progress-element aboute-project__progress-element_type_left">
          <p className="aboute-project__progress-title aboute-project__progress-title_theme_blue">1 неделя</p>
          <span className="aboute-project__progress-description">Back-end</span>
        </li>
        <li className="aboute-project__progress-element aboute-project__progress-element_type_right">
          <p className="aboute-project__progress-title">4 недели</p>
          <span className="aboute-project__progress-description">Front-end</span>
        </li>
      </div>
    </section>
  );
}

export default AboutProject;
