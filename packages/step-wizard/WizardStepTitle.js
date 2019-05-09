import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WizardStepTitle = ({ tag: Tag, className: classes, children }) => (
  <Tag className={classNames(classes, 'stepwizard-title')}>{children}</Tag>
);

WizardStepTitle.defaultProps = {
  tag: 'span',
};

WizardStepTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default WizardStepTitle;
