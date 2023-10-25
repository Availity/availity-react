import React from 'react';
import { StoryObj } from '@storybook/react';

import Tooltip from './Tooltip';
// import README from "../README.md";

/**
 * Accessible tooltip for hovering over.
 */
export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export const _Tooltip: StoryObj = {
  render: () => (
    <div id="testId">
      <Tooltip target="tooltip">
        <span>This is a tooltip</span>
      </Tooltip>
      <span id="tooltip">hover me!</span>
    </div>
  ),
};
