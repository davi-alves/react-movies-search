import React from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';

import Item, { ItemType } from './Item';
import Empty from './Empty';
import Spinner from '../Util/Spinner';

export default class MoviesList extends React.PureComponent {
  static defaultProps = {
    movies: [],
    emptyMessage: null,
    busy: false,
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps, this.props);
  }

  render() {
    const { movies, emptyMessage, busy } = this.props;

    return (
      <section className="movies-list">
        {busy ? <div className="movies-list-busy"><Spinner /></div> : null}
        {movies.map(item => <Item item={item} key={item.imdbID} />)}
        {busy ? null
          : <Empty visible={!movies.length && emptyMessage !== null} message={emptyMessage} />}
      </section>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(ItemType)),
  emptyMessage: PropTypes.string,
  busy: PropTypes.bool,
};
