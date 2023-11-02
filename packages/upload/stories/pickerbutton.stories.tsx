import React from 'react';
import { StoryObj } from '@storybook/react';
// import { button } from '@storybook/addon-knobs';
import mock from 'xhr-mock';

import { FilePickerBtn } from '..';
// import README from '../README.md';

// let instance;
/**
 * The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.
 */
export default {
  title: 'Components/Upload/PickerButton',
  component: FilePickerBtn,
};

export const _Default: StoryObj<typeof FilePickerBtn> = {
  render: ({ allowedFileTypes, disabled, maxSize }) => (
    <div className="py-3">
      <p>
        This component does not do much out-of-the-box, it is mostly just a button that triggers a file input which
        ensures the value gets reset after a file is chosen so that the user can choose the same file again.
      </p>
      <FilePickerBtn allowedFileTypes={allowedFileTypes} maxSize={maxSize} disabled={disabled} />
    </div>
  ),
  args: {
    allowedFileTypes: [],
    disabled: false,
    maxSize: 0,
  },
};
