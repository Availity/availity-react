/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable new-cap */
// import React from 'react';
import { screen, render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Form } from '@availity/form';
import Upload from '../src';

// const renderUpload = (formProps, uploadProps) =>
//   render(
//     <Form {...formProps}>
//       <Upload {...uploadProps} />
//     </Form>
//   );

type UploadFile = Buffer & { name?: string; size?: number };
const initialValues = { upload: null };
const defaultUploadProps = { name: 'upload', clientId: 'a', bucketId: 'b', customerId: 'c' };

describe('Upload', () => {
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
    // const { container } = renderUpload(
    //   { initialValues: { upload: null } },
    //   { name: 'upload', clientId: 'a', bucketId: 'b', customerId: 'c' }
    // );
    // jest.isolateModules(() => {
    //   // eslint-disable-next-line @typescript-eslint/no-var-requires
    //   Upload = require('../src/Upload').default;
    // });
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

  test('adding a file', () => {
    // const { getByTestId } = renderUpload(
    //   { initialValues: { upload: null } },
    //   {
    //     name: 'upload',
    //     clientId: 'a',
    //     bucketId: 'b',
    //     customerId: 'c',
    //   }
    // );
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
    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files?.length).toBe(1);
  });

  test('adding a file over maxSize', () => {
    // const { getByTestId, getByText } = renderUpload(
    //   { initialValues: { upload: null } },
    //   {
    //     name: 'upload',
    //     clientId: 'a',
    //     bucketId: 'b',
    //     customerId: 'c',
    //     maxSize: 100,
    //   }
    // );

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
    fireEvent.change(inputNode, fileEvent);

    expect(screen.getByText('Document is too large')).toBeDefined();
  });

  test('adding a file over totalMaxSize', () => {
    // const { getByTestId, getByText } = renderUpload(
    //   { initialValues: { upload: null } },
    //   {
    //     name: 'upload',
    //     clientId: 'a',
    //     bucketId: 'b',
    //     customerId: 'c',
    //     maxSize: 700,
    //     totalMaxSize: 1000,
    //   }
    // );
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
    const fileEvent = { target: { files: [file] } };

    const inputNode = screen.getByTestId('file-picker');
    fireEvent.change(inputNode, fileEvent);
    fireEvent.change(inputNode, fileEvent);

    expect(screen.getByText('Total documents size is too large')).toBeDefined();
  });

  test('removing a file', () => {
    // const { getByTestId, queryByTestId } = renderUpload(
    //   { initialValues: { upload: null } },
    //   { name: 'upload', clientId: 'a', bucketId: 'b', customerId: 'c' }
    // );
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

    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    // Simulate the upload to the Components
    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files?.length).toBe(1);

    const filerow = screen.getByTestId('remove-file-btn');

    fireEvent.click(filerow);

    expect(screen.queryByTestId('remove-file-btn')).toBeNull();
  });

  test('calls onFilePreUpload callback', () => {
    const mockFunc = jest.fn();
    // const { getByTestId } = renderUpload(
    //   { initialValues: { upload: null } },
    //   {
    //     name: 'upload',
    //     clientId: 'a',
    //     bucketId: 'b',
    //     customerId: 'c',
    //     onFilePreUpload: [mockFunc],
    //   }
    // );
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
    fireEvent.change(inputNode, fileEvent);
    expect(inputNode.files?.length).toBe(1);
    const filerow = screen.getByTestId('remove-file-btn');
    fireEvent.click(filerow);
    expect(mockFunc).toHaveBeenCalled();
  });

  test('calls onFileRemove callback', () => {
    const mockFunc = jest.fn();
    // const { getByTestId } = renderUpload(
    //   { initialValues: { upload: null } },
    //   {
    //     name: 'upload',
    //     clientId: 'a',
    //     bucketId: 'b',
    //     customerId: 'c',
    //     onFileRemove: mockFunc,
    //   }
    // );
    render(
      <Form
        initialValues={initialValues}
        onSubmit={() => {
          // noop
        }}
      >
        <Upload {...defaultUploadProps} onFileRemove={mockFunc} />
      </Form>
    );

    const inputNode = screen.getByTestId('file-picker') as HTMLInputElement;

    const file: UploadFile = Buffer.from('hello world');
    file.name = 'fileName.png';
    const fileEvent = { target: { files: [file] } };

    fireEvent.change(inputNode, fileEvent);

    expect(inputNode.files?.length).toBe(1);

    const filerow = screen.getByTestId('remove-file-btn');

    fireEvent.click(filerow);

    expect(mockFunc).toHaveBeenCalled();
  });

  describe('dropzone', () => {
    afterEach(() => {
      jest.resetModules();
      cleanup();
    });
    test('lazy loads dropzone', async () => {
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
