import React from 'react';
import './ButtonMoreMovies.css'

const ButtonMoreMovies = ({ onClick }) => {
  
  return (
    <button className="movies__button-more" onClick={onClick}>
      Ещё
    </button>
  );
}

export default ButtonMoreMovies;
