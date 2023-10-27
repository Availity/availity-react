/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import '@availity/date/styles.scss';

import { Label } from '.';
// import README from '../form/README.md';

export default {
  title: 'Form Components/Form/Form Label',
  component: Label,
  args: {
    required: false,
  },
};

type LabelStoryProps = {
  helpId: string;
  className: string;
  children: React.ReactNode;
} & FormStoryProps;

export const _Default: StoryObj<typeof Label> = {
  render: ({ required, helpId, className, children }) => (
    <Label required={required} helpId={helpId} className={className}>
      {children}
    </Label>
  ),
  args: {
    helpId: '',
    className: '',
    children: 'Label Text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label that handles required indicator and field help icon. Uses Reactstrap Label.',
      },
    },
  },
};
