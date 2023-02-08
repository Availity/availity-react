import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WizardStepBadge = ({ tag: Tag, className: classes, children, ...rest }) => (
  <Tag className={classNames(classes, 'stepwizard-badge')} {...rest}>
    {children}
  </Tag>
);

WizardStepBadge.defaultProps = {
  tag: 'span',
};

WizardStepBadge.propTypes = {
  /** Additional classes that should be applied to agreement. * */
  className: PropTypes.string,
  /** Children can be a react child. * */
  children: PropTypes.node,
  /** The actual name of the tag being generated. Defaults to 'a' or 'div'. * */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default WizardStepBadge;
