import React from "react";
import "./ButtonIsSaveMovie.css";
import savedIcon from '../../../images/icon-saved.svg';
import crossIcon from '../../../images/cross-icon.svg';
const ButtonIsSaveMovie = ({ locationMovies, isSaved, toggleSaved }) => {

  return (
      locationMovies ?
      <button
      style={isSaved ? {color: '#000'} : {backgroundImage: `url(${savedIcon})` }}
      className={`movie-button ${ isSaved ? "movie-button_type_saved" : "movie-button_type_save" }`}
      onClick={toggleSaved}
      >
      {isSaved ? "Сохранить" : ""}
      </button>
      :
      <button className="movie-button movie-button_type_delete" style={{backgroundImage: `url(${crossIcon})` }} />
  );
};

export default ButtonIsSaveMovie;
