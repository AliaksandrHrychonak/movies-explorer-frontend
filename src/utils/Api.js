class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  registration(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data.name, data.email, data.password)
    })
    .then(this._handleResponse)
  }

  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data.email, data.password),
      credentials: 'include'
    })
    
    .then(this._handleResponse)
    .then((data) => {
      if (data.token){
        console.log(data.token);
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
  }

  updateUserMe(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
    })
    .then(this._handleResponse)
  }

  getUserMe = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._handleResponse)
  }

  getApiMovies() {
    return fetch(`${this._url}/movies`, {})
    .then(this._handleResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://api-movies-explorer.nomoredomains.rocks',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
