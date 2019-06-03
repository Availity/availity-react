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
  color,
  ...rest
}) => (
  <Tag
    className={classNames(classes, 'progress', {
      'progress-complete': complete,
    })}
    data-testid="progress-outer"
    role="progressbar"
    aria-valuenow={width}
    aria-valuemin={0}
    aria-valuemax={100}
    {...rest}
  >
    <span
      className={classNames(
        'progress-bar',
        `bg-${color}`,
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
  color: 'success',
};

Progress.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  complete: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Progress;
