import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';

import { toggleFavorite } from '../../business/modules/movies/actions/movies';

@connect(null, { toggleFavorite })
export default class MovieItemFavorite extends React.PureComponent {
  static defaultProps = {
    toggleFavorite: f => f,
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps.item, this.props.item);
  }

  render() {
    const { item } = this.props;

    return (
      <button
        className={['favorite', item.favorited && 'active'].join(' ')}
        onClick={() => this.props.toggleFavorite(item.imdbID)}
      />
    );
  }
}

MovieItemFavorite.propTypes = {
  item: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    favorited: PropTypes.bool,
  }).isRequired,
  toggleFavorite: PropTypes.func,
};
