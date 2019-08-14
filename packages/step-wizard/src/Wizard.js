import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Wizard = ({
  tag: Tag,
  bar,
  stacked,
  children,
  progress,
  className: classes,
  ...rest
}) => (
  <Tag
    className={classNames(
      classes,
      'stepwizard',
      { 'stepwizard-bar': bar },
      { 'stepwizard-stacked': stacked },
      { 'stepwizard-progress': progress }
    )}
    data-testid="step-wizard-container"
    {...rest}
  >
    <div className="stepwizard-row">{children}</div>
  </Tag>
);

Wizard.defaultProps = {
  tag: 'div',
};

Wizard.propTypes = {
  bar: PropTypes.bool,
  stacked: PropTypes.bool,
  progress: PropTypes.bool,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
};

export default Wizard;
