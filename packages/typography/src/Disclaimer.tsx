import React, { ReactNode, ElementType } from 'react';
import classNames from 'classnames';

interface DisclaimerProps {
  /** Custom HTML tag. Can be a string representing an HTML tag or a React component */
  tag?: ElementType;
  /** Additional classes to apply to the Disclaimer */
  className?: string;
  /** Whether to display a vertical bar to the left of the disclaimer. Default is true */
  styled?: boolean;
  /** The children to render within the Disclaimer */
  children?: ReactNode;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ tag: Tag = 'div', className, styled = true, children, ...rest }) => (
  <Tag
    data-testid="disclaimer"
    className={classNames(className, { disclaimer: styled }, { 'disclaimer-unstyled': !styled })}
    {...rest}
  >
    {children}
  </Tag>
);

export default Disclaimer;
