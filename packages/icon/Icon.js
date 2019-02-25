import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, size, 'aria-label': ariaLabel, className, ...rest }) => (
  <i
    aria-label={ariaLabel || name}
    className={`icon icon-${name}${size ? ` icon-${size}` : ''} ${className}`}
    {...rest}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
