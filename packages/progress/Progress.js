import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import toNumber from 'lodash.tonumber';

const Progress = ({
  tag: Tag,
  animated,
  striped,
  complete,
  value,
  max,
  className: classes,
  color,
  ...rest
}) => {
  const percent = (toNumber(value) / toNumber(max)) * 100;
  return (
    <Tag
      className={classNames(classes, 'progress', {
        'progress-complete': complete,
      })}
      data-testid="progress-outer"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax={max}
      {...rest}
    >
      <span
        className={classNames(
          'progress-bar',
          `bg-${color}`,
          { 'progress-bar-striped': striped },
          { 'progress-bar-animated': animated }
        )}
        style={{ width: `${percent}%` }}
        data-testid="progress-inner"
      />
    </Tag>
  );
};

Progress.defaultProps = {
  tag: 'div',
  value: 0,
  max: 100,
  color: 'success',
};

Progress.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  complete: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Progress;
