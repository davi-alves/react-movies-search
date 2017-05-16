import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';

import { sortMovies } from '../../business/modules/movies/actions/movies';
import { selectSearchSort } from '../../business/modules/movies/selectors/movies';

@connect(state => ({ sort: selectSearchSort(state) }), { sortMovies })
export default class MovieSorter extends React.PureComponent {
  static defaultProps = {
    enabled: false,
    sortMovies: f => f,
    sort: {
      field: null,
      dist: null,
    },
  };

  state = { field: undefined }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(nextProps.sort, this.props.sort)
      || nextState.field !== this.state.field;
  }

  handleSorting = (value) => {
    const field = value === 'Select' ? undefined : value;
    this.setState({ field });
    this.props.sortMovies(field);
  }

  render() {
    const { sort, enabled } = this.props;
    if (!enabled) return null;
    const { field } = this.state;

    return (
      <div className="sorter">
        <div className="sort">
          <label htmlFor="sortBy">Sort by</label>
          <select
            id="sortBy"
            onChange={e => this.handleSorting(e.target.value)}
            value={field}
          >
            <option>Select</option>
            <option value="Year">Year</option>
            <option value="imdbRating">Rating</option>
          </select>
        </div>
        <button className="dist" onClick={() => this.handleSorting(field)}>
          {sort.field ? <div className={['indicator', sort.dist].join(' ')}>&nbsp;</div> : null}
        </button>
      </div>
    );
  }
}

MovieSorter.propTypes = {
  enabled: PropTypes.bool,
  sortMovies: PropTypes.func,
  sort: PropTypes.shape({
    field: PropTypes.string,
    dist: PropTypes.string,
  }),
};
