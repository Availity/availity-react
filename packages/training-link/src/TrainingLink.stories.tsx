import React from 'react';
import { StoryObj } from '@storybook/react-vite';
import TrainingLink from './TrainingLink';

export default {
  title: 'Deprecated/Training Link',
  parameters: {
    docs: {
      description: {
        component: 'A component for allowing link out to training in the Header component',
      },
    },
  },
  component: TrainingLink,
};

export const _Default: StoryObj<typeof TrainingLink> = {
  render: ({ link, name }) => <TrainingLink link={link} name={name} />,
  args: {
    name: 'Appeals',
    link: 'https://google.com',
  },
};
