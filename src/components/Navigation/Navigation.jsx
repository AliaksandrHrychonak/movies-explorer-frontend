import React from 'react';
import "./Navigation.css"
import { NavLink } from 'react-router-dom';

const Navigation = ({ row }) => {
  return (
    <nav className={`navigation ${ row ? "navigation_type_row" : "navigation_type_column" }`}>
      <ul className={`navigation__list ${row ? "navigation__list_type_row" : "navigation__list_type_column" }`}>
        <li className={`navigation__element ${row ? "navigation__element_type_row" : "navigation__element_type_column" }`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "navigation__link navigation__link_type_active" : "navigation__link" }>
            Главная
          </NavLink>
        </li>
        <li className={`navigation__element ${row ? "navigation__element_type_row" : "navigation__element_type_column" }`}>
          <NavLink to="/movies" className={({ isActive }) => isActive ? "navigation__link navigation__link_type_active" : "navigation__link" }>
            Фильмы
          </NavLink>
        </li>
        <li className={`navigation__element ${row ? "navigation__element_type_row" : "navigation__element_type_column" }`}>
          <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "navigation__link navigation__link_type_active" : "navigation__link" }>
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
