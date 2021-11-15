import React from 'react';
import { Story, Meta } from '@storybook/react';

import AppIcon from '../src/AppIcon';
// import README from '../README.md';

export default {
  title: 'Components/AppIcon',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

const colors = ['black', 'blue', 'orange', 'green'];

export const Default: Story = ({ alt, branded, children, className, color, size, src }) => (
  <AppIcon size={size} color={color} branded={branded} className={className} src={src} alt={alt}>
    {children}
  </AppIcon>
);
Default.args = {
  children: 'AI',
  size: '',
  color: colors[0],
  className: '',
  branded: false,
  src: '',
  alt: '',
};
Default.argTypes = {
  size: {
    type: 'select',
    options: ['lg', 'xl'],
  },
  color: {
    type: 'select',
    options: colors,
  },
};
Default.storyName = 'default';
