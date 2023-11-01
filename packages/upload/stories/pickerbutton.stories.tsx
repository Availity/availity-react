import React from 'react';
import { StoryObj } from '@storybook/react';
// import { button } from '@storybook/addon-knobs';
import mock from 'xhr-mock';

import { FilePickerBtn } from '..';
// import README from '../README.md';
// import MockUpload from '../tests/mockUpload';

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

const file = (fileName: string) => ({
  id: fileName,
  file: {
    name: fileName,
  },
  onProgress: [],
  onSuccess: [],
  onError: [],
});

// let instance;
/**
 * The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.
 */
export default {
  title: 'Components/Upload/PickerButton',
  component: FilePickerBtn,
  // decorators: [
  //   (story) => {
  //     instance = new MockUpload();
  //     return story();
  //   },
  // ],
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
