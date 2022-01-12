import React from 'react';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

type AppIconProps = {
  alt?: string;
  branded?: boolean;
  children?: ReactNode;
  className?: string;
  color?: string;
  size?: string;
  src?: string;
  tag?: ElementType;
} & HTMLAttributes<HTMLElement>;

function AppIcon({
  alt,
  branded,
  children,
  className,
  color = 'black',
  size,
  src: image,
  tag: Tag = 'span',
  ...props
}: AppIconProps): JSX.Element {
  const classes = classNames(className, 'app-icon', {
    [`app-icon-${color}`]: color && !branded,
    [`app-icon-branded-${color}`]: color && branded,
    [`app-icon-${size}`]: size,
    'border-0': image,
  });

  return (
    <Tag {...props} className={classes}>
      {image ? <img className="w-100 h-100 align-baseline" src={image} alt={alt} /> : children}
      {branded ? <span className="caret" aria-hidden="true" /> : null}
    </Tag>
  );
}

export default AppIcon;
