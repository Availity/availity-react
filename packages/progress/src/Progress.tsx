import React from 'react';
import classNames from 'classnames';

const calcPercent = (value: string | number, max: string | number) => {
  let percent = 0;
  try {
    percent = (Number(value) / Number(max)) * 100;
  } catch {
    // noop
  }
  return percent;
};

type Props = {
  animated?: boolean;
  className?: string;
  color?: string;
  complete?: boolean;
  id?: string;
  max?: string | number;
  striped?: boolean;
  tag?: React.ElementType;
  value?: string | number;
};

const Progress = ({
  animated,
  className,
  color = 'success',
  complete,
  id,
  max = 100,
  striped,
  tag: Tag = 'div',
  value = 0,
  // TODO: look into removing this and officially accepting the props
  ...props
}: Props): JSX.Element => (
  <Tag
    className={classNames(className, 'progress', {
      'progress-complete': complete,
    })}
    data-testid="progress-outer"
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin="0"
    aria-valuemax={max}
    id={id}
    {...props}
  >
    <span
      className={classNames(
        'progress-bar',
        `bg-${color}`,
        { 'progress-bar-striped': striped },
        { 'progress-bar-animated': animated }
      )}
      style={{ width: `${calcPercent(value, max)}%` }}
      data-testid="progress-inner"
    />
  </Tag>
);

export default Progress;
