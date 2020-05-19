import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Form } from '@availity/form';
import Upload from '..';

afterEach(cleanup);

const renderUpload = (formProps, uploadProps) => {
  return render(
    <Form {...formProps}>
      <Upload {...uploadProps} />
    </Form>
  );
};

describe('Upload', () => {
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
        showFileDrop: true,
      }
    );

    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
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
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
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

    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);

    const filerow = getByTestId('remove-file-btn');

    fireEvent.click(filerow);

    expect(mockFunc).toHaveBeenCalled();
  });

  test('adds file via dropzone', () => {
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
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';

    const inputNode = getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
  });
});
