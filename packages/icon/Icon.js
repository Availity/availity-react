import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = React.forwardRef(
  ({ name, size, 'aria-label': ariaLabel, color, className, ...rest }, ref) => (
    <i
      ref={ref}
      aria-label={ariaLabel || name}
      className={classNames(
        'icon',
        `icon-${name}`,
        size && `icon-${size}`,
        color && `text-${color}`,
        className
      )}
      {...rest}
    />
  )
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
