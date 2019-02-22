import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, size, ...rest }) => (
  <i className={`icon icon-${name} ${size ? `icon-${size}` : ''}`} {...rest} />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default Icon;
