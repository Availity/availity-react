import React from 'react';
import { Meta, Story } from '@storybook/react';
// import { button } from '@storybook/addon-knobs';
import mock from 'xhr-mock';

import Upload, { FilePicker, FilePickerBtn } from '..';
// import README from '../README.md';
import MockUpload from '../tests/mockUpload';

const log = window.console.log.bind(console);
mock.post(/\/ms\/api\/availity\/internal\/core\/vault\/upload\/v1\/resumable\/[^/]\//, (req, res) =>
  res
    .status(201)
    .headers({
      'tus-resumable': '1.0.0',
      'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
      'transfer-encoding': 'chunked',
      location: '4611142db7c049bbbe37376583a3f46b',
    })
    .body('')
);
mock.patch(/\/ms\/api\/availity\/internal\/core\/vault\/upload\/v1\/resumable\/[^/]\/[^/]/, (req, res) =>
  res
    .status(204)
    .headers({
      'tus-resumable': '1.0.0',
      'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
      'transfer-encoding': 'chunked',
      'AV-Scan-Result': 'accepted',
      'Upload-Result': 'accepted',
      'Upload-Length': req.body().length,
      'Upload-Offset': req.header('upload-offset') + req.body().size,
      references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
    })
    .body('')
);
mock.use('HEAD', /\/ms\/api\/availity\/internal\/core\/vault\/upload\/v1\/resumable\/[^/]\/[^/]/, (req, res) =>
  res
    .status(200)
    .headers({
      'tus-resumable': '1.0.0',
      'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
      'transfer-encoding': 'chunked',
      'AV-Scan-Result': 'accepted',
      'Upload-Result': 'accepted',
      'Upload-Length': '596852',
      'Upload-Offset': '596852',
      references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
    })
    .body('')
);
// mock.use(proxy);

// let instance;
export default {
  title: 'Components/Upload',
  decorators: [
    (story) => {
      instance = new MockUpload();
      return story();
    },
  ],
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ allowedFileTypes, disabled, max, maxSize, multiple }) => (
  <div className="py-3">
    <Upload
      clientId="a"
      bucketId="b"
      customerId="c"
      multiple={multiple}
      disabled={disabled}
      max={max}
      allowedFileTypes={allowedFileTypes}
      maxSize={maxSize}
    />
  </div>
);
Default.args = {
  allowedFileTypes: ['.jpg', '.jpeg', '.doc', '.docx'],
  disabled: false,
  max: 0,
  maxSize: 0,
  multiple: false,
};
Default.storyName = 'default';

export const PickerButton: Story = ({ allowedFileTypes, disabled, maxSize }) => (
  <div className="py-3">
    <p>
      This component does not do much out-of-the-box, it is mostly just a button that triggers a file input which
      ensures the value gets reset after a file is chosen so that the user can choose the same file again.
    </p>
    <FilePickerBtn allowedFileTypes={allowedFileTypes} maxSize={maxSize} disabled={disabled} />
  </div>
);
PickerButton.args = {
  allowedFileTypes: [],
  disabled: false,
  maxSize: 0,
};
PickerButton.storyName = 'picker button';

export const PickerField: Story = ({ allowedFileTypes, maxSize }) => (
  <div className="py-3">
    <p>
      This component does not do much out-of-the-box, it mostly just ensures the value gets reset after a file is chosen
      so that the user can chose the same file again.
    </p>
    <FilePicker onChange={log} allowedFileTypes={allowedFileTypes} maxSize={maxSize} />
  </div>
);
PickerField.args = {
  allowedFileTypes: [],
  maxSize: 0,
};
PickerField.storyName = 'picker field';

export const RestrictFileTypes: Story = ({ allowedFileTypes, disabled, max, maxSize, multiple }) => (
  <div className="py-3">
    <p>Allows you to define which file types are available to upload.</p>
    <p>Here we have jpg, jpeg, doc and docx available to be selected.</p>
    <Upload
      clientId="a"
      bucketId="b"
      customerId="c"
      multiple={multiple}
      disabled={disabled}
      max={max}
      allowedFileTypes={allowedFileTypes}
      maxSize={maxSize}
    />
  </div>
);
RestrictFileTypes.args = {
  allowedFileTypes: ['.jpg', '.jpeg', '.doc', '.docx'],
  disabled: false,
  max: 0,
  maxSize: 0,
  multiple: false,
};
RestrictFileTypes.storyName = 'restrict file types';

export const RestrictFileName: Story = ({ disabled, regex }) => (
  <div className="py-3">
    <p>Allows you to restrict characters are permissible in the filename of uploads.</p>
    <p>Here we will allow files with any letter, number or the characters _ and - in its name. (-_a-zA-Z0-9)</p>
    <Upload clientId="a" bucketId="b" customerId="c" allowedFileNameCharacters={regex} disabled={disabled} />
  </div>
);
RestrictFileName.args = {
  disabled: false,
  regex: '-_a-zA-z0-9',
};
RestrictFileName.storyName = 'restrict file name';

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
