import React from 'react';
import '@testing-library/react/cleanup-after-each';
import {
  fireEvent,
  waitForElement,
  render,
  wait,
} from '@testing-library/react';
import { avRegionsApi } from '@availity/api-axios';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import { ResourceSelect } from '..';

jest.mock('@availity/api-axios');

const onSubmit = jest.fn();

const renderSelect = props =>
  render(
    <Form
      initialValues={{
        'test-form-input': undefined,
      }}
      onSubmit={onSubmit}
    >
      <ResourceSelect name="test-form-input" {...props} />
      <Button type="submit">Submit</Button>
    </Form>
  );

describe('ResourceSelect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns resource options', async () => {
    avRegionsApi.postGet.mockResolvedValue({
      data: {
        regions: [
          {
            id: 'FL',
            value: 'Florida',
          },
        ],
      },
    });

    const { container, getByText } = renderSelect({
      resource: avRegionsApi,
      labelKey: 'value',
      valueKey: 'id',
      classNamePrefix: 'test__regions',
      getResult: 'regions',
    });

    const regionsSelect = container.querySelector('.test__regions__control');
    fireEvent.keyDown(regionsSelect, { key: 'ArrowDown', keyCode: 40 });

    const regionsOption = await waitForElement(() => getByText('Florida'));
    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);

    fireEvent.click(regionsOption);

    await fireEvent.click(getByText('Submit'));
    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          'test-form-input': 'FL',
        }),
        expect.anything()
      );
    });
  });
});
