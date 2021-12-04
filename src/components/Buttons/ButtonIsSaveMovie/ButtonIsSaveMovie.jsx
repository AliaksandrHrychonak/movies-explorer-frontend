import React from "react";
import "./ButtonIsSaveMovie.css";
import savedIcon from '../../../images/icon-saved.svg';
import crossIcon from '../../../images/cross-icon.svg';
const ButtonIsSaveMovie = ({ locationMovies, isSaved, toggleSave, onDelete }) => {
  return (
      locationMovies ?
      <button
      style={isSaved ? {backgroundImage: `url(${savedIcon})` } : {color: '#000'}}
      className={`movie-button ${ isSaved ? "movie-button_type_save" :  "movie-button_type_saved" }`}
      onClick={ isSaved ? null : toggleSave }
      >
      {isSaved ? "" : "Сохранить"}
      </button>
      :
      <button onClick={onDelete} className="movie-button movie-button_type_delete" style={{backgroundImage: `url(${crossIcon})` }} />
  );
};

export default ButtonIsSaveMovie;
