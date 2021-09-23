import React from 'react';
import PropTypes from 'prop-types';

function AppIcon({ tag: Tag, color, size, src: image, alt, branded, className, children, ...props }) {
  const classname = [
    className,
    'app-icon',
    branded ? `app-icon-branded-${color}` : `app-icon-${color}`,
    size && `app-icon-${size}`,
    image && 'border-0',
  ]
    .filter((a) => a)
    .join(' ');

  return (
    <Tag {...props} className={classname}>
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
