import React from 'react';
import classNames from 'classnames';
import { isAbsoluteUrl } from '@availity/resolve-url';

// if absolute or loadApp is disabled, return url. otherwise loadappify the url
export const getUrl = (url = '', loadApp: boolean, absolute: boolean): string => {
  if (absolute || !loadApp) return url;

  return `/public/apps/home/#!/loadApp?appUrl=${encodeURIComponent(url)}`;
};

export const getTarget = (target?: string | React.HTMLAttributeAnchorTarget): string => {
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
const getLocation = (href: string) => {
  const location = document.createElement('a');
  location.href = href;
  return location;
};

const setRel = (url: string, target: string | React.HTMLAttributeAnchorTarget, absolute: boolean) => {
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

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
  id?: string;
  loadApp?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLAnchorElement>, url: string) => void;
  rel?: string;
  tag?: React.ElementType;
  target?: string | React.HTMLAttributeAnchorTarget;
};

const AvLink = ({
  children,
  className,
  href,
  id,
  loadApp = true,
  onClick,
  rel,
  tag: Tag = 'a',
  target,
  // TODO: look into removing this and officially accepting the props
  ...props
}: Props): JSX.Element => {
  const absolute = isAbsoluteUrl(href);
  const url = getUrl(href, loadApp, absolute);
  const classnames = classNames('link', className);

  target = getTarget(target);
  rel = rel || setRel(url, target, absolute);

  const handleClick = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event, url);
    }
  };

  return (
    <Tag
      data-testid="av-link-tag"
      id={id}
      href={url}
      target={target}
      style={linkStyles}
      className={classnames}
      onClick={handleClick}
      rel={rel}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default AvLink;
