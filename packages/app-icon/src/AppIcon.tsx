import React from 'react';
import classNames from 'classnames';

export type AppIconProps = {
  alt?: string;
  branded?: boolean;
  children?: React.ReactNode;
  className?: string;
  color?: string;
  size?: string;
  src?: string;
  tag?: React.ElementType;
  title?: string;
};

function AppIcon({
  tag: Tag = 'span',
  color = 'black',
  size,
  src: image,
  alt,
  branded,
  className,
  children,
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
      {branded && <span className="caret" />}
    </Tag>
  );
}

export default AppIcon;
