import React from 'react';
import classNames from 'classnames';

const pointerStyles = { cursor: 'pointer' };

type Props = {
  name: string;
  size?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Icon = React.forwardRef(
  ({ name, size, color, onClick, className, children, ...rest }: Props, ref?: React.Ref<HTMLElement>) => (
    <i
      ref={ref}
      aria-hidden="true"
      className={classNames('icon', `icon-${name}`, size && `icon-${size}`, color && `text-${color}`, className)}
      onClick={onClick}
      style={onClick ? pointerStyles : undefined}
      {...rest}
    >
      helloooo
      {children}
    </i>
  )
);

export default Icon;
