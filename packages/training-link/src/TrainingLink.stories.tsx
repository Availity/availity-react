import React from 'react';
import { Meta, Story } from '@storybook/react';

import TrainingLink, { TrainingLinkProps } from './TrainingLink';
// import README from '../../README.md';

export default {
  title: 'Components/Training Link',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story<TrainingLinkProps> = ({ link, name }) => <TrainingLink link={link} name={name} />;

Default.args = {
  name: 'Appeals',
  link: 'https://google.com',
};

Default.storyName = 'default';
