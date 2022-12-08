import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import TrainingLink, { TrainingLinkProps } from './TrainingLink';

export default {
  title: 'Components/Training Link',
  parameters: {
    docs: {
      description: {
        component: 'Component for allowing link out to training in the Header component',
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

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Avatar</h5>
    <ArgsTable of={TrainingLink} />
  </>
);
