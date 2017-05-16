export const MOVIES = {
  TOGGLE_FAVORITES: 'MOVIE_TOGGLE_FAVORITES',
  SEARCH_RESULTS: 'MOVIES_SEARCH_RESULTS',
  SEARCH_RESULTS_PAGINATE: 'MOVIES_SEARCH_RESULTS_PAGINATE',
  TOGGLE_BUSY: 'MOVIES_TOGGLE_BUSY',
  SORT: 'MOVIES_SORT',
};

/**
 * Update movies results
 *
 * @param {Array} result
 * @returns {Object}
 */
export const updateSearchResult = result => ({ type: MOVIES.SEARCH_RESULTS, payload: result });

/**
 * Paginate search results
 *
 * @param {Array} results
 * @returns {Object}
 */
export const paginateSearchResults = (query, page) => ({
  type: MOVIES.SEARCH_RESULTS_PAGINATE,
  payload: { query, page },
});

export const toggleFavorite = id => ({
  type: MOVIES.TOGGLE_FAVORITES,
  payload: id,
});

/**
 * Toggle busy search
 *
 * @param {Boolean|null} flag
 * @returns {Object}
 */
export const toggleBusy = (flag = null) => ({ type: MOVIES.TOGGLE_BUSY, payload: flag });

/**
 * Toggle busy search
 *
 * @param {String|null} field
 * @param {String|null} dist
 * @returns {Object}
 */
export const sortMovies = (field, dist) => ({ type: MOVIES.SORT, payload: { field, dist } });
