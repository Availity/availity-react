import React, { act } from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { server } from '@availity/mock/src/server';

import Upload from '..';

const getDropRejectionMessage = (errors) => {
  let msg = '';
  for (const error of errors) {
    msg += error.code === 'file-too-large' ? 'my custom error message' : 'this file is no good';
  }
  return msg;
};

describe('Upload', () => {
  // start msw server
  beforeAll(() => server.listen());

  // clear cache and reset msw handlers
  afterEach(() => server.resetHandlers());

  // terminate the server
  afterAll(() => server.close());

  test('should render', () => {
    render(<Upload clientId="a" bucketId="b" customerId="c" />);

    expect(screen.getByTestId('file-picker')).toBeDefined();
  });

  test('adding a file', async () => {
    render(<Upload clientId="a" bucketId="b" customerId="c" showFileDrop />);

    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(inputNode.files.length).toBe(1);
    });
  });

  test('removing a file', async () => {
    render(<Upload clientId="a" bucketId="b" customerId="c" />);

    // Create a new file
    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');

    // Simulate the upload to the Components
    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    let removeFileBtn;

    await waitFor(() => {
      expect(inputNode.files.length).toBe(1);
      removeFileBtn = screen.getByTestId('remove-file-btn');
    });

    act(() => {
      fireEvent.click(removeFileBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('remove-file-btn')).toBeNull();
    });
  });

  test('calls onFilePreUpload callback', async () => {
    const mockFunc = jest.fn();
    render(<Upload clientId="a" bucketId="b" customerId="c" onFilePreUpload={[mockFunc]} />);
    const inputNode = screen.getByTestId('file-picker');

    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(inputNode.files.length).toBe(1);

      screen.getByTestId('remove-file-btn');
    });

    await waitFor(() => {
      expect(mockFunc).toHaveBeenCalled();
    });
  });

  test('calls onFileRemove callback', async () => {
    const mockFunc = jest.fn();

    render(<Upload clientId="a" bucketId="b" customerId="c" onFileRemove={mockFunc} />);

    const inputNode = screen.getByTestId('file-picker');

    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    fireEvent.change(inputNode, fileEvent);

    let removeFileBtn;

    await waitFor(() => {
      expect(inputNode.files.length).toBe(1);
      removeFileBtn = screen.getByTestId('remove-file-btn');
    });

    act(() => {
      fireEvent.click(removeFileBtn);
    });

    expect(mockFunc).toHaveBeenCalled();
  });

  test('adds file via dropzone', () => {
    render(<Upload clientId="a" bucketId="b" customerId="c" showFileDrop />);
    const file = Buffer.from('hello world');
    file.name = 'fileName.png';

    const inputNode = screen.getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
  });

  test('uses default drop rejection message', async () => {
    render(<Upload clientId="a" bucketId="b" customerId="c" showFileDrop maxSize={10} />);
    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    file.size = 11;

    const inputNode = screen.getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
    await waitFor(() => {
      expect(screen.getByText('File is larger than 10 bytes')).toBeDefined();
    });
  });

  test('a discontinue result from a function in the property onFilePreUpload should prevent onFileUpload from being called', async () => {
    const myfunc = jest.fn();
    render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        showFileDrop
        maxSize={10}
        onFileUpload={myfunc}
        onFilePreUpload={[() => false]}
      />
    );
    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    file.size = 11;
    const inputNode = screen.getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
    expect(myfunc).toHaveBeenCalledTimes(0);
  });

  test('a discontinue result from a function in the property onFilePreUpload does not stop an error message from generating', async () => {
    render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        showFileDrop
        maxSize={10}
        getDropRejectionMessage={getDropRejectionMessage}
        onFilePreUpload={[() => false]}
      />
    );
    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    file.size = 11;
    const inputNode = screen.getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
    await waitFor(() => {
      expect(screen.getByText('my custom error message')).toBeDefined();
    });
  });

  test('uses custom drop rejection message', async () => {
    render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        showFileDrop
        maxSize={10}
        getDropRejectionMessage={getDropRejectionMessage}
      />
    );
    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    file.size = 11;

    const inputNode = screen.getByTestId('file-picker');
    const fileEvent = { target: { files: [file] } };

    fireEvent.drop(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);
    await waitFor(() => {
      expect(screen.getByText('my custom error message')).toBeDefined();
    });
  });

  test('uses cloud url when isCloud is true', async () => {
    const mockFn = jest.fn();

    render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        isCloud
        onFilePreUpload={[
          (file) => {
            mockFn(file.options.endpoint);
          },
        ]}
      />
    );

    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');

    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith('http://localhost/cloud/web/appl/vault/upload/v1/resumable');
    });
  });

  test('uses endpoint passed in props for upload', async () => {
    const mockFn = jest.fn();

    render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        endpoint="/test/foo"
        onFilePreUpload={[
          (file) => {
            mockFn(file.options.endpoint);
          },
        ]}
      />
    );

    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');

    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith('http://localhost/test/foo');
    });
  });

  test('passes customHeaders to UploadCore options', async () => {
    const customHeaders = { 'X-Custom-Header': 'test-value' };
    const mockFn = jest.fn();

    render(
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        customHeaders={customHeaders}
        onFilePreUpload={[
          (file) => {
            mockFn(file.options.headers);
          },
        ]}
      />
    );

    const file = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');

    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files.length).toBe(1);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith(customHeaders);
    });
  });
});
