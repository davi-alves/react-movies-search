import React from 'react';
import PropTypes from 'prop-types';

import '../../images/no-results.svg';

export default class Empty extends React.PureComponent {
  static defaultProps = {
    visible: false,
    message: '',
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible
      || nextProps.message !== this.props.message;
  }

  render() {
    const { visible, message } = this.props;
    if (!visible) return null;

    return (
      <div className="empty-list">{message}</div>
    );
  }
}

Empty.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
};
