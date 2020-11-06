import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { avFilesDeliveryApi } from '@availity/api-axios';
import { Form } from '@availity/form';
import { Button } from 'reactstrap';
import nock from 'nock';
import xhrMock from 'xhr-mock';
import UploadCore from '@availity/upload-core';
import Upload from '..';

jest.mock('@availity/api-axios');

const renderUpload = (formProps, uploadProps) => {
  return render(
    <Form {...formProps}>
      <Upload {...uploadProps} />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

// FIXME: how can we await form-upload/Upload's onSuccess callback without resorting
// to adding a second upload here and pushing done() into onSuccess?
const createTestExtendingUpload = (file, done) => {
  const upload = new UploadCore(file, {
    bucketId: 'testbucket',
    customerId: 'b',
    clientId: 'c',
  });
  const success = jest.fn();
  upload.onSuccess.push(success);
  upload.onSuccess.push(() => {
    expect(success).toHaveBeenCalled();
    done();
  });

  return upload;
};

describe('filesDelivery upload', () => {
  beforeEach(() => {
    global.jsdom.reconfigure({
      url: 'https://dev.local/other',
    });
    xhrMock.setup();

    nock('https://dev.local')
      .post(
        '/ms/api/availity/internal/core/vault/upload/v1/resumable/testbucket/'
      )
      .reply(
        201,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          location: '4611142db7c049bbbe37376583a3f46b',
        }
      );

    nock('https://dev.local')
      .patch(
        '/ms/api/availity/internal/core/vault/upload/v1/resumable/testbucket/4611142db7c049bbbe37376583a3f46b'
      )
      .reply(
        204,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          'Upload-Offset': 12,
          references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
        }
      );

    xhrMock.use('HEAD', /.*4611142db7c049bbbe37376583a3f46b.*/, {
      status: 200,
      headers: {
        'Content-Length': '0',
        'AV-Scan-Result': 'accepted',
        'Upload-Result': 'accepted',
      },
    });
  });

  afterEach(() => {
    xhrMock.teardown();
  });

  test('calls avFilesDeliveryApi when deliveryChannel and fileDeliveryMetadata are defined and deliverFileOnSubmit is false', async done => {
    avFilesDeliveryApi.uploadFilesDelivery.mockResolvedValue({
      id: '123456',
      status: 'COMPLETE',
    });

    const { getByTestId } = renderUpload(
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
      }
    );

    const file = Buffer.from('hello world!');
    file.name = 'a';
    const fileEvent = {
      target: {
        files: [file],
      },
    };

    const upload = createTestExtendingUpload(file, done);
    upload.start();

    const inputNode = getByTestId('file-picker');

    fireEvent.change(inputNode, fileEvent);
    expect(inputNode.files.length).toBe(1);

    await wait(() =>
      expect(avFilesDeliveryApi.uploadFilesDelivery).toHaveBeenCalled()
    );
  });

  test('calls avFilesDeliveryApi onSubmit when deliverFileOnSubmit is true and deliveryChannel and fileDeliveryMetadata are defined', async done => {
    const onSubmit = jest.fn();
    avFilesDeliveryApi.uploadFilesDelivery.mockResolvedValue({
      id: '123456',
      status: 'COMPLETE',
    });

    const { getByTestId, getByText } = renderUpload(
      { initialValues: { upload: null }, onSubmit },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'testbucket',
        customerId: 'c',
        deliverFileOnSubmit: true,
        deliverChannel: 'test',
        fileDeliveryMetadata: { payerId: 'AvailityTest' },
      }
    );

    const inputNode = getByTestId('file-picker');

    const file = Buffer.from('hello world!');
    file.name = 'a';
    const fileEvent = {
      target: {
        files: [file],
      },
    };

    const upload = createTestExtendingUpload(file, done);
    upload.start();

    fireEvent.change(inputNode, fileEvent);
    expect(inputNode.files.length).toBe(1);

    fireEvent.click(getByText('Submit'));
    await wait(() => expect(onSubmit).toHaveBeenCalled());
    await wait(() =>
      expect(avFilesDeliveryApi.uploadFilesDelivery).toHaveBeenCalled()
    );
  });

  test('does not call avFilesDeliveryApi when onFileUpload is defined', async () => {
    const mockFunc = jest.fn();
    avFilesDeliveryApi.uploadFilesDelivery.mockResolvedValue({
      id: '123456',
      status: 'COMPLETE',
    });

    const { getByTestId } = renderUpload(
      { initialValues: { upload: null } },
      {
        name: 'upload',
        clientId: 'a',
        bucketId: 'testbucket',
        customerId: 'c',
        onFileUpload: mockFunc,
        deliverFileOnSubmit: false,
        deliverChannel: 'test',
        fileDeliveryMetadata: { payerId: 'AvailityTest' },
      }
    );

    const inputNode = getByTestId('file-picker');

    const file = Buffer.from('hello world!');
    file.name = 'a';
    const fileEvent = {
      target: {
        files: [file],
      },
    };

    fireEvent.change(inputNode, fileEvent);
    expect(inputNode.files.length).toBe(1);

    const filerow = getByTestId('remove-file-btn');

    fireEvent.click(filerow);

    expect(mockFunc).toHaveBeenCalled();
    await wait(() =>
      expect(avFilesDeliveryApi.uploadFilesDelivery).not.toHaveBeenCalled()
    );
  });
});
