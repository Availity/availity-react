import React from 'react';
import PropTypes from 'prop-types';

const sizes = ['', 'lg', 'xl', '2x', '3x', '4x', '5x'];

const Icon = ({ name, size, ...rest }) => (
  <i
    className={`icon icon-${name} ${
      size !== 1 ? `icon-${sizes[size - 1]}` : ''
    }`}
    {...rest}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Icon;
