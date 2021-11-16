import React from 'react';
import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
  styled?: boolean;
  tag?: React.ElementType;
};

const Disclaimer = ({ tag: Tag = 'div', className, styled = true, children, ...props }: Props): JSX.Element => (
  <Tag className={classNames(className, { disclaimer: styled, 'disclaimer-unstyled': !styled })} {...props}>
    {children}
  </Tag>
);

export default Disclaimer;
