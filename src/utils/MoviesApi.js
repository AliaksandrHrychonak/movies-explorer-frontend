class MoviesApi {
  constructor(config) {
    this._url = config.url;
  }

  getMovies() {
    return fetch(`${this._url}`)
      .then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }
}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
});
