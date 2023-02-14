import React from 'react';
import classNames from 'classnames';
import toNumber from 'lodash/toNumber';

export type ProgressProps = {
  /** The tag to render the progress bar as. Default: &lt;div&gt; . */
  tag?: React.ElementType;
  /** Triggers the "animated" style in the progress bar. */
  animated?: boolean;
  /** Triggers the "striped" style in the progress bar. */
  striped?: boolean;
  /** Triggers the "complete" style in the progress bar. When true, a checkmark appears at the end of the progress bar */
  complete?: boolean;
  /** The amount of the progress bar that should be filled (relative to the max) Default: 0. */
  value?: number | string;
  /** The maximum amount of the progress bar. Default: 100. */
  max?: number | string;
  className?: string;
  /** The color of the progress bar. Default: success. */
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
