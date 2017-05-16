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
  selectSearchTotal,
} from '../../business/modules/movies/selectors/movies';

@connect(state => ({
  isBusy: selectSearchBusyState(state),
  movies: selectMoviesFromSearch(state),
  total: selectSearchTotal(state),
}))
export default class SearchResults extends React.PureComponent {
  static defaultProps = {
    isBusy: false,
    movies: [],
    total: 0,
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps.movies, this.props.movies);
  }

  render() {
    const { isBusy, movies, total } = this.props;

    return (
      <div className="list">
        <MoviesNav count={total} />
        <MoviesPagination />
        <MoviesList movies={movies} emptyMessage="No movies found." busy={isBusy} />
        <MoviesPagination />
      </div>
    );
  }
}

SearchResults.propTypes = {
  isBusy: PropTypes.bool,
  movies: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
};
