import React from 'react';
import { StoryObj } from '@storybook/react';
import Progress from '.';
// import README from '../README.md';

export default {
  title: 'Components/Progress',
  component: Progress,
};

export const _Default: StoryObj<typeof Progress> = {
  render: ({ value, max, animated, striped, complete, color }) => (
    <div>
      <p>{Math.round((value / max) * 100)}% Complete</p>
      <Progress animated={animated} striped={striped} complete={complete} color={color} value={value} max={max} />
    </div>
  ),
  args: {
    value: 50,
    max: 100,
    animated: false,
    striped: false,
    complete: false,
    color: 'success',
  },
};
