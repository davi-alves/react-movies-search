import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class MoviesList extends React.PureComponent {
  static defaultProps = {
    count: 0,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.count !== this.props.count;
  }

  render() {
    return (
      <div className="list-nav">
        <div className="results-count">{this.props.count} resultados</div>
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
};
