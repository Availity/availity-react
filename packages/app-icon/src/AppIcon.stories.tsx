import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';

import AppIcon, { AppIconProps } from './AppIcon';
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

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>App Icon</h5>
    <ArgsTable of={AppIcon} />
  </>
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
