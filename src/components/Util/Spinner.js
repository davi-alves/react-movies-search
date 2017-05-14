import React from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';

export default class Spinner extends React.PureComponent {
  static defaultProps = {
    visible: true,
    size: 40,
  };

  static CICLES = 12;

  shouldComponentUpdate(nextProps) {
    return !_isEqual(nextProps, this.props);
  }

  renderCircle = index => (
    <div key={`circle-${index}`} className={`spinner-circle${index} spinner-child`} />
  );

  render() {
    const { size, visible } = this.props;
    if (!visible) return null;

    return (
      <div className="spinner" style={{ height: size, width: size }}>
        {[...Array(Spinner.CICLES).keys()].map(i => this.renderCircle(i))}
      </div>
    );
  }
}

Spinner.propTypes = {
  visible: PropTypes.bool,
  size: PropTypes.number,
};
