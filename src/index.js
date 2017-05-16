import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'; // eslint-disable-line
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';
import _result from 'lodash/result';

import './styles/styles.sass';

import createStore from './business/store';
import MoviesApi from './libs/MovieApi';
import Base from './components/Layout/Base';
import Routes from './Routes';

// setups localForage
localForage.config({
  name: 'MOVIES_SEARCH',
  version: '1.0.0',
  storeName: 'movies_search',
  description: 'Movies search storage',
});

// setup store
const history = createHistory();
const store = createStore(history);

// load store persistence
persistStore(store, {
  storage: localForage,
  blacklist: ['routing'],
}, () => {
  MoviesApi.populateCache(_result(store.getState(), 'movies.movies'));
  // boot the app on complete
  ReactDOM.render(
    <Provider store={store}>
      <Base>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Base>
    </Provider>,
    document.getElementById('root'),
  );
});
