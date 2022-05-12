import React from 'react';
import classNames from 'classnames';
import toNumber from 'lodash/toNumber';

export type ProgressProps = {
  tag?: React.ElementType;
  animated?: boolean;
  striped?: boolean;
  complete?: boolean;
  value?: number | string;
  max?: number | string;
  className?: string;
  color?: string;
  children?: React.ReactNode; // TODO: check if this is right
};

const Progress = ({
  tag: Tag = 'div',
  animated,
  striped,
  complete,
  value = 0,
  max = 100,
  className: classes,
  color = 'success',
  ...rest
}: ProgressProps): JSX.Element => {
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

export default Progress;
