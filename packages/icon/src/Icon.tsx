import React from 'react';
import classNames from 'classnames';

const pointerStyles = { cursor: 'pointer' };

export type IconProps = {
  /** The name of the icon.  <a href={http://availity.github.io/availity-uikit/v3/icons}>Icon List</a>  */
  name: string;
  /** The text color of the icon. Uses Availity UI Kit variants.*/
  color?: string;
  /** The size of the icon. Potential values: "lg", "xl", "2x", "3x", "4x", "5x" */
  size?: string;
  /** hover is either true or false */
  hover?: boolean;
  /** Children can be a react child or render pop. */
  children?: React.ReactNode;
  /** See: <a href={https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute}>aria-label.</a> Default: name */
  arialabel?: string;
} & React.HTMLAttributes<HTMLElement>;

const Icon = React.forwardRef(
  ({ name, size, color, onClick, className, children, ...rest }: IconProps, ref?: React.Ref<HTMLElement>) => (
    <i
      ref={ref}
      aria-hidden="true"
      className={classNames('icon', `icon-${name}`, size && `icon-${size}`, color && `text-${color}`, className)}
      onClick={onClick}
      style={onClick ? pointerStyles : undefined}
      {...rest}
    >
      {children}
    </i>
  )
);

export default Icon;
