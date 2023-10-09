import React from 'react';
import { Meta, Story } from '@storybook/react';

import Tooltip from './Tooltip';
// import README from "../README.md";

export default {
  title: 'Components/Tooltip',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Accessible tooltip for hovering over.',
      },
    },
  },
} as Meta;

export const Default: Story = () => (
  <div id="testId">
    <Tooltip target="tooltip">
      <span>This is a tooltip</span>
    </Tooltip>
    <span id="tooltip">hover me!</span>
  </div>
);
Default.storyName = 'default';
