import React from 'react';
import { Meta } from '@storybook/react-vite';
import { Form } from '@availity/form';
import { CustomInput } from 'reactstrap';

import Upload, { FileList, FilePicker, FilePickerBtn, UploadProgressBar } from '.';
import { FilePickerBtnProps } from './FilePickerBtn';
import { UploadProgressBarProps } from './UploadProgressBar';
import { UploadProps } from './Upload';

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
  title: 'Deprecated/Upload',
  parameters: {
    docs: {
      description: {
        component:
          'The default export is an all-in-one solution which handles uploads, encrypted file password requests and file state management for you.',
      },
    },
  },
} as Meta;

export const Default = {
  render: ({
    allowedFileNameCharacters,
    allowedFileTypes,
    deliverOnSubmit,
    deliveryChannel,
    showFileDrop,
  }: UploadProps) => (
    <Form
      initialValues={{ upload: null }}
      onSubmit={() => {
        // noop
      }}
    >
      <Upload
        name="upload"
        clientId="123"
        customerId="123"
        bucketId="789"
        allowedFileNameCharacters={allowedFileNameCharacters}
        allowedFileTypes={allowedFileTypes}
        showFileDrop={showFileDrop}
        deliveryChannel={deliveryChannel}
        deliverFileOnSubmit={deliverOnSubmit}
        fileDeliveryMetadata={{
          payerId: 'AvailityTest',
        }}
      />
    </Form>
  ),
  args: {
    allowedFileNameCharacters: '',
    deliverOnSubmit: false,
    deliveryChannel: 'test',
    showFileDrop: true,
  },
  name: 'default',
};

export const FileListStory = {
  render: ({ fileName1, fileName2 }: { fileName1: string; fileName2: string }) => {
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
  name: 'file list',
  parameters: {
    docs: {
      description: {
        story:
          'The file list displays an upload status bar along with a delete button, allowing for removal of an uploaded file.',
      },
    },
  },
};

export const FilePickerStory = {
  render: () => (
    <Form initialValues={{ myFile: undefined }} onSubmit={() => {}}>
      <FilePicker name="myFile" tag={CustomInput} />
    </Form>
  ),
  args: {
    tag: 'Hello',
    name: 'File Picker',
    maxSize: 2,
  },
  name: 'file picker',
  parameters: {
    docs: {
      description: {
        story:
          'The raw file picker which automatically resets the value of the input, allowing the same file to be selected multiple consecutive files.',
      },
    },
  },
};

export const FilePickerBtnStory = {
  render: ({ name }: FilePickerBtnProps) => (
    <Form initialValues={{ myFile: undefined }} onSubmit={() => {}}>
      <FilePickerBtn name={name} />
    </Form>
  ),
  name: 'file picker button',
  args: {
    name: 'myfFile',
  },
  parameters: {
    docs: {
      description: {
        story: 'The raw file picker button that masks the file input with a button.',
      },
    },
  },
};

export const UploadProgressBarStory = {
  render: ({ upload }: UploadProgressBarProps) => <UploadProgressBar upload={upload} />,
  name: 'upload progress bar',
  args: {
    upload: file('testfile1.pdf'),
  },
  parameters: {
    docs: {
      description: {
        story: 'The raw progress bar to be used when making your own.',
      },
    },
  },
};
