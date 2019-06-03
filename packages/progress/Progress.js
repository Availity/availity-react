import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Progress = ({
  tag: Tag,
  animated,
  striped,
  complete,
  width,
  className: classes,
  ...rest
}) => (
  <Tag
    className={classNames(classes, 'progress', {
      'progress-complete': complete,
    })}
    data-testid="progress-outer"
    {...rest}
  >
    <span
      className={classNames(
        'progress-bar',
        'bg-success',
        { 'progress-bar-striped': striped },
        { 'progress-bar-animated': animated }
      )}
      style={{ width: `${width}%` }}
      data-testid="progress-inner"
    />
  </Tag>
);

Progress.defaultProps = {
  tag: 'div',
  width: 0,
};

Progress.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  complete: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default Progress;
