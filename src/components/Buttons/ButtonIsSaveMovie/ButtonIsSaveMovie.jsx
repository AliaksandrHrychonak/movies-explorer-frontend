import React from "react";
import "./ButtonIsSaveMovie.css";
import savedIcon from '../../../images/icon-saved.svg'
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
      <button></button>
  );
};

export default ButtonIsSaveMovie;
