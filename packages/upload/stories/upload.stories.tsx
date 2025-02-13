import React from 'react';
import { StoryObj } from '@storybook/react';
// import { button } from '@storybook/addon-knobs';

import Upload from '..';
// import README from '../README.md';

/**
 * The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.
 */
export default {
  title: 'Components/Upload',
  component: Upload,
  args: {
    clientId: 'a',
    bucketId: 'b',
    customerId: 'c',
    allowedFileTypes: ['.jpg', '.jpeg', '.doc', '.docx', '.txt'],
    disabled: false,
    isCloud: true,
    max: 0,
    maxSize: 0,
    multiple: false,
  },
};

export const _Upload: StoryObj<typeof Upload> = {
  render: (args) => (
    <div className="py-3">
      <Upload {...args} />
    </div>
  ),
};

export const _RestrictFileTypes: StoryObj<typeof Upload> = {
  render: (args) => (
    <div className="py-3">
      <p>Allows you to define which file types are available to upload.</p>
      <p>Here we have jpg, jpeg, doc and docx available to be selected.</p>
      <Upload {...args} />
    </div>
  ),
  args: {
    allowedFileTypes: ['.jpg', '.jpeg', '.doc', '.docx'],
  },
};

export const _RestrictFileName: StoryObj<typeof Upload> = {
  render: (args) => (
    <div className="py-3">
      <p>Allows you to restrict characters are permissible in the filename of uploads.</p>
      <p>Here we will allow files with any letter, number or the characters _ and - in its name. (-_a-zA-Z0-9)</p>
      <Upload {...args} />
    </div>
  ),
  args: {
    allowedFileNameCharacters: '-_a-zA-Z0-9',
  },
};

// TODO: fix story that used knobs api
// export const ProgressBar: Story = ({ animated, striped, complete, color }) => {
//   button('+10%', () => instance.progress(10), 'Mock Actions');
//   button('Accept', () => instance.success(), 'Mock Actions');
//   button('Reject', () => instance.error('File upload rejected'), 'Mock Actions');
//   button('Require Password', () => instance.error('Encrypted files require a password', 'encrypted'), 'Mock Actions');
//   button('Reset', () => instance.reset(), 'Mock Actions');

//   return (
//     <div className="py-3">
//       <UploadProgressBar upload={instance} animated={animated} striped={striped} complete={complete} color={color} />
//     </div>
//   );
// };
// ProgressBar.args = {
//   animated: false,
//   striped: false,
//   complete: false,
//   color: 'success',
// };
// ProgressBar.storyName = 'progress bar';
