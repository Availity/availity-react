import React from 'react';
import classNames from 'classnames';

type Props = {
  alt?: string;
  branded?: boolean;
  children?: React.ReactNode;
  className?: string;
  color?: string;
  size?: string;
  src?: string;
  tag?: React.ElementType;
};

const AppIcon = ({
  alt,
  branded,
  children,
  className,
  color = 'black',
  size,
  src: image,
  tag: Tag = 'span',
  // TODO: look into removing this and officially accepting the props
  ...props
}: Props): JSX.Element => {
  const classes = classNames(className, 'app-icon', {
    [`app-icon-${color}`]: color && !branded,
    [`app-icon-branded-${color}`]: color && branded,
    [`app-icon-${size}`]: size,
    'border-0': image,
  });

  return (
    <Tag {...props} className={classes}>
      {image ? <img className="w-100 h-100 align-baseline" src={image} alt={alt} /> : children}
      {branded ? <span className="caret" /> : null}
    </Tag>
  );
};

export default AppIcon;
