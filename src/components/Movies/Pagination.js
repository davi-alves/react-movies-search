import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import _range from 'lodash/range';

import { paginateSearchResults } from '../../business/modules/movies/actions/movies';
import { selectSearchInfo } from '../../business/modules/movies/selectors/movies';

@connect(state => ({ info: selectSearchInfo(state) }), { paginateSearchResults })
export default class Pagination extends React.PureComponent {
  static defaultProps = {
    info: {
      query: null,
      page: 1,
      total: 0,
      busy: false,
    },
    paginateSearchResults: f => f,
  };

  static PER_PAGE = 10;

  componentWillMount() {
    this.updateTotalPagesCount(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateTotalPagesCount(nextProps);
  }

  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps.info, this.props.info);
  }

  /**
   * Handles next page
   */
  onNext = () => {
    const { busy, query, page } = this.props.info;
    if (busy || page + 1 > this.totalPages) return;

    this.props.paginateSearchResults(query, page + 1);
  };

  /**
   * Handles previous page
   */
  onPrev = () => {
    const { busy, query, page } = this.props.info;
    if (busy || page - 1 < 1) return;

    this.props.paginateSearchResults(query, page - 1);
  };

  /**
   * Handles page click
   */
  onPage = (page) => {
    const { busy, query } = this.props.info;
    if (busy) return;

    this.props.paginateSearchResults(query, page);
  };

  updateTotalPagesCount = (props) => {
    if (props && props.info) {
      this.totalPages = Math.round(props.info.total / Pagination.PER_PAGE);
    }
  }

  /**
   * Total of pages
   *
   * @type {number}
   */
  totalPages = 0;

  /**
   * Renders an item in pagination
   *
   * @param {Object} item
   * @returns {React.Component}
   */
  renderItem = (item) => {
    const current = this.props.info.page === item;

    return (
      <li
        className={current ? 'current' : null}
        key={item}
      >
        {current ? item : <button onClick={() => this.onPage(item)}>{item}</button>}
      </li>
    );
  }

  /**
   * Renders previous action
   *
   * @returns {React.Component}
   */
  renderPrev = () => (
    <button
      className={['prev', this.props.info.page === 1 ? null : 'enabled'].join(' ')}
      onClick={this.onPrev}
    >Prev</button>
  );

  /**
   * Renders next action
   *
   * @returns {React.Component}
   */
  renderNext = () => (
    <button
      className={['next', this.props.info.page === this.totalPages ? null : 'enabled'].join(' ')}
      onClick={this.onNext}
    >Next</button>
  );

  render() {
    const { page, total } = this.props.info;
    if (!page || !total || this.totalPages === 1) return null;

    return (
      <div className="pagination">
        {this.renderPrev()}
        <ul className="pages">
          {_range(this.totalPages).map(val => this.renderItem(val + 1))}
        </ul>
        {this.renderNext()}
      </div>
    );
  }
}

Pagination.propTypes = {
  info: PropTypes.shape({
    query: PropTypes.string,
    total: PropTypes.number,
    page: PropTypes.number,
    busy: false,
  }),
  paginateSearchResults: PropTypes.func,
};
