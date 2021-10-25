import React from 'react';
import { Story, Meta } from '@storybook/react';
import AppIcon from '@availity/app-icon';
// import README from '@availity/app-icon/README.md';

export default {
  title: 'Components/AppIcon',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ size, color, branded, className, src, alt, children }) => (
  <AppIcon size={size} color={color} branded={branded} className={className} src={src} alt={alt}>
    {children}
  </AppIcon>
);
Default.args = {
  children: 'AI',
  size: '',
  color: 'black',
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
    options: ['black', 'blue', 'orange', 'green'],
  },
};
Default.storyName = 'default';
