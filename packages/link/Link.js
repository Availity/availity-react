import React from 'react';
import PropTypes from 'prop-types';
import { isAbsoluteUrl } from '@availity/resolve-url';

// if absolute, return url. otherwise loadappify the url
export const getUrl = (url = '') => {
  const absolute = isAbsoluteUrl(url);
  if (absolute) return url;

  return `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`;
};

const AvLink = ({ tag: Tag, url, target, children, onClick, ...props }) => (
  <Tag
    href={getUrl(url)}
    target={target}
    onClick={event => onClick && onClick(event, getUrl(url))}
    data-testid="av-link-tag"
    {...props}
  >
    {children}
  </Tag>
);

AvLink.defaultProps = {
  tag: 'a',
};

AvLink.propTypes = {
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default AvLink;
