import { createSelector } from 'reselect';
import _omit from 'lodash/omit';

/**
 * Returns all movies
 *
 * @param {Object} state
 * @returns
 */
export const selectMovies = state => state.movies.movies;

/**
 * Returns the search result
 *
 * @param {Object} state
 * @returns
 */
export const selectSearchResults = state => state.movies.search.nodes;

/**
 * Returns the search state object
 *
 * @param {Object} state
 * @returns
 */
export const selectSearch = state => state.movies.search;

/**
 * Returns the search info
 *
 * @param {Object} state
 * @returns
 */
export const selectSearchInfo = createSelector(
  selectSearch,
  search => _omit(search, ['nodes']),
);

/**
 * Returns the search busy state
 *
 * @param {Object} state
 * @returns
 */
export const selectSearchBusyState = createSelector(
  selectSearch,
  search => search.busy,
);

/**
 * Returns favorited movies ids
 *
 * @param {Object} state
 * @returns {Array}
 */
export const selectFavorites = state => state.movies.favorites;

/**
 * Returns the search result
 *
 * @param {Object} state
 * @returns
 */
export const selectMoviesFromSearch = createSelector(
  selectMovies,
  selectSearchResults,
  selectFavorites,
  (movies, search, favorites) => {
    const result = [];
    search.forEach((item) => {
      const movie = Object.assign({}, movies[item]);
      if (movie) {
        if (favorites.indexOf(item) !== -1) movie.favorited = true;
        result.push(movie);
      }
    });

    return result;
  },
);

/**
 * Returns the search result
 *
 * @param {Object} state
 * @returns
 */
export const selectFavoritedMovies = createSelector(
  selectMovies,
  selectFavorites,
  (movies, favorites) => {
    const result = [];
    favorites.forEach((item) => {
      const movie = Object.assign({}, movies[item]);
      if (movie) {
        movie.favorited = true;
        result.push(movie);
      }
    });

    return result;
  },
);

