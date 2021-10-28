/* eslint-disable new-cap */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '@availity/form';

let Upload;

const renderUpload = (formProps, uploadProps) =>
  render(
    <Form {...formProps}>
      <Upload {...uploadProps} />
    </Form>
  );

describe('Upload', () => {
  beforeEach(() => {
    // This is useful to isolate specific modules for every test so that local module state doesn't conflict between tests.
    // Makes lazy loading react-dropzone consistent instead of relying on only one test to set it up
    // eslint-disable-next-line no-return-assign
    jest.isolateModules(() => (Upload = require('../src/Upload').default));
  });

  test('should render', () => {
    const { container } = renderUpload(
      { initialValues: { upload: null } },
      { name: 'upload', clientId: 'a', bucketId: 'b', customerId: 'c' }
    );

    expect(container).toBeDefined();
  });

  test('adding a file', () => {
    const { getByTestId } = renderUpload(
      { initialValues: { upload: null } },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'b',
        customerId: 'c',
      }
    );

    const file = new Buffer.from('hello world'.split(''));
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = getByTestId('file-picker');
    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
  });

  test('removing a file', () => {
    const { getByTestId, queryByTestId } = renderUpload(
      { initialValues: { upload: null } },
      { name: 'upload', clientId: 'a', bucketId: 'b', customerId: 'c' }
    );

    // Create a new file
    const file = new Buffer.from('hello world'.split(''));
    file.name = 'fileName.png';

    const fileEvent = { target: { files: [file] } };

    const inputNode = getByTestId('file-picker');

    // Simulate the upload to the Components
    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);

    const filerow = getByTestId('remove-file-btn');

    fireEvent.click(filerow);

    expect(queryByTestId('remove-file-btn')).toBeNull();
  });

  test('calls onFilePreUpload callback', () => {
    const mockFunc = jest.fn();
    const { getByTestId } = renderUpload(
      { initialValues: { upload: null } },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'b',
        customerId: 'c',
        onFilePreUpload: [mockFunc],
      }
    );
    const inputNode = getByTestId('file-picker');

    const file = new Buffer.from('hello world'.split(''));
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };
    fireEvent.change(inputNode, fileEvent);
    expect(inputNode.files.length).toBe(1);
    const filerow = getByTestId('remove-file-btn');
    fireEvent.click(filerow);
    expect(mockFunc).toHaveBeenCalled();
  });

  test('calls onFileRemove callback', () => {
    const mockFunc = jest.fn();
    const { getByTestId } = renderUpload(
      { initialValues: { upload: null } },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'b',
        customerId: 'c',
        onFileRemove: mockFunc,
      }
    );

    const inputNode = getByTestId('file-picker');

    const file = new Buffer.from('hello world'.split(''));
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);

    const filerow = getByTestId('remove-file-btn');

    fireEvent.click(filerow);

    expect(mockFunc).toHaveBeenCalled();
  });

  describe('dropzone', () => {
    test('lazy loads dropzone', async () => {
      const { getByTestId } = renderUpload(
        { initialValues: { upload: null } },
        {
          name: 'upload',
          clientId: 'a',
          bucketId: 'b',
          customerId: 'c',
          showFileDrop: true,
        }
      );

      const suspenseNode = getByTestId('dropzone-fallback');
      expect(suspenseNode).toBeDefined();

      const inputNode = await waitFor(() => getByTestId('file-picker'));
      expect(inputNode).toBeDefined();
    });

    test('accepts user fallback prop while lazy loading', async () => {
      const { getByTestId } = renderUpload(
        { initialValues: { upload: null } },
        {
          name: 'upload',
          clientId: 'a',
          bucketId: 'b',
          customerId: 'c',
          showFileDrop: true,
          fallback: <div data-testid="user-fallback">Loading suspended component</div>,
        }
      );

      const suspenseNode = getByTestId('user-fallback');
      expect(suspenseNode).toBeDefined();

      const inputNode = await waitFor(() => getByTestId('file-picker'));
      expect(inputNode).toBeDefined();
    });

    test('adds file via dropzone', async () => {
      const { getByTestId } = renderUpload(
        { initialValues: { upload: null } },
        {
          name: 'upload',
          clientId: 'a',
          bucketId: 'b',
          customerId: 'c',
          showFileDrop: true,
        }
      );
      const file = new Buffer.from('hello world'.split(''));
      file.name = 'fileName.png';

      const inputNode = await waitFor(() => getByTestId('file-picker'));
      const fileEvent = { target: { files: [file] } };

      fireEvent.drop(inputNode, fileEvent);

      expect(inputNode.files.length).toBe(1);
    });

    test('uses default drop rejection message', async () => {
      const { getByTestId, getByText } = renderUpload(
        { initialValues: { upload: null } },
        {
          name: 'upload',
          clientId: 'a',
          bucketId: 'b',
          customerId: 'c',
          showFileDrop: true,
          maxSize: 10,
        }
      );

      const file = new Buffer.from('hello world'.split(''));
      file.name = 'fileName.png';
      file.size = 11;

      const inputNode = await waitFor(() => getByTestId('file-picker'));
      const fileEvent = { target: { files: [file] } };

      fireEvent.drop(inputNode, fileEvent);

      expect(inputNode.files.length).toBe(1);
      await waitFor(() => {
        expect(getByText('File is larger than 10 bytes')).toBeDefined();
      });
    });

    test('uses custom drop rejection message', async () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const getDropRejectionMessage = (errors) => {
        let msg = '';
        for (const error of errors) {
          msg += error.code === 'file-too-large' ? 'my custom error message' : 'this file is no good';
        }
        return msg;
      };

      const { getByTestId, getByText } = renderUpload(
        { initialValues: { upload: null } },
        {
          name: 'upload',
          clientId: 'a',
          bucketId: 'b',
          customerId: 'c',
          showFileDrop: true,
          maxSize: 10,
          getDropRejectionMessage,
        }
      );
      const file = new Buffer.from('hello world'.split(''));
      file.name = 'fileName.png';
      file.size = 11;

      const inputNode = await waitFor(() => getByTestId('file-picker'));
      const fileEvent = { target: { files: [file] } };

      fireEvent.drop(inputNode, fileEvent);

      expect(inputNode.files.length).toBe(1);
      await waitFor(() => {
        expect(getByText('my custom error message')).toBeDefined();
      });
    });
  });
});
