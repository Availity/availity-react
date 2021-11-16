import React from 'react';
import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
  tag?: React.ElementType;
};

const WizardStepBadge = ({ tag: Tag = 'span', className, children, ...props }: Props): JSX.Element => (
  <Tag className={classNames(className, 'stepwizard-badge')} {...props}>
    {children}
  </Tag>
);

export default WizardStepBadge;
