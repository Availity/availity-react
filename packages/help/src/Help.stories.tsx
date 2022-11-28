import React from 'react';
import { Meta, Story } from '@storybook/react';

import { FieldHelpIcon } from '.';
import { ArgsTable } from '@storybook/addon-docs';
// import README from "../README.md";

export default {
  title: 'Components/Help',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Help Wrapper for Oxygen Learning Docs on the Portal.',
      },
    },
  },
} as Meta;

export const Default: Story = () => (
  <div id="testId">
    Select A Provider <FieldHelpIcon id="1234-5678-910" labelId="testId" />
  </div>
);
Default.storyName = 'default';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Help</h5>
    <ArgsTable of={FieldHelpIcon} />
  </>
);
