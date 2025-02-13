import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '@availity/form';
import { Button } from 'reactstrap';
import { server } from '@availity/mock/src/server';

import Upload from '..';

const renderUpload = (formProps, uploadProps) =>
  render(
    <Form {...formProps}>
      <Upload {...uploadProps} />
      <Button type="submit">Submit</Button>
    </Form>
  );

describe('filesDelivery upload', () => {
  // start msw server
  beforeAll(() => server.listen());

  // clear cache and reset msw handlers
  afterEach(() => server.resetHandlers());

  // terminate the server
  afterAll(() => server.close());

  test('calls avFilesDeliveryApi when deliveryChannel and fileDeliveryMetadata are defined and deliverFileOnSubmit is false', async () => {
    const mockOnDeliverySuccess = jest.fn();

    renderUpload(
      {
        initialValues: {
          upload: null,
        },
      },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'testbucket',
        customerId: 'c',
        deliveryChannel: 'test',
        deliverFileOnSubmit: false,
        fileDeliveryMetadata: {
          payerId: 'AvailityTest',
        },
        onDeliverySuccess: () => {
          mockOnDeliverySuccess();
        },
      }
    );

    const file = Buffer.from('hello world!');
    file.name = 'a';
    const fileEvent = {
      target: {
        files: [file],
      },
    };

    const inputNode = screen.getByTestId('file-picker');

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(inputNode.files.length).toBe(1);
      screen.getByTestId('remove-file-btn');
    });

    waitFor(() => {
      expect(mockOnDeliverySuccess).toHaveBeenCalled();
    });
  });

  test('calls avFilesDeliveryApi onSubmit when deliverFileOnSubmit is true and deliveryChannel and fileDeliveryMetadata are defined', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnDeliverySuccess = jest.fn();
    const mockOnDeliveryError = jest.fn();

    renderUpload(
      { initialValues: { upload: null }, onSubmit: mockOnSubmit },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'testbucket',
        customerId: 'c',
        deliverFileOnSubmit: true,
        deliveryChannel: 'test',
        fileDeliveryMetadata: { payerId: 'AvailityTest' },
        onDeliverySuccess: () => {
          mockOnDeliverySuccess();
        },
        onDeliveryError: () => {
          mockOnDeliveryError();
        },
      }
    );

    const inputNode = screen.getByTestId('file-picker');

    const file = Buffer.from('hello world!');
    file.name = 'a';
    const fileEvent = {
      target: {
        files: [file],
      },
    };

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });

    await waitFor(() => {
      expect(inputNode.files.length).toBe(1);
      screen.getByTestId('remove-file-btn');
    });

    act(() => {
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
    await waitFor(() => expect(mockOnDeliverySuccess).toHaveBeenCalledTimes(1));
  });

  test('does not call avFilesDeliveryApi when onFileUpload is defined', async () => {
    const mockOnFileUpload = jest.fn();
    const mockOnDeliverySuccess = jest.fn();
    const mockOnDeliveryError = jest.fn();

    renderUpload(
      { initialValues: { upload: null } },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'testbucket',
        customerId: 'c',
        onFileUpload: mockOnFileUpload,
        deliverFileOnSubmit: false,
        deliveryChannel: 'test',
        fileDeliveryMetadata: { payerId: 'AvailityTest' },
        onDeliverySuccess: mockOnDeliverySuccess,
        onDeliveryError: mockOnDeliveryError,
      }
    );

    const inputNode = screen.getByTestId('file-picker');

    const file = Buffer.from('hello world!');
    file.name = 'a';
    const fileEvent = {
      target: {
        files: [file],
      },
    };

    act(() => {
      fireEvent.change(inputNode, fileEvent);
    });
    expect(inputNode.files.length).toBe(1);

    let removeFileBtn;
    await waitFor(() => {
      expect(inputNode.files.length).toBe(1);
      removeFileBtn = screen.getByTestId('remove-file-btn');
    });

    fireEvent.click(removeFileBtn);

    await waitFor(() => {
      expect(mockOnFileUpload).toHaveBeenCalled();
    });

    await waitFor(() => expect(mockOnDeliverySuccess).not.toHaveBeenCalled());
    await waitFor(() => expect(mockOnDeliveryError).not.toHaveBeenCalled());
  });
});
