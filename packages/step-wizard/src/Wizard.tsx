import React from 'react';
import classNames from 'classnames';

type Props = {
  bar?: boolean;
  children?: React.ReactNode;
  className?: string;
  progress?: boolean;
  stacked?: boolean;
  tag?: React.ElementType;
};

const Wizard = ({ tag: Tag = 'div', bar, stacked, children, progress, className, ...props }: Props): JSX.Element => (
  <Tag
    className={classNames(className, 'stepwizard', {
      'stepwizard-bar': bar,
      'stepwizard-stacked': stacked,
      'stepwizard-progress': progress,
    })}
    {...props}
  >
    <div className="stepwizard-row">{children}</div>
  </Tag>
);

export default Wizard;
