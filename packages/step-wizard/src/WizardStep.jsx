import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WizardStep = ({ tag, complete, active, disabled, clickable, href, children, className: classes, ...rest }) => {
  const className = classNames(
    classes,
    'stepwizard-step',
    { complete },
    { active },
    { disabled },
    { 'stepwizard-step-clickable': clickable }
  );

  const Tag = tag || (href ? 'a' : 'div');

  const tagProps = Tag === 'a' ? { className, href } : { className };

  return (
    <Tag data-testid="step-wizard-step" {...rest} {...tagProps}>
      {children}
    </Tag>
  );
};

WizardStep.propTypes = {
  /** Triggers the "complete" style in the step. * */
  complete: PropTypes.bool,
  /** Triggers the "active" style in the step. * */
  active: PropTypes.bool,
  /** Triggers the "disabled" style in the step. * */
  disabled: PropTypes.bool,
  /** Triggers the "clickable" style in the step. * */
  clickable: PropTypes.bool,
  /** Specifies the URL of the page the link goes to.
   * When provided, an anchor tag will be rendered for the step. * */
  href: PropTypes.string,
  /** Children can be a react child. * */
  children: PropTypes.node,
  /** The actual name of the tag being generated. Defaults to 'a' or 'div'. * */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Additional classes that should be applied to agreement. * */
  className: PropTypes.string,
};

export default WizardStep;
