import React from 'react';
import {
  fireEvent,
  waitForElement,
  render,
  wait,
  cleanup,
} from '@testing-library/react';
import { avRegionsApi, avWebQLApi, avProvidersApi } from '@availity/api-axios';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import { ResourceSelect } from '..';
import { AvPatientSelect, AvProviderSelect } from '../resources';

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
    cleanup();
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
          'test-form-input': {
            id: 'FL',
            value: 'Florida',
          },
        }),
        expect.anything()
      );
    });
  });

  it('returns previousOptions when search input is less than minCharsToSearch', async () => {
    avRegionsApi.postGet
      .mockResolvedValueOnce({
        data: {
          regions: [
            {
              id: 'FL',
              value: 'Florida',
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          regions: [
            {
              id: 'GA',
              value: 'Georgia',
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
      minCharsToSearch: 3,
    });

    const regionsSelect = container.querySelector('.test__regions__control');
    fireEvent.keyDown(regionsSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(regionsSelect, { key: 'Enter', keyCode: 13 });

    let regionsOption = await waitForElement(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    let selectInput;

    // Should skip network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'g' },
    });
    regionsOption = await waitForElement(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    // Should skip network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'ge' },
    });
    regionsOption = await waitForElement(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    // Should make network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'geo' },
    });
    regionsOption = await waitForElement(() => getByText('Georgia'));
    expect(regionsOption).toBeDefined();

    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(2);
    expect(avRegionsApi.postGet.mock.calls[0][0]).toBe('q=&limit=50&offset=0');
    expect(avRegionsApi.postGet.mock.calls[1][0]).toBe(
      'q=geo&limit=50&offset=0'
    );
  });

  it('renders AvPatientSelect options', async () => {
    avWebQLApi.post.mockResolvedValue({
      data: {
        data: {
          patientPagination: {
            pageInfo: {
              hasNextPage: false,
            },
            items: [
              {
                firstName: 'Bram',
                lastName: 'Moolenaar',
                subscriberMemberId: 'ABC123',
              },
            ],
          },
        },
      },
    });

    const { container, getByText } = render(
      <Form
        initialValues={{
          'test-form-input': undefined,
        }}
        onSubmit={onSubmit}
      >
        <AvPatientSelect
          name="test-form-input"
          classNamePrefix="test__patients"
          parameters={{ customerId: '1194' }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const patientsSelect = container.querySelector('.test__patients__control');
    fireEvent.keyDown(patientsSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(patientsSelect, { key: 'Enter', keyCode: 13 });

    const patientsOption = await waitForElement(() =>
      getByText('Moolenaar, Bram')
    );
    expect(avWebQLApi.post).toHaveBeenCalledTimes(1);
    expect(avWebQLApi.post.mock.calls[0][0].variables.filters.customerId).toBe(
      '1194'
    );
    expect(avWebQLApi.post.mock.calls[0][0].query).toContain(
      'patientPagination'
    );

    expect(patientsOption).toBeDefined();

    fireEvent.click(patientsOption);

    expect(
      container.querySelector('.test__patients__option--is-selected')
    ).toBeDefined();
    expect(patientsSelect.querySelector('.test__patients__placeholder')).toBe(
      null
    );
  });

  // only makes one call when cacheUniq not defined but watchParams are
  // ensures _cacheUniq is created before the first API call
  // makes new call when watchParam changes

  it('reacts to watchParams properly', async () => {
    avProvidersApi.postGet
      .mockResolvedValueOnce({
        data: {
          providers: [
            {
              atypical: false,
              uiDisplayName: 'ABC Hospital',
              customerIds: ['1194'],
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          providers: [
            {
              atypical: true,
              uiDisplayName: 'latipsoH CBA',
              customerIds: ['1195'],
            },
          ],
        },
      });

    // eslint-disable-next-line react/prop-types
    const ProviderComponent = ({ providerProps }) => {
      return (
        <Form
          initialValues={{
            'test-form-input': undefined,
          }}
          onSubmit={onSubmit}
        >
          <AvProviderSelect {...providerProps} />
          <Button type="submit">Submit</Button>
        </Form>
      );
    };

    const providerProps = {
      name: 'test-form-input',
      classNamePrefix: 'test__provider',
      customerId: '1194',
      getResult: 'providers',
    };

    const { container, getByText, rerender } = render(
      <ProviderComponent providerProps={providerProps} />
    );

    const providerSelect = container.querySelector('.test__provider__control');
    fireEvent.keyDown(providerSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(providerSelect, { key: 'Enter', keyCode: 13 });

    let providerOption = await waitForElement(() => getByText('ABC Hospital'));

    expect(providerOption).toBeDefined();
    expect(avProvidersApi.postGet).toHaveBeenCalledTimes(1);
    expect(avProvidersApi.postGet.mock.calls[0][0]).toBe(
      'q=&limit=50&customerId=1194&offset=0'
    );

    // rerender with same props should not trigger api call
    rerender(<ProviderComponent providerProps={providerProps} />);

    fireEvent.keyDown(providerSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(providerSelect, { key: 'Enter', keyCode: 13 });
    expect(avProvidersApi.postGet).toHaveBeenCalledTimes(1);

    // setup rerender for watchParams, should trigger api call
    providerProps.customerId = '1195';
    rerender(<ProviderComponent providerProps={providerProps} />);

    fireEvent.keyDown(providerSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(providerSelect, { key: 'Enter', keyCode: 13 });

    providerOption = await waitForElement(() => getByText('latipsoH CBA'));

    expect(providerOption).toBeDefined();
    expect(avProvidersApi.postGet).toHaveBeenCalledTimes(2);
    expect(avProvidersApi.postGet.mock.calls[1][0]).toBe(
      'q=&limit=50&customerId=1195&offset=0'
    );
  });

  it('waits to query resource until input is focused when waitUntilFocused is true', async () => {
    // FIXME need true test for this
    expect(true).toBe(true);
  });
});
