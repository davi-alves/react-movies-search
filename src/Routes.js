import React from 'react';
import { Route } from 'react-router';

import SearchResults from './components/Screens/SearchResults';
import Favorites from './components/Screens/Favorites';

export default () => (
  <div>
    <Route exact path="/" component={SearchResults} />
    <Route exact path="/favorites" component={Favorites} />
  </div>
);
