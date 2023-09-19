import React from 'react';
import { Meta, Story } from '@storybook/react';
import TrainingLink, { TrainingLinkProps } from './TrainingLink';

export default {
  title: 'Components/Training Link',
  parameters: {
    docs: {
      description: {
        component: 'A component for allowing link out to training in the Header component',
      },
    },
  },
} as Meta;

export const Default: Story<TrainingLinkProps> = ({ link, name }) => <TrainingLink link={link} name={name} />;

Default.args = {
  name: 'Appeals',
  link: 'https://google.com',
};

Default.storyName = 'default';
