import { React, useState } from "react";
import ButtonIsSaveMovie from "../Buttons/ButtonIsSaveMovie/ButtonIsSaveMovie";
import "./MoviesCard.css";

const MoviesCard = ({ name, duration, link, image, isSavedCard, locationMovies }) => {
  const [isSavedMovie, setIsSavedMovie] = useState(isSavedCard);

  const convertTime = (time) => {
    const houres = Math.floor(time / 60);
    const minutes = time % 60;
    const newTime = `${houres}ч ${minutes}м`;
    return newTime;
  };
  const handleSavedMovie = () => {
    setIsSavedMovie(!isSavedMovie);
  };

  return (  
    
      <article className="card">
        <ButtonIsSaveMovie isSaved={isSavedMovie} toggleSaved={handleSavedMovie} locationMovies={locationMovies} />
        <a href={link} className="card-link" target="_blank" rel="noreferrer">
          <img src={`https://api.nomoreparties.co${image}`} alt={name} className="card__image" />
        </a>
        <div className="card__description">
          <p className="card__title">{name}</p>
          <span className="card__duration">{convertTime(duration)}</span>
        </div>
      </article>
    
  );
};

export default MoviesCard;
