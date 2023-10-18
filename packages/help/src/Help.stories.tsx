import React from 'react';
import { StoryObj } from '@storybook/react';

import HelpProvider, { FieldHelpIcon, Help } from '.';
import { FieldHelpIconProps, HelpProps } from './Help';
// import README from "../README.md";

/**
 * # Help Wrapper for Oxygen Learning Docs on the Portal (This component will only work in the Availity Portal).
 */
export default {
  title: 'Components/Help',
  component: Help,
};

export const _Help: StoryObj<HelpProps> = {
  render: ({ type, id }) => (
    <div id="testId">
      <HelpProvider>
        <Help type={type} id={id}>
          Some Content You May need documentation for.
        </Help>
      </HelpProvider>
    </div>
  ),
  args: {
    type: 'provider',
    id: '1234-5678-9101-1213',
  },
};

export const _FieldHelp: StoryObj<FieldHelpIconProps> = {
  render: ({ id, labelId }) => (
    <div id="testId">
      Select A Provider <FieldHelpIcon id={id} labelId={labelId} />
    </div>
  ),
  args: {
    id: '1234-5678-910',
    labelId: 'testId',
  },
};

export const hidden_FieldHelpIcon = (props: FieldHelpIconProps) => <FieldHelpIcon {...props} />;
