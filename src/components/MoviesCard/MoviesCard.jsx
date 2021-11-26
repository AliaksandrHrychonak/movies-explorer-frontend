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
    <a href={link} className="card-link" target="_blank" rel="noreferrer">
      <article className="card">
        <ButtonIsSaveMovie isSaved={isSavedMovie} toggleSaved={handleSavedMovie} locationMovies={locationMovies} />
        <img src={`https://api.nomoreparties.co${image}`} alt={name} className="card__image" />
        <div className="card__description">
          <p className="card__title">{name}</p>
          <span className="card__duration">{convertTime(duration)}</span>
        </div>
      </article>
    </a>
  );
};

export default MoviesCard;
