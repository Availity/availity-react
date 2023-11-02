import React from 'react';
import { StoryObj } from '@storybook/react';
// import { button } from '@storybook/addon-knobs';
import mock from 'xhr-mock';

import { FilePicker } from '..';
// import README from '../README.md';

const log = window.console.log.bind(console);

/**
 * The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.
 */
export default {
  title: 'Components/Upload/FilePicker',
  component: FilePicker,
};

export const _Default: StoryObj<typeof FilePicker> = {
  render: ({ allowedFileTypes, maxSize }) => (
    <div className="py-3">
      <p>
        This component does not do much out-of-the-box, it mostly just ensures the value gets reset after a file is
        chosen so that the user can chose the same file again.
      </p>
      <FilePicker onChange={log} allowedFileTypes={allowedFileTypes} maxSize={maxSize} />
    </div>
  ),
  args: {
    allowedFileTypes: [],
    maxSize: 0,
  },
};
