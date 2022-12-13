import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

const linkStyles = { fontWeight: 'bold' };

const AvLink = ({ tag: Tag, href, target, children, onClick, loadApp, className, ...props }) => {
  const absolute = isAbsoluteUrl(href);
  const url = getUrl(href, loadApp, absolute);
  const classnames = classNames('link', className);
  target = getTarget(target);

  return (
    <Tag
      href={url}
      target={target}
      style={linkStyles}
      className={classnames}
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
  /** Where to open the linked document. */
  target: PropTypes.string,
  /** The tag to use in the link that gets rendered. Default: <a>. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Children can be a react child or render pop. */
  children: PropTypes.node,
  /** The url of the page the link goes to. */
  href: PropTypes.string.isRequired,
  /** Function to run onClick of the link. The first argument passed to onClick is the event. The second argument is the processed url. */
  onClick: PropTypes.func,
  /** When false, the url prop to AvLink is not formatted to leverage loadApp. */
  loadApp: PropTypes.bool,
  /**  Additional classes that should be applied to Link.
      or Pass a string containing the class names as a prop. */
  className: PropTypes.string,
  rel: PropTypes.string,
};

export default AvLink;
