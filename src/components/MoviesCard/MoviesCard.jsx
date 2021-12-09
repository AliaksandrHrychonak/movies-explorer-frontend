import { React } from "react";
import ButtonIsSaveMovie from "../Buttons/ButtonIsSaveMovie/ButtonIsSaveMovie";
import "./MoviesCard.css";
import { convertTime } from "../../utils/moviesHelper";
const MoviesCard = ({ movie, isSavedCard, locationMovies, onSave, onDelete}) => {

  const handleSaveMovie = () => {
    onSave(movie)
  };
  
  const handleDeleteMovie = () => {
    onDelete(movie)
  }

  return (
      <article className="card">
        <ButtonIsSaveMovie isSaved={isSavedCard} onSave={handleSaveMovie} onDelete={handleDeleteMovie} locationMovies={locationMovies} movie={movie} />
        <a href={movie.trailer} className="card-link" target="_blank" rel="noopener noreferrer">
          <img src={movie.image} alt={movie.nameRU} className="card__image" />
        </a>
        <div className="card__description">
          <p className="card__title">{movie.nameRU}</p>
          <span className="card__duration">{convertTime(movie.duration)}</span>
        </div>
      </article>
    
  );
};

export default MoviesCard;
