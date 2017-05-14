import { all } from 'redux-saga/effects';

import moviesSagas from './modules/movies/sagas';

export default function* fn() {
  yield all([].concat(moviesSagas));
}
