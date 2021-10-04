import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = React.forwardRef(({ name, size, color, onClick, className, children, ...rest }, ref) => (
  <i
    ref={ref}
    aria-hidden="true"
    className={classNames('icon', `icon-${name}`, size && `icon-${size}`, color && `text-${color}`, className)}
    onClick={onClick}
    style={onClick ? { cursor: 'pointer' } : undefined}
    {...rest}
  >
    {children}
  </i>
));

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Icon;