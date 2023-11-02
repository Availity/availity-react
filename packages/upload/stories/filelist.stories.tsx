import React from 'react';
import { StoryObj } from '@storybook/react';

import { FileList } from '..';

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
  title: 'Components/Upload/FileList',
  component: FileList,
};

// type FileListStoryProps = {
//   fileName1: string;
//   fileName2: string;
// };
export const _Default: StoryObj<typeof FileList> = {
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
