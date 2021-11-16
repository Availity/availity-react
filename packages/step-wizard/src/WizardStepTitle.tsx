import React from 'react';
import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
  tag?: React.ElementType;
};

const WizardStepTitle = ({ tag: Tag = 'span', className, children, ...props }: Props): JSX.Element => (
  <Tag className={classNames(className, 'stepwizard-title')} {...props}>
    {children}
  </Tag>
);

export default WizardStepTitle;
