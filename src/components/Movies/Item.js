import React from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';

import Favorite from './Favorite';
import Poster from './Poster';

export default class MovieListItem extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps.item, this.props.item);
  }

  render() {
    const { item } = this.props;

    return (
      <article className="movie">
        <Favorite item={item} />
        <figure>
          <Poster title={item.Title} image={item.Poster} />
          <figcaption className="movie-title">{item.Title}</figcaption>
        </figure>
      </article>
    );
  }
}

export const ItemType = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  imdbID: PropTypes.string,
  Type: PropTypes.string,
  Poster: PropTypes.string,
};

MovieListItem.propTypes = {
  item: PropTypes.shape(ItemType).isRequired,
};
