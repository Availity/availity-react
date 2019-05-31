import React from 'react';
import '@testing-library/react/cleanup-after-each';
import { fireEvent, waitForElement, render } from '@testing-library/react';
import { avRegionsApi } from '@availity/api-axios';
import { AvForm } from 'availity-reactstrap-validation';

import { AvResourceSelect } from '..';

jest.mock('@availity/api-axios');

const renderSelect = props =>
  render(
    <AvForm>
      <AvResourceSelect name="test-form-input" {...props} />
    </AvForm>
  );

describe('AvResourceSelect', () => {
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
    fireEvent.keyDown(regionsSelect, { key: 'Enter', keyCode: 13 });

    const regionsOption = await waitForElement(() => getByText('Florida'));
    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);

    expect(regionsOption).toBeDefined();

    fireEvent.click(regionsOption);

    expect(
      container.querySelector('.test__regions__option--is-selected')
    ).toBeDefined();
    expect(regionsSelect.querySelector('.test__regions__placeholder')).toBe(
      null
    );
  });
});
