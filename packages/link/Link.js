import React from 'react';
import PropTypes from 'prop-types';
import { isAbsoluteUrl } from '@availity/resolve-url';

// if absolute or loadApp is disabled, return url. otherwise loadappify the url
export const getUrl = (url = '', loadApp, absolute, target) => {
  if (absolute) return url;

  return target === '_blank' || loadApp
    ? `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`
    : url;
};

// takes href and transforms it so that we can compare hostnames and other properties
export const getLocation = href => {
  const location = document.createElement('a');
  location.href = href;
  return location;
};

export const setRel = (url, target, absolute) => {
  if (target === '_blank' && absolute) {
    const dest = getLocation(url);
    if (dest.hostname !== window.location.hostname) {
      // default rel when linking to external destinations for performance and security
      return 'noopener noreferrer';
    }
  }
  return undefined;
};

export const getTarget = target => {
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
};

const AvLink = React.forwardRef(
  (
    {
      tag: Tag,
      href,
      target: propsTarget,
      children,
      onClick,
      loadApp,
      ...props
    },
    ref
  ) => {
    let url;

    let linkProps = {};

    if (href) {
      const absolute = isAbsoluteUrl(href);
      const target = getTarget(propsTarget);
      url = getUrl(href, loadApp, absolute, target);
      linkProps = {
        target,
        href: url,
        rel: setRel(url, target, absolute),
      };
    }

    return (
      <Tag
        {...linkProps}
        onClick={event => onClick && onClick(event, url)}
        data-testid="av-link-tag"
        tabIndex={0}
        ref={ref}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

AvLink.defaultProps = {
  tag: 'a',
  loadApp: false,
};

AvLink.propTypes = {
  target: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  loadApp: PropTypes.bool,
  rel: PropTypes.string,
};

export default AvLink;
