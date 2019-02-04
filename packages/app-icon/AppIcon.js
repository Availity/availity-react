import React from 'react';
import PropTypes from 'prop-types';

function AppIcon({
  tag: Tag,
  color,
  size,
  branded,
  className,
  children,
  ...props
}) {
  const classname = [
    className,
    'app-icon',
    branded ? `app-icon-branded-${color}` : `app-icon-${color}`,
    size && `app-icon-${size}`,
  ]
    .filter(a => a)
    .join(' ');

  return (
    <Tag {...props} className={classname}>
      {children}
      {branded && <span className="caret" />}
    </Tag>
  );
}

AppIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  branded: PropTypes.bool,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
};

AppIcon.defaultProps = {
  tag: 'span',
  color: 'black',
};

export default AppIcon;
