import { act } from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '@availity/form';
import { server } from '@availity/mock/src/server';
import type UploadCore from '@availity/upload-core';

import Upload from '../src';

const getFileRemoveBtn = async (): Promise<HTMLElement> => waitFor(() => screen.getByTestId('remove-file-btn'));

type UploadFile = Buffer & { name?: string; size?: number };
const initialValues = { upload: null };
const defaultUploadProps = { name: 'upload', clientId: 'a', bucketId: 'b', customerId: 'c' };

describe('Upload', () => {
  // start msw server
  beforeAll(() => server.listen());

  // clear cache and reset msw handlers
  afterEach(() => server.resetHandlers());

  // terminate the server
  afterAll(() => server.close());
  // beforeEach(() => {
  //   // This is useful to isolate specific modules for every test so that local module state doesn't conflict between tests.
  //   // Makes lazy loading react-dropzone consistent instead of relying on only one test to set it up
  // jest.isolateModules(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   Upload = require('../src/Upload');
  // });
  // });

  // let Upload;

  // afterEach(() => {
  //   jest.resetModules();
  // });

  test('should render', () => {
    const { container } = render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} />
      </Form>
    );

    expect(container).toBeDefined();
  });

  test('adding a single file', async () => {
    render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} />
      </Form>
    );

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(inputNode.files?.length).toBe(1);
    });
  });

  test('adding a file over maxSize', async () => {
    render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} maxSize={100} />
      </Form>
    );

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    file.size = 10000;
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');
    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(screen.getByText('Document is too large')).toBeDefined();
    });
  });

  test('adding a file over totalMaxSize', async () => {
    // FIXME: is bork
    render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} maxSize={700} totalMaxSize={1000} />
      </Form>
    );

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    file.size = 600;

    const file2: UploadFile = Buffer.from('hello world');
    file2.name = 'fileName2.png';
    file2.size = 600;

    const inputNode = screen.getByTestId('file-picker');

    const fileEvent = { target: { files: [file, file2] } };

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(screen.getByText('Total documents size is too large')).toBeDefined();
    });
  });

  test('removing a file', async () => {
    render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} />
      </Form>
    );

    // Create a new file
    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';

    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');

    act(() => {
      // Simulate the upload to the Components
      fireEvent.change(inputNode, fileEvent);
    });

    const removeFileBtn = await getFileRemoveBtn();

    act(() => {
      fireEvent.click(removeFileBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('remove-file-btn')).toBeNull();
    });
  });

  test('calls onFilePreUpload callback', async () => {
    const mockFunc = jest.fn();

    render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} onFilePreUpload={[mockFunc]} />
      </Form>
    );
    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';

    const fileEvent = { target: { files: [file] } };

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(inputNode.files?.length).toBe(1);
    });

    const removeFileBtn = await getFileRemoveBtn();

    act(() => {
      fireEvent.click(removeFileBtn);
    });

    await waitFor(() => {
      expect(mockFunc).toHaveBeenCalled();
    });
  });

  test('calls onFileRemove callback', async () => {
    const onFileRemoveMock = jest.fn();

    render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} onFileRemove={onFileRemoveMock} />
      </Form>
    );

    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(inputNode.files?.length).toBe(1);
    });

    const removeFileBtn = await getFileRemoveBtn();

    act(() => {
      fireEvent.click(removeFileBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('remove-file-btn')).toBeNull();
      expect(onFileRemoveMock).toHaveBeenCalled();
    });
  });

  test('uses cloud url when isCloud is true', async () => {
    const mockFn = jest.fn();
    const onFileUploadMock = jest.fn();

    render(
      <Form<{ upload: UploadCore[] | null }>
        initialValues={initialValues}
        onSubmit={(values) => {
          mockFn(values.upload?.[0].options.endpoint);
        }}
      >
        <Upload {...defaultUploadProps} isCloud onFileUpload={onFileUploadMock} />
        <button type="submit">click</button>
      </Form>
    );

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    // This will make sure the test waits until the file is added to proceed
    await waitFor(() => {
      expect(onFileUploadMock).toHaveBeenCalled();
    });

    act(() => {
      fireEvent.click(screen.getByText('click'));
    });

    await waitFor(() => {
      expect(inputNode.files?.length).toBe(1);
      expect(mockFn).toHaveBeenCalledWith('http://localhost/cloud/web/appl/vault/upload/v1/resumable');
    });
  });

  test('uses given endpoint when passed', async () => {
    const mockFn = jest.fn();
    const onFileUploadMock = jest.fn();

    render(
      <Form<{ upload: UploadCore[] | null }>
        initialValues={initialValues}
        onSubmit={(values) => {
          mockFn(values.upload?.[0].options.endpoint);
        }}
      >
        <Upload {...defaultUploadProps} endpoint="/test/foo" onFileUpload={onFileUploadMock} />
        <button type="submit">click</button>
      </Form>
    );

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    // This will make sure the test waits until the file is added to proceed
    await waitFor(() => {
      expect(onFileUploadMock).toHaveBeenCalled();
    });

    act(() => {
      fireEvent.click(screen.getByText('click'));
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith('http://localhost/test/foo');
    });
  });

  test('passes customHeaders to UploadCore options', async () => {
    const customHeaders = { 'X-Custom-Header': 'test-value' };
    const mockFn = jest.fn();
    const onFileUploadMock = jest.fn();

    render(
      <Form<{ upload: UploadCore[] | null }>
        initialValues={initialValues}
        onSubmit={(values) => {
          mockFn(values.upload?.[0].options.customHeaders);
        }}
      >
        <Upload {...defaultUploadProps} customHeaders={customHeaders} onFileUpload={onFileUploadMock} />
        <button type="submit">click</button>
      </Form>
    );

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(onFileUploadMock).toHaveBeenCalled();
    });

    act(() => {
      fireEvent.click(screen.getByText('click'));
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledWith(customHeaders);
    });
  });

  describe('dropzone', () => {
    // start msw server
    beforeAll(() => server.listen());

    // clear cache and reset msw handlers
    afterEach(() => server.resetHandlers());

    // terminate the server
    afterAll(() => server.close());

    test('lazy loads dropzone', async () => {
      render(
        <Form
          initialValues={initialValues}
          onSubmit={() => {
            // noop
          }}
        >
          <Upload {...defaultUploadProps} showFileDrop />
        </Form>
      );

      const suspenseNode = screen.getByTestId('dropzone-fallback');
      expect(suspenseNode).toBeDefined();

      const inputNode = await waitFor(() => screen.getByTestId('file-picker'));
      expect(inputNode).toBeDefined();
    });

    // eslint-disable-next-line jest/no-commented-out-tests
    // test('accepts user fallback prop while lazy loading', async () => {
    //   // const { getByTestId } = renderUpload(
    //   //   { initialValues: { upload: null } },
    //   //   {
    //   //     name: 'upload',
    //   //     clientId: 'a',
    //   //     bucketId: 'b',
    //   //     customerId: 'c',
    //   //     showFileDrop: true,
    //   //     fallback: <div data-testid="user-fallback">Loading suspended component</div>,
    //   //   }
    //   // );
    //   render(
    //     <Form
    //       initialValues={initialValues}
    //       onSubmit={() => {
    //         // noop
    //       }}
    //     >
    //       <Upload
    //         {...defaultUploadProps}
    //         showFileDrop
    //         fallback={<div data-testid="user-fallback">Loading suspended component</div>}
    //       />
    //     </Form>
    //   );

    //   const suspenseNode = screen.getByTestId('user-fallback');
    //   expect(suspenseNode).toBeDefined();

    //   const inputNode = await waitFor(() => screen.getByTestId('file-picker'));
    //   expect(inputNode).toBeDefined();
    // });

    test('adds file via dropzone', async () => {
      // const { getByTestId } = renderUpload(
      //   { initialValues: { upload: null } },
      //   {
      //     name: 'upload',
      //     clientId: 'a',
      //     bucketId: 'b',
      //     customerId: 'c',
      //     showFileDrop: true,
      //   }
      // );
      render(
        <Form
          initialValues={initialValues}
          onSubmit={() => {
            // noop
          }}
        >
          <Upload {...defaultUploadProps} showFileDrop />
        </Form>
      );
      const file: UploadFile = Buffer.from('hello world');
      file.name = 'fileName.png';

      const inputNode = await waitFor(() => screen.getByTestId('file-picker') as HTMLInputElement);
      const fileEvent = { target: { files: [file] } };

      fireEvent.drop(inputNode, fileEvent);

      expect(inputNode.files?.length).toBe(1);
    });

    test('uses default drop rejection message', async () => {
      // const { getByTestId, getByText } = renderUpload(
      //   { initialValues: { upload: null } },
      //   {
      //     name: 'upload',
      //     clientId: 'a',
      //     bucketId: 'b',
      //     customerId: 'c',
      //     showFileDrop: true,
      //     maxSize: 10,
      //   }
      // );
      render(
        <Form
          initialValues={initialValues}
          onSubmit={() => {
            // noop
          }}
        >
          <Upload {...defaultUploadProps} showFileDrop maxSize={10} />
        </Form>
      );

      const file: UploadFile = Buffer.from('hello world');
      file.name = 'fileName.png';
      file.size = 11;

      const inputNode = await waitFor(() => screen.getByTestId('file-picker') as HTMLInputElement);
      const fileEvent = { target: { files: [file] } };

      fireEvent.drop(inputNode, fileEvent);

      expect(inputNode.files?.length).toBe(1);
      await waitFor(() => {
        expect(screen.getByText('File is larger than 10 bytes')).toBeDefined();
      });
    });

    test('uses custom drop rejection message', async () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const getDropRejectionMessage = (errors: { code: string }[]) => {
        let msg = '';
        for (const error of errors) {
          msg += error.code === 'file-too-large' ? 'my custom error message' : 'this file is no good';
        }
        return msg;
      };

      // const { getByTestId, getByText } = renderUpload(
      //   { initialValues: { upload: null } },
      //   {
      //     name: 'upload',
      //     clientId: 'a',
      //     bucketId: 'b',
      //     customerId: 'c',
      //     showFileDrop: true,
      //     maxSize: 10,
      //     getDropRejectionMessage,
      //   }
      // );
      render(
        <Form
          initialValues={initialValues}
          onSubmit={() => {
            // noop
          }}
        >
          <Upload {...defaultUploadProps} getDropRejectionMessage={getDropRejectionMessage} maxSize={10} showFileDrop />
        </Form>
      );
      const file: UploadFile = Buffer.from('hello world');
      file.name = 'fileName.png';
      file.size = 11;

      const inputNode = await waitFor(() => screen.getByTestId('file-picker') as HTMLInputElement);
      const fileEvent = { target: { files: [file] } };

      fireEvent.drop(inputNode, fileEvent);

      expect(inputNode.files?.length).toBe(1);
      await waitFor(() => {
        expect(screen.getByText('my custom error message')).toBeDefined();
      });
    });
  });
});
