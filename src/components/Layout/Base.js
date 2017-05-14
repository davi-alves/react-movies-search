import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const Base = props => (
  <div className="wrapper">
    <Header />
    <section className="content">
      <div className="inner">
        {React.cloneElement(props.children)}
      </div>
    </section>
    <Footer />
  </div>
);

Base.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Base;
