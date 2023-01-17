import React from 'react';
import { Meta, Story } from '@storybook/react';

import HelpProvider, { FieldHelpIcon, Help } from '.';
import { ArgsTable } from '@storybook/addon-docs';
// import README from "../README.md";

export default {
  title: 'Components/Help',
  parameters: {
    docs: {
      // page: README,
      description: {
        component:
          'Help Wrapper for Oxygen Learning Docs on the Portal (This component will only work in the Availity Portal).',
      },
    },
  },
} as Meta;

export const Default: Story = () => (
  <div id="testId">
    <HelpProvider>
      <Help type="provider" id="1234-5678-9101-1213">
        Some Content You May need documentation for.
      </Help>
    </HelpProvider>
  </div>
);
Default.storyName = 'default';

export const Field: Story = () => (
  <div id="testId">
    Select A Provider <FieldHelpIcon id="1234-5678-910" labelId="testId" />
  </div>
);
Field.storyName = 'field';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Page Level Help</h5>
    <ArgsTable of={Help} />

    <h5>Field Level Help</h5>
    <ArgsTable of={FieldHelpIcon} />
  </>
);
