import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';

import MoviesList from '../Movies/List';
import MoviesNav from '../Movies/Nav';

import { selectFavoritedMovies } from '../../business/modules/movies/selectors/movies';

@connect(state => ({ movies: selectFavoritedMovies(state) }))
export default class Favorites extends React.PureComponent {
  static defaultProps = {
    movies: [],
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps.movies, this.props.movies);
  }

  render() {
    const { movies } = this.props;

    return (
      <div className="list">
        <MoviesNav count={movies.length} enableSorting={false} />
        <MoviesList movies={movies} emptyMessage="No favorites yet." />
      </div>
    );
  }
}

Favorites.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
