import React from 'react';
import { Meta, Story } from '@storybook/react';
import TrainingLink from '@availity/training-link';
// import README from '@availity/training-link/README.md';

export default {
  title: 'Components/Training Link',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ link, name }) => <TrainingLink link={link} name={name} />;
Default.args = {
  name: 'Appeals',
  link: 'https://google.com',
};
Default.storyName = 'default';
