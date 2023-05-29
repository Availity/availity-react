import React, { ReactNode, ElementType } from 'react';
import classNames from 'classnames';

interface AgreementProps {
  /** Custom HTML tag. Can be a string representing an HTML tag or a React component */
  tag?: ElementType | string;
  /** Additional classes to apply to the Agreement */
  className?: string;
  /** The children to render within the Agreement */
  children?: ReactNode;
}

const Agreement: React.FC<AgreementProps> = ({ tag: Tag = 'div', className, children, ...rest }) => (
  <Tag data-testid="agreement" className={classNames(className, 'agreement')} {...rest}>
    {children}
  </Tag>
);

export default Agreement;
