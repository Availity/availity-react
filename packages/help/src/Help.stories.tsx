import React from 'react';
import { Meta, Story } from '@storybook/react';

import { FieldHelpIcon } from '.';
// import README from "../README.md";

export default {
  title: 'Components/Help',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = () => (
  <div id="testId">
    Select A Provider <FieldHelpIcon id="1234-5678-910" labelId="testId" />
  </div>
);
Default.storyName = 'default';
