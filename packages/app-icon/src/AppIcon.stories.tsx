import React from 'react';
import { StoryObj } from '@storybook/react';

import AppIcon from './AppIcon';
// import README from '../README.md';

export default {
  title: 'Components/AppIcon',
  component: AppIcon,
};

const colors = ['black', 'blue', 'orange', 'green'];

export const _AppIcon: StoryObj<typeof AppIcon> = {
  render: ({ alt, branded, children, className, color, size, src }) => (
    <AppIcon size={size} color={color} branded={branded} className={className} src={src} alt={alt}>
      {children}
    </AppIcon>
  ),
  args: {
    children: 'AI',
    size: '',
    color: colors[0],
    className: '',
    branded: false,
    src: '',
    alt: '',
  },
  argTypes: {
    size: {
      type: 'select',
      options: ['lg', 'xl'],
    },
    color: {
      type: 'select',
      options: colors,
    },
  },
  storyName: 'default',
};
