import React from 'react';
import { Story, Meta } from '@storybook/react';

import Tooltip from './FavoritesTooltip';
// import README from '../README.md';

export default {
  title: 'Components/FavoritesTooltip',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = () => (
  <div
    style={{
      width: '20rem',
      height: '20rem',
      overflow: 'auto',
      backgroundColor: 'gainsboro',
    }}
  >
    <div
      style={{
        width: '40rem',
        height: '40rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tooltip content="Hello world">boo</Tooltip>
    </div>
  </div>
);

Default.storyName = 'default';
