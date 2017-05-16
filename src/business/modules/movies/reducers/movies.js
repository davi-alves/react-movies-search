import { REHYDRATE } from 'redux-persist/constants';
import update from 'immutability-helper';

import { MOVIES } from '../actions/movies';

const INITIAL_STATE = {
  movies: {},
  search: {
    nodes: [],
    query: '',
    total: 0,
    page: 1,
    busy: false,
    sort: {
      field: null,
      dist: null,
    },
  },
  favorites: [],
};

/**
 * Translate a list to a HashMap
 *
 * @param {Array}    list array of items
 * @returns {Object}      mapped object
 */
const listToMap = (list) => {
  const map = {};
  list.forEach((item) => {
    map[item.imdbID] = Object.assign({}, item);
  });

  return map;
};

/**
 * Map search results to state
 *
 * @param {Object} state   current state
 * @param {Object} result  search result
 * @returns {Object}       updated state
 */
const mapSearchResults = (state, result) => {
  const movies = listToMap(result.nodes);
  const search = Object.assign({}, INITIAL_STATE.search, {
    nodes: Object.keys(movies),
    total: parseInt(result.total, 10),
    page: result.page,
    query: result.query,
  });

  return update(state, { search: { $set: search }, movies: { $merge: movies } });
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.movies
        ? update(state, {
          movies: { $set: action.payload.movies.movies || {} },
          favorites: { $set: action.payload.movies.favorites || [] },
        })
        : INITIAL_STATE;

    case MOVIES.SEARCH_RESULTS:
      return mapSearchResults(state, action.payload);

    case MOVIES.TOGGLE_FAVORITES:
      return update(state, {
        favorites: {
          $apply: (favorites) => {
            const id = action.payload;
            const index = favorites.indexOf(id);

            if (index === -1) return favorites.concat([id]);
            return [...favorites.slice(0, index), ...favorites.slice(index + 1)];
          },
        },
      });

    case MOVIES.TOGGLE_BUSY:
      return update(state, {
        search: {
          busy: {
            $set: action.payload !== null ? Boolean(action.payload) : !state.search.busy,
          },
        },
      });

    case MOVIES.SORT:
      return update(state, {
        search: {
          sort: {
            $apply: (sort) => {
              const { field, dist } = action.payload;
              if (!field) return { field: null, dist: null };

              const newDist = dist || (sort.dist === 'asc' ? 'desc' : 'asc');

              return Object.assign({}, {
                field,
                dist: field !== sort.field ? sort.dist : newDist,
              });
            },
          },
        },
      });


    default:
      return state;
  }
};
