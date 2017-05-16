import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Observable } from 'rx';

import '../../images/icons/search.svg';
import Spinner from '../Util/Spinner';

import MovieSearch from '../../libs/MovieApi';
import { toggleBusy, updateSearchResult } from '../../business/modules/movies/actions/movies';
import { selectSearchBusyState } from '../../business/modules/movies/selectors/movies';

@connect(
  state => ({ isBusy: selectSearchBusyState(state) }),
  { toggleBusy, updateSearchResult, replace },
)
export default class SearchBar extends React.PureComponent {
  static defaultProps = {
    isBusy: false,
    toggleBusy: f => f,
    updateSearchResult: f => f,
    replace: f => f,
  };

  /*
   * Init the state
   */
  state = { search: '' };

  componentDidMount() {
    // binds the search input on mount complete
    this.bindSearch();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isBusy !== this.props.isBusy
      || nextState.search !== this.state.search;
  }

  componentWillUnmount() {
    // unbinds the search input on unmount
    this.searchInput.unsubscribe();
    this.searchInput = null;
  }

  /**
   * Input observable reference
   *
   * @type {Object}
   */
  searchInput;

  /**
   * Checks the current router to ensure that searchs are redirected to home
   */
  checkRoute = () => {
    if (window.location.pathname !== '/') this.props.replace('/');
  }

  /**
   * Handle search results updating state and store
   *
   * @param {Array} items
   */
  handleSearchResults = (result = {}) => {
    if (result && Array.isArray(result.nodes) && result.nodes.length > 0) {
      this.props.updateSearchResult(result);
    }

    this.props.toggleBusy(false);
  }

  /**
   * Binds search input to MoviesSearchApi
   */
  bindSearch = () => {
    this.searchInput = Observable
    // watch for keyup on search input
      .fromEvent(document.getElementById('movie-search'), 'keyup')
      // get the value
      .map(event => event.target.value)
      // filter for values long enough
      .filter(value => value.length > 3)
      // debounce the action
      .debounce(500)
      // get only values that have changed
      .distinctUntilChanged()
      // map to MoviesSearchApi
      .flatMapLatest((string) => {
        // set searching flag
        this.props.toggleBusy(true);
        this.checkRoute();

        return MovieSearch.search(string);
      });

    // subscribe to observable
    this.searchInput.subscribe(this.handleSearchResults, this.handleSearchResults);
  }

  /**
   * Handles onChange input event
   *
   * @param {Object} event
   */
  handleInputSearch = event => this.setState({ search: event.target.value })

  render() {
    const { isBusy } = this.props;

    return (
      <div className="search-bar">
        <form>
          <div className="search-bar-icon">
            {isBusy ? <Spinner /> : <div className="search-icon" />}
          </div>
          <input
            id="movie-search"
            type="search"
            placeholder="Type here to search for a movie"
            value={this.state.search}
            onChange={this.handleInputSearch}
          />
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  isBusy: PropTypes.bool,
  toggleBusy: PropTypes.func,
  updateSearchResult: PropTypes.func,
  replace: PropTypes.func,
};
