import React from 'react';
import PropTypes from 'prop-types';
import { isAbsoluteUrl } from '@availity/resolve-url';

// if absolute or loadApp is disabled, return url. otherwise loadappify the url
export const getUrl = (url = '', loadApp, absolute) => {
  if (absolute || !loadApp) return url;

  return `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`;
};

export const getTarget = (target) => {
  // should start with _, otherwise it is specifying a specific frame name
  // _blank = new tab/window, _self = same frame, _parent = parent frame (use for home page from modals), _top = document body, framename = specific frame
  if (target && !target.startsWith('_')) {
    // Thanos uses BODY
    // 'newBody' hard-coded in spaces -> should we keep this logic?
    if (target === 'BODY' || target === 'newBody') {
      return '_self';
    }
    if (target === 'TAB') {
      return '_blank';
    }
  }

  return target || '_self';
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
