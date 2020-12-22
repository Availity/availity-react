import React from 'react';
import PropTypes from 'prop-types';
import { isAbsoluteUrl } from '@availity/resolve-url';

// if absolute or loadApp is disabled, return url. otherwise loadappify the url
export const getUrl = (url = '', loadApp, absolute) => {
  if (absolute || !loadApp) return url;

  return `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`;
};

export const getTarget = (target) => {
  if (
    !target ||
    target === 'BODY' || // Thanos
    target === 'newBody' || // hardcoded in spaces ( Bad practice )
    target === '_self' // Actual way of doing it
  ) {
    return '_self';
  }

  if (target === 'TAB' || target === '_blank' || target === '_top') {
    return '_blank';
  }
  return null;
};

// takes href and transforms it so that we can compare hostnames and other properties
const getLocation = (href) => {
  const location = document.createElement('a');
  location.href = href;
  return location;
};

const setRel = (url, target, absolute) => {
  if (target === '_blank' && absolute) {
    const dest = getLocation(url);
    if (dest.hostname !== window.location.hostname) {
      // default rel when linking to external destinations for performance and security
      return 'noopener noreferrer';
    }
  }
  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};

const AvLink = ({
  tag: Tag,
  href,
  target,
  children,
  onClick,
  loadApp,
  ...props
}) => {
  const absolute = isAbsoluteUrl(href);
  const url = getUrl(href, loadApp, absolute);
  target = getTarget(target);

  return (
    <Tag
      href={url}
      target={target}
      onClick={(event) => onClick && onClick(event, url)}
      data-testid="av-link-tag"
      rel={setRel(url, target, absolute)}
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
