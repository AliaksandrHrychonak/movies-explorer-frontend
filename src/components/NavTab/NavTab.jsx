import React from 'react';
import EntryTitle from '../EntryTitle/EntryTitle';
import './NavTab.css'

const NavTab = () => {
  return (
    <section className="nav-tab">
      <EntryTitle title="О проекте" number={2} />
      <ul className="nav-tab__list">
        <li className="nav-tab__element">
          <p className="nav-tab__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="nav-tab__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="nav-tab__element">
          <p className="nav-tab__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="nav-tab__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="nav-tab__progress">
        <li className="nav-tab__progress-element nav-tab__progress-element_type_left">
          <p className="nav-tab__progress-title nav-tab__progress-title_theme_blue">1 неделя</p>
          <span className="nav-tab__progress-description">Back-end</span>
        </li>
        <li className="nav-tab__progress-element nav-tab__progress-element_type_right">
          <p className="nav-tab__progress-title">4 недели</p>
          <span className="nav-tab__progress-description">Front-end</span>
        </li>
      </div>
    </section>
  );
}

export default NavTab;
