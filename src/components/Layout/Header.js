import React from 'react';

import Search from '../Form/SearchBar';

export default class Header extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="header">
        <div className="content">
          <div className="left">
            <h1 className="title">Movie Search</h1>
          </div>
          <div className="right">
            <Search />
          </div>
        </div>
      </div>
    );
  }
}
