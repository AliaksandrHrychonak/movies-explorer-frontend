export const filterByKeyword = (collection, keyword) => collection.filter(({ nameRU }) => nameRU.toLowerCase().includes(keyword.toLowerCase()));

export const filterMoviesDuration = (collection) => collection.filter(({ duration }) => duration <= 40);