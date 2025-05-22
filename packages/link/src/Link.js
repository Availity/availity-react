import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isAbsoluteUrl } from '@availity/resolve-url';

import { getRel, getTarget, getUrl } from './util';

const linkStyles = { fontWeight: 'bold' };

const AvLink = ({ href, children, className, loadApp = true, onClick, tag: Tag = 'a', target, ...rest }) => {
  const absolute = isAbsoluteUrl(href);
  const url = getUrl(href, loadApp, absolute);
  const classnames = classNames('link', className);
  target = getTarget(target);
  const rel = getRel(url, target, absolute);

  const handleOnClick = (event) => {
    if (onClick) onClick(event, url);
  };

  return (
    <Tag
      href={url}
      className={classnames}
      data-testid="av-link-tag"
      onClick={handleOnClick}
      rel={rel}
      style={linkStyles}
      target={target}
      {...rest}
    >
      {children}
    </Tag>
  );
};

AvLink.propTypes = {
  /** The url of the page the link goes to. */
  href: PropTypes.string.isRequired,
  /** Children can be a react child or render pop. */
  children: PropTypes.node,
  /**  Additional classes that should be applied to Link.
      or Pass a string containing the class names as a prop. */
  className: PropTypes.string,
  /** When false, the url prop to AvLink is not formatted to leverage loadApp. */
  loadApp: PropTypes.bool,
  /** The tag to use in the link that gets rendered. Default: <a>. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Where to open the linked document. */
  target: PropTypes.string,
  /** Function that is called when the element is clicked. The first argument passed to onClick is the event. The second argument is the processed url. */
  onClick: PropTypes.func,
  /** The relationship of the linked URL as space-separated link types. */
  rel: PropTypes.string,
};

export default AvLink;
