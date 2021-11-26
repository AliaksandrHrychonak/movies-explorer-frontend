import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = ({ movies, count, locationMovies }) => {
  
  return (
    <section className="movies">
      <div className="movies__item">
        {movies.slice(0, count).map((movie) => (
          <MoviesCard
            name={movie.nameRU}
            key={movie.id}
            duration={movie.duration}
            link={movie.trailerLink}
            year={movie.year}
            image={movie.image.url}
            isSavedCard={true}
            locationMovies={locationMovies}
          />
        ))}
      </div>
    </section>
  );
};

export default MoviesCardList;
