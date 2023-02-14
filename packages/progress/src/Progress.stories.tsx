import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import Progress from '.';
// import README from '../README.md';

export default {
  title: 'Components/Progress',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ value, max, animated, striped, complete, color }) => (
  <div>
    <p>{Math.round((value / max) * 100)}% Complete</p>
    <Progress animated={animated} striped={striped} complete={complete} color={color} value={value} max={max} />
  </div>
);
Default.args = {
  value: 50,
  max: 100,
  animated: false,
  striped: false,
  complete: false,
  color: 'success',
};
Default.storyName = 'default';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Progress</h5>
    <ArgsTable of={Progress} />
  </>
);
