import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = React.forwardRef(
  (
    {
      name,
      size,
      'aria-label': ariaLabel,
      color,
      className,
      children,
      ...rest
    },
    ref
  ) => (
    <i
      ref={ref}
      aria-hidden="true"
      className={classNames(
        'icon',
        `icon-${name}`,
        size && `icon-${size}`,
        color && `text-${color}`,
        className
      )}
      {...rest}
    >
      {children}
    </i>
  )
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  'aria-label': PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};

export default Icon;
