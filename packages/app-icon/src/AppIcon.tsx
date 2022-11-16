import React from 'react';
import classNames from 'classnames';

export type AppIconProps = {
  /** For src prop. the alt property for your image source is not found or is loading. */
  alt?: string;
  /** Triggers "branded" styles. */
  branded?: boolean;
  /**  */
  children?: React.ReactNode;
  /**  */
  className?: string;
  /** Potential values: "black", "blue", "green", "orange", "red". */
  color?: string;
  /** Potential values: "lg", "xl". */
  size?: string;
  /** If image source is provided, it will render this instead of children. */
  src?: string;
  /**  */
  tag?: React.ElementType;
  /**  */
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
