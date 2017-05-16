import { fork, takeLatest, call, put } from 'redux-saga/effects';

import { MOVIES, updateSearchResult, toggleBusy } from '../actions/movies';
import MovieSearchApi from '../../../../libs/MovieApi';

/**
 * Paginate search results
 *
 * @param {String} query
 * @param {Number} page
 * @returns {Object|undefined}
 */
export function* paginate(query, page) {
  // toggle busy
  yield put(toggleBusy(true));

  let result;

  try {
    result = yield call(MovieSearchApi.search, query, page);
    if (result && Array.isArray(result.nodes) && result.nodes.length > 0) {
      yield put(updateSearchResult(result));
    }
  } catch (e) {
    console.info(e); // eslint-disable-line
  }
  // toggle busy
  yield put(toggleBusy(false));

  return result;
}

/**
 * Listens to pagination action
 */
export function* paginateFlow() {
  yield takeLatest(MOVIES.SEARCH_RESULTS_PAGINATE, function* fn(request) {
    const { query, page } = request.payload;

    yield call(paginate, query, page);
  });
}

export default [
  fork(paginateFlow),
];
