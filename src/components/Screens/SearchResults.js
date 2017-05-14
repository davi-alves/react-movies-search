import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';

import MoviesList from '../Movies/List';
import MoviesNav from '../Movies/Nav';
import MoviesPagination from '../Movies/Pagination';

import {
  selectMoviesFromSearch,
  selectSearchBusyState,
} from '../../business/modules/movies/selectors/movies';

@connect(state => ({
  isBusy: selectSearchBusyState(state),
  movies: selectMoviesFromSearch(state),
}))
export default class SearchResults extends React.PureComponent {
  static defaultProps = {
    isBusy: false,
    movies: [],
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps.movies, this.props.movies);
  }

  render() {
    const { movies, isBusy } = this.props;

    return (
      <div className="list">
        <MoviesNav count={movies.length} />
        <MoviesPagination />
        <MoviesList movies={movies} emptyMessage="No movies found." busy={isBusy} />
        <MoviesPagination />
      </div>
    );
  }
}

SearchResults.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  isBusy: PropTypes.bool,
};
