import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// You can either import this and it will auto cleanup or do `afterEach(cleanup)`
import '@testing-library/react/cleanup-after-each';
import Upload from '..';

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
});
