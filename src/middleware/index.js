import url from 'url';

class FetchMiddleware {
  constructor({ fetchUrl, types, actions, next, rest, getState }) {
    this.fetchUrl = fetchUrl;
    this.types = types;
    this.actions = actions;
    this.next = next;
    this.rest = rest;
    this.getState = getState;
  }

  checkStatus() {
    const { status, statusText } = this.results;
    if (!status) {
      throw new Error('unknown error');
    }
  
    if (status < 200 || status > 300) {
      throw new Error(statusText);
    }
    return;
  }

  async fetchInfo() {
    const { REQUEST, SUCCESS, FAILURE } = this.types
    this.next({ ...this.rest, type: REQUEST})
    console.log('Fetch', REQUEST, this.getState())

  
    try {
      this.results = await fetch(this.fetchUrl, this.params);
      this.checkStatus();
      this.payload = await this.results.json();
      this.next({ ...this.rest, payload: this.payload, type: SUCCESS})
      console.log('Fetch', SUCCESS, this.payload, this.getState())
    } catch(error) {
      console.log(error);
      this.error = error;
      this.next({ ...this.rest, error: this.error, type: FAILURE})
      console.log('Fetch', FAILURE, error, this.getState())
    }
  }

  static api({ getState }) {
    return (next) => async (action) => {
      const { api, types, ...rest } = action;
  
      if (!api) {
        return next(action);
      }

      const { path, params } = api;
      const fetchUrl = `${this.baseUrl}${path}`

      const fetchMiddleware = new FetchMiddleware({ fetchUrl, types, params, rest, next, getState });
      return await fetchMiddleware.fetchInfo();
    }
  }

  static omdb({ getState }) {
    const omdbUrl = 'http://www.omdbapi.com/'
    const apikeyPrefix = 'apikey';
    const apikey = '68efb17a';
    const searchPrefix = 't';

    return (next) => async (action) => {
      const { omdb, types, ...rest } = action;
  
      if (!omdb) {
        return next(action);
      }

      const { searchTerm } = omdb;
      const searchPostfix = `&${searchPrefix}=${searchTerm}`;
      const fetchUrl = url.resolve(omdbUrl, `?${apikeyPrefix}=${apikey}${searchPostfix}`);
      const fetchMiddleware = new FetchMiddleware({ fetchUrl, types, next, rest, getState });
      return await fetchMiddleware.fetchInfo();
    }
  }

  static tmdb({ getState }) {
    const baseUrl = 'https://api.themoviedb.org'
    const apiVersion = '3'
    const apikey = '6aab436060c639ad9769731360783ac6';
    const apikeyPrefix = 'api_key';

    return (next) => async (action) => {
      const { tmdb, types, ...rest } = action;
    
      if (!tmdb) {
        return next(action);
      }

      const { popularUrl } = tmdb;
      const apikeyQuery = `${apikeyPrefix}=${apikey}`;
      const query = `${popularUrl}&${apikeyQuery}`;
      const tmdbUrl = `${baseUrl}/${apiVersion}/`;
      const fetchUrl = url.resolve(tmdbUrl, query);
      const fetchMiddleware = new FetchMiddleware({ fetchUrl, types, next, rest, getState });
      return await fetchMiddleware.fetchInfo();
    }
  }
}

export default FetchMiddleware;