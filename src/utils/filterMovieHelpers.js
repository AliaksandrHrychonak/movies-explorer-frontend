export const filterByKeyword = (collection, keyword) => collection.filter(({ nameRU }) => nameRU.toLowerCase().includes(keyword.toLowerCase()));

export const filterMoviesDuration = (collection) => collection.filter(({ duration }) => duration <= 40);

export const filterMovieDelete = (collection, array) => collection.filter(item => item.movieId !== array.movieId)

export const updatesArrayMovies = (array, updateItem) => array.map((item) => item.movieId === updateItem.movieId ? updateItem : item)
  
