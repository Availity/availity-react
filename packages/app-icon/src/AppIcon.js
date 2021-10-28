import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function AppIcon({ tag: Tag, color, size, src: image, alt, branded, className, children, ...props }) {
  const classes = classNames(className, 'app-icon', {
    [`app-icon-${color}`]: color && !branded,
    [`app-icon-branded-${color}`]: color && branded,
    [`app-icon-${size}`]: size,
    'border-0': image,
  });

  return (
    <Tag {...props} className={classes}>
      {image ? <img className="w-100 h-100 align-baseline" src={image} alt={alt} /> : children}
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
  src: PropTypes.string,
  alt: PropTypes.string,
};

AppIcon.defaultProps = {
  tag: 'span',
  color: 'black',
};

export default AppIcon;
