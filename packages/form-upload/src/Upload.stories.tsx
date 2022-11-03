import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form } from '@availity/form';

import Upload, { FileList } from '.';

const file = (fileName: string) => ({
  id: fileName,
  file: {
    name: fileName,
  },
  onProgress: [],
  onSuccess: [],
  onError: [],
});

export default {
  title: 'Form Components/Upload',
} as Meta;

export const Default: Story = ({ showFileDrop }) => (
  <Form
    initialValues={{ upload: null }}
    onSubmit={() => {
      // noop
    }}
  >
    <Upload name="upload" clientId="123" customerId="123" bucketId="789" showFileDrop={showFileDrop} />
  </Form>
);

Default.args = {
  showFileDrop: true,
};

export const FileListStory: Story = ({ fileName1, fileName2 }) => {
  const files = [file(fileName1), file(fileName2)];
  return (
    <div className="py-3">
      <FileList files={files} />
    </div>
  );
};
FileListStory.args = {
  fileName1: 'testfile1.pdf',
  fileName2: 'testfile2.png',
};
FileListStory.storyName = 'file list';

Default.storyName = 'default';
