import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = ({ movies, moviesSavedUser, count, locationMovies, onSave, onDelete }) => {
  return (
    <section className="movies">
      <div className="movies__item">
        {movies.length > 0 ? movies.slice(0, count).map((movie) => 
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            isSavedCard={(locationMovies ? moviesSavedUser : movies).some((i) => i.movieId === movie.movieId)}
            onSave={onSave}
            onDelete={onDelete}
            locationMovies={locationMovies}
          />
        ) :
          'Ничего не найдено'
      }
      </div>
    </section>
  );
};

export default MoviesCardList;
