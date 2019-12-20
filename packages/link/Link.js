import React from 'react';
import PropTypes from 'prop-types';
import { isAbsoluteUrl } from '@availity/resolve-url';

// if absolute or loadApp is disabled, return url. otherwise loadappify the url
export const getUrl = (url = '', loadApp, absolute) => {
  if (absolute || !loadApp) return url;

  return `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`;
};

// takes href and transforms it so that we can compare hostnames and other properties
const getLocation = href => {
  const location = document.createElement('a');
  location.href = href;
  return location;
};

const AvLink = ({
  tag: Tag,
  href,
  target,
  children,
  onClick,
  loadApp,
  rel,
  ...props
}) => {
  const absolute = isAbsoluteUrl(href);
  const url = getUrl(href, loadApp, absolute);

  // eslint-disable-next-line no-cond-assign
  if ((target = '_blank') && !rel && absolute) {
    const dest = getLocation(url);
    if (dest.hostname !== window.location.hostname) {
      // default rel when linking to external destinations for performance and security
      rel = 'noopener noreferrer';
    }
  }

  return (
    <Tag
      href={url}
      target={target}
      onClick={event => onClick && onClick(event, url)}
      data-testid="av-link-tag"
      rel={rel}
      {...props}
    >
      {children}
    </Tag>
  );
};

AvLink.defaultProps = {
  tag: 'a',
  loadApp: true,
};

AvLink.propTypes = {
  target: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  loadApp: PropTypes.bool,
  rel: PropTypes.string,
};

export default AvLink;
