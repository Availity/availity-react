import React from 'react';
import { StoryObj } from '@storybook/react';
// import { button } from '@storybook/addon-knobs';
import mock from 'xhr-mock';

import { FileList } from '..';

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
  title: 'Components/Upload',
  component: FileList,
  // decorators: [
  //   (story) => {
  //     instance = new MockUpload();
  //     return story();
  //   },
  // ],
};

type FileListStoryProps = {
  fileName1: string;
  fileName2: string;
};
export const _FileListStory: StoryObj<typeof FileList> = {
  render: ({ fileName1, fileName2 }) => {
    const files = [file(fileName1), file(fileName2)];
    return (
      <div className="py-3">
        <FileList files={files} />
      </div>
    );
  },
  args: {
    fileName1: 'testfile1.pdf',
    fileName2: 'testfile2.png',
  },
};
