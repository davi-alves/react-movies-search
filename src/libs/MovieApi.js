/* globals process */

const CACHED_RESULTS = {};

export default class MovieApi {
  static prepareFields(movie) {
    return Object.assign({}, movie, {
      imdbRating: parseFloat(movie.imdbRating),
      Year: parseInt(movie.Year, 10),
    });
  }

  static populateCache(movies = {}) {
    const ids = Object.keys(movies);

    ids.forEach((id) => {
      CACHED_RESULTS[id] = MovieApi.prepareFields(movies[id]);
    });
  }
  static QUERY_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&type=movie&s=`;
  static GET_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&type=movie&i=`;

  static DEFAULT_RESULT = {
    query: null,
    page: 1,
    total: 0,
    nodes: 0,
  };

  /**
   * Searchs for movies by title
   *
   * @param {String} string search string
   * @param {Number} page   page number
   * @returns {Promise}
   */
  static search(string, page = 1) {
    const searchString = string.trim().replace(/ /g, '+');
    const cacheKey = `${searchString.toLowerCase()}:${page}`;
    if (CACHED_RESULTS[cacheKey]) return CACHED_RESULTS[cacheKey];

    return fetch(`${MovieApi.QUERY_URL}${searchString}&page=${page}`)
      .then(res => res.json())
      .then((res) => {
        if (!res.Response || !res.Response) return res;

        return Promise
          .all(res.Search.map(movie => MovieApi.getMovie(movie)))
          .then(movies => Object.assign({}, res, { Search: movies }));
      })
      // handle error response to always return an array
      .then(res => (
          !res.Response || !res.Response
            // retruns the default result on empty queries
            ? Object.assign({}, MovieApi.DEFAULT_RESULT, { query: searchString, page })
            // maps the result
            : { query: searchString, page, nodes: res.Search, total: res.totalResults }
        ),
      )
      .then((result) => {
        CACHED_RESULTS[cacheKey] = result;

        return CACHED_RESULTS[cacheKey];
      });
  }

  /**
   * Gets data for a single movie
   *
   * @param {Object} movie
   * @returns {Promise}
   */
  static getMovie(movie) {
    const cacheKey = movie.imdbID;
    if (CACHED_RESULTS[cacheKey]) return CACHED_RESULTS[cacheKey];

    return fetch(`${MovieApi.GET_URL}${movie.imdbID}`)
      .then(res => res.json())
      // handle error response to always return an array
      .then((result) => {
        CACHED_RESULTS[cacheKey] = this.prepareFields(Object.assign({}, movie, result));

        return CACHED_RESULTS[cacheKey];
      });
  }
}
