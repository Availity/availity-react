import React from 'react';
import classNames from 'classnames';

type Props = {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  clickable?: boolean;
  complete?: boolean;
  disabled?: boolean;
  href?: string;
  tag?: React.ElementType;
};

const WizardStep = ({
  tag,
  complete,
  active,
  disabled,
  clickable,
  href,
  children,
  className: classes,
  ...props
}: Props): JSX.Element => {
  const className = classNames(classes, 'stepwizard-step', {
    complete,
    active,
    disabled,
    'stepwizard-step-clickable': clickable,
  });

  const Tag = tag || (href ? 'a' : 'div');

  const tagProps = Tag === 'a' ? { className, href } : { className };

  return (
    <Tag {...props} {...tagProps}>
      {children}
    </Tag>
  );
};

export default WizardStep;
