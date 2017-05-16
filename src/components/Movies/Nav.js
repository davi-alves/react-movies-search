import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sorter from './Sorter';

export default class MoviesList extends React.PureComponent {
  static defaultProps = {
    count: 0,
    enableSorting: true,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.count !== this.props.count;
  }

  render() {
    return (
      <div className="list-nav">
        <div className="results-count">{this.props.count} results</div>
        <Sorter enabled={this.props.enableSorting} />
        <div className="list-nav-actions">
          <NavLink
            exact
            className="list-nav-action"
            activeClassName="active"
            to="/"
          >Search</NavLink>
          <NavLink
            className="list-nav-action"
            activeClassName="active"
            to="/favorites"
          >Favorites</NavLink>
        </div>
      </div>
    );
  }
}

MoviesList.propTypes = {
  count: PropTypes.number,
  enableSorting: PropTypes.bool,
};
