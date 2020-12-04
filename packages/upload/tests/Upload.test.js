import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Upload from '..';

afterEach(cleanup);

describe('Upload', () => {
  test('should render', () => {
    const { container } = render(
      <Upload clientId="a" bucketId="b" customerId="c" />
    );

    expect(container).toMatchSnapshot();
  });

  test('adding a file', () => {
    const { getByTestId } = render(
      <Upload clientId="a" bucketId="b" customerId="c" showFileDrop />
    );

    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = getByTestId('file-picker');

    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
  });

  test('removing a file', () => {
    const { getByTestId, queryByTestId } = render(
      <Upload clientId="a" bucketId="b" customerId="c" />
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

    const { getByTestId } = render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        onFileRemove={mockFunc}
      />
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
    const { getByTestId } = render(
      <Upload clientId="a" bucketId="b" customerId="c" showFileDrop />
    );
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';

    const inputNode = getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
  });

  test('uses default drop rejection message', async () => {
    const { getByTestId, getByText } = render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        showFileDrop
        maxSize={10}
      />
    );
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';
    file.size = 11;

    const inputNode = getByTestId('file-picker');
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
      errors.forEach((error) => {
        msg +=
          error.code === 'file-too-large'
            ? 'my custom error message'
            : 'this file is no good';
      });
      return msg;
    };

    const { getByTestId, getByText } = render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        showFileDrop
        maxSize={10}
        getDropRejectionMessage={getDropRejectionMessage}
      />
    );
    const file = new Buffer.from('hello world'.split('')); // eslint-disable-line new-cap
    file.name = 'fileName.png';
    file.size = 11;

    const inputNode = getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
    await waitFor(() => {
      expect(getByText('my custom error message')).toBeDefined();
    });
  });
});
