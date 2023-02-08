import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Wizard = ({ tag: Tag, bar, stacked, children, progress, className: classes, ...rest }) => (
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
  /** Triggers the "bar" style in the stepwizard. * */
  bar: PropTypes.bool,
  /** Triggers the "stacked" style in the step wizard. If true, wizard steps will display vertically rather than horizontally. * */
  stacked: PropTypes.bool,
  /** Triggers the "progress" style in the step wizard. * */
  progress: PropTypes.bool,
  /** Children can be a react child. * */
  children: PropTypes.node,
  /** The actual name of the tag being generated. Defaults to 'div'* */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Additional classes that should be applied to agreement. * */
  className: PropTypes.string,
};

export default Wizard;
