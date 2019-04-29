import React from 'react';
import PropTypes from 'prop-types';
import { isAbsoluteUrl } from '@availity/resolve-url';

// if absolute, return url. otherwise loadappify the url
export const getUrl = (url = '') => {
  const absolute = isAbsoluteUrl(url);
  if (absolute) return url;

  return `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`;
};

const AvLink = ({ tag: Tag, url, target, children, ...props }) => (
  <Tag href={getUrl(url)} target={target} data-testid="av-link-tag" {...props}>
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
};

export default AvLink;
