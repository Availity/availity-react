import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WizardStepBadge = ({
  tag: Tag,
  className: classes,
  children,
  ...rest
}) => (
  <Tag className={classNames(classes, 'stepwizard-badge')} {...rest}>
    {children}
  </Tag>
);

WizardStepBadge.defaultProps = {
  tag: 'span',
};

WizardStepBadge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default WizardStepBadge;
