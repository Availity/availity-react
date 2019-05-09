import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WizardStep = ({
  tag,
  link,
  complete,
  active,
  disabled,
  clickable,
  href,
  children,
  className: classes,
}) => {
  const className = classNames(
    classes,
    'stepwizard-step',
    { complete },
    { active },
    { disabled },
    { 'stepwizard-step-clickable': clickable }
  );

  const Tag = tag || (link ? 'a' : 'div');

  const tagProps = Tag === 'a' ? { className, href } : { className };
  return (
    <Tag data-testid="step-wizard-step" {...tagProps}>
      {children}
    </Tag>
  );
};

WizardStep.propTypes = {
  link: PropTypes.bool,
  complete: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  clickable: PropTypes.bool,
  href: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
};

export default WizardStep;
