import React from 'react';
import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
  tag?: React.ElementType;
};

const Agreement = ({ tag: Tag = 'div', className, children, ...props }: Props): JSX.Element => (
  <Tag className={classNames(className, 'agreement')} {...props}>
    {children}
  </Tag>
);

export default Agreement;
