import React from 'react';
import PropTypes from 'prop-types';

import moviePlaceholder from '../../images/placeholders/movie-placeholder.gif';

export default class MoviePoster extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.image !== this.props.image
      || nextProps.title !== this.props.title;
  }

  render() {
    const { image, title } = this.props;

    return (
      <img src={image === 'N/A' ? moviePlaceholder : image} alt={title} />
    );
  }
}

MoviePoster.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
