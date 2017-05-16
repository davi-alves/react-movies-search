import { createSelector } from 'reselect';
import _omit from 'lodash/omit';
import _sortBy from 'lodash/sortBy';

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
 * Returns the search sorting
 *
 * @param {Object} state
 * @returns
 */
export const selectSearchSort = createSelector(
  selectSearch,
  search => search.sort,
);

/**
 * Returns the search total results
 *
 * @param {Object} state
 * @returns
 */
export const selectSearchTotal = createSelector(
  selectSearch,
  search => search.total,
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
  selectSearchSort,
  (movies, search, favorites, sort) => {
    const result = [];
    search.forEach((item) => {
      const movie = Object.assign({}, movies[item]);
      if (movie) {
        if (favorites.indexOf(item) !== -1) movie.favorited = true;
        result.push(movie);
      }
    });

    if (!sort.field) return result;
    const sortedResult = _sortBy(result, sort.field);

    return sort.dist === 'asc' ? sortedResult : sortedResult.reverse();
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

