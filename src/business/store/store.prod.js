/* eslint-disable no-undef */

import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { autoRehydrate } from 'redux-persist';

import sagas from '../sagas';
import reducers from '../reducers';

export default function (history) {
  const sagaMiddleware = createSagaMiddleware();
  const browserMiddleware = routerMiddleware(history);

  const createEnhancedStore = compose(
    applyMiddleware(
      sagaMiddleware,
      browserMiddleware,
    ),
    autoRehydrate(),
  )(createStore);

  const store = createEnhancedStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
  );
  sagaMiddleware.run(sagas);

  return store;
}
