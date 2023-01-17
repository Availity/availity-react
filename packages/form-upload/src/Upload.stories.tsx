import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form } from '@availity/form';

import Upload, { FileList, FilePicker, FilePickerBtn, UploadProgressBar } from '.';
import { ArgsTable } from '@storybook/addon-docs';
import { CustomInput } from 'reactstrap';

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
  parameters: {
    docs: {
      description: {
        component:
          'The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.',
      },
    },
  },
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
Default.storyName = 'default';

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
FileListStory.parameters = {
  docs: {
    description: {
      story:
        'The file list displays an upload status bar along with a delete button, allowing for removal of an uploaded file.',
    },
  },
};

export const FilePickerStory: Story = () => (
  <Form initialValues={{ myFile: undefined }} onSubmit={() => {}}>
    <FilePicker name="myFile" tag={CustomInput} />
  </Form>
);
FilePickerStory.args = {
  tag: 'Hello',
  name: 'File Picker',
  maxSize: 2,
};
FilePickerStory.storyName = 'file picker';
FilePickerStory.parameters = {
  docs: {
    description: {
      story:
        'The raw file picker which automatically resets the value of the input, allowing the same file to be selected multiple consecutive files.',
    },
  },
};

export const FilePickerBtnStory: Story = ({ name }) => (
  <Form initialValues={{ myFile: undefined }} onSubmit={() => {}}>
    <FilePickerBtn name={name} />
  </Form>
);
FilePickerBtnStory.storyName = 'file picker button';
FilePickerBtnStory.args = {
  name: 'myfFile',
};
FilePickerBtnStory.parameters = {
  docs: {
    description: {
      story: 'The raw file picker button that masks the file input with a button.',
    },
  },
};

export const UploadProgressBarStory: Story = ({ upload }) => <UploadProgressBar upload={upload} />;
UploadProgressBarStory.storyName = 'upload progress bar';
UploadProgressBarStory.args = {
  upload: file('testfile1.pdf'),
};
UploadProgressBarStory.parameters = {
  docs: {
    description: {
      story: 'The raw progress bar to be used when making your own.',
    },
  },
};

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Upload</h5>
    <ArgsTable of={Upload} />

    <h5>File List</h5>
    <ArgsTable of={FileList} />

    <h5>File Picker</h5>
    <ArgsTable of={FilePicker} />

    <h5>File Picker Button</h5>
    <ArgsTable of={FilePickerBtn} />

    <h5>Upload Progress Bar</h5>
    <ArgsTable of={UploadProgressBar} />
  </>
);
