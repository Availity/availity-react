import React, { useState } from 'react';
import { fireEvent, render, waitFor, cleanup } from '@testing-library/react';
import { avRegionsApi, avProvidersApi, avCodesApi } from '@availity/api-axios';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import { ResourceSelect } from '..';
import { AvProviderSelect, AvRegionSelect } from '../resources';

jest.mock('@availity/api-axios');

const onSubmit = jest.fn();

const renderSelect = (props) => {
  const Component = () => {
    const [cacheUniq, setCacheUniq] = useState(false);

    return (
      <Form
        initialValues={{
          'test-form-input': undefined,
        }}
        onSubmit={onSubmit}
      >
        <ResourceSelect
          name="test-form-input"
          cacheUniq={cacheUniq}
          {...props}
        />
        <Button
          type="button"
          data-testid="btn-toggle-cacheUniq"
          onClick={() => setCacheUniq(!cacheUniq)}
        >
          Toggle Cache Uniq Button
        </Button>
        <Button type="submit">Submit</Button>
      </Form>
    );
  };
  return render(<Component />);
};

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

    await waitFor(() => {
      expect(avRegionsApi.postGet).toHaveBeenCalled();
    });

    const regionsSelect = container.querySelector('.test__regions__control');
    fireEvent.keyDown(regionsSelect, { key: 'ArrowDown', keyCode: 40 });

    const regionsOption = await waitFor(() => getByText('Florida'));
    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);

    fireEvent.click(regionsOption);

    await fireEvent.click(getByText('Submit'));
    await waitFor(() => {
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

    let regionsOption = await waitFor(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    let selectInput;

    // Should skip network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'g' },
    });
    regionsOption = await waitFor(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    // Should skip network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'ge' },
    });
    regionsOption = await waitFor(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    // Should make network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'geo' },
    });
    regionsOption = await waitFor(() => getByText('Georgia'));
    expect(regionsOption).toBeDefined();

    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(2);
    expect(avRegionsApi.postGet.mock.calls[0][0]).toBe('q=&limit=50&offset=0');
    expect(avRegionsApi.postGet.mock.calls[1][0]).toBe(
      'q=geo&limit=50&offset=0'
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
    const ProviderComponent = ({ providerProps }) => (
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

    let providerOption = await waitFor(() => getByText('ABC Hospital'));

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

    providerOption = await waitFor(() => getByText('latipsoH CBA'));

    expect(providerOption).toBeDefined();
    expect(avProvidersApi.postGet).toHaveBeenCalledTimes(2);
    expect(avProvidersApi.postGet.mock.calls[1][0]).toBe(
      'q=&limit=50&customerId=1195&offset=0'
    );
  });

  it('waits to query resource until input is focused when waitUntilFocused is true', async () => {
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
      waitUntilFocused: true,
    });

    // Check the resource is not called on mount
    await waitFor(() => {
      expect(avRegionsApi.postGet).not.toHaveBeenCalled();
    });

    const regionsSelect = container.querySelector('.test__regions__control');
    const input = container.querySelector('input');
    fireEvent.focus(input);
    fireEvent.keyDown(regionsSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(regionsSelect, { key: 'Enter', keyCode: 13 });

    // Check the resource is called only after the input has been focused
    await waitFor(() => {
      expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);
    });

    const regionsOption = await waitFor(() => getByText('Florida'));

    fireEvent.click(regionsOption);

    await fireEvent.click(getByText('Submit'));
    await waitFor(() => {
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

  describe('defaultToOnlyOption', () => {
    it('defaults to only option', async () => {
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

      const { getByText } = renderSelect({
        resource: avRegionsApi,
        labelKey: 'value',
        valueKey: 'id',
        classNamePrefix: 'test__regions',
        getResult: 'regions',
        defaultToOnlyOption: true,
      });

      await waitFor(() => {
        expect(avRegionsApi.postGet).toHaveBeenCalled();
      });

      await fireEvent.click(getByText('Submit'));
      await waitFor(() => {
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

    it('defaults to only option when cacheUniq changes', async () => {
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
        .mockResolvedValue({
          data: {
            regions: [
              {
                id: 'AL',
                value: 'Alabama',
              },
            ],
          },
        });

      const { getByTestId, getByText } = renderSelect({
        resource: avRegionsApi,
        labelKey: 'value',
        valueKey: 'id',
        classNamePrefix: 'test__regions',
        getResult: 'regions',
        defaultToOnlyOption: true,
      });

      await waitFor(() => {
        expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);
      });

      await fireEvent.click(getByText('Submit'));
      await waitFor(() => {
        const testFormInput = onSubmit.mock.calls[0][0]['test-form-input'];
        expect(testFormInput).toEqual({
          id: 'FL',
          value: 'Florida',
        });
      });

      // Change what cache uniq is
      await fireEvent.click(getByTestId('btn-toggle-cacheUniq'));

      await waitFor(() => {
        expect(avRegionsApi.postGet).toHaveBeenCalledTimes(2);
      });

      await fireEvent.click(getByText('Submit'));

      await waitFor(() => {
        const testFormInput = onSubmit.mock.calls[1][0]['test-form-input'];
        expect(testFormInput).toEqual({
          id: 'AL',
          value: 'Alabama',
        });
      });
    });

    it('does not default to only option when more than one option', async () => {
      avRegionsApi.postGet.mockResolvedValue({
        data: {
          regions: [
            {
              id: 'FL',
              value: 'Florida',
            },
            {
              id: 'AL',
              value: 'Alabama',
            },
          ],
        },
      });

      const { getByText } = renderSelect({
        resource: avRegionsApi,
        labelKey: 'value',
        valueKey: 'id',
        classNamePrefix: 'test__regions',
        getResult: 'regions',
        defaultToOnlyOption: true,
      });

      await waitFor(() => {
        expect(avRegionsApi.postGet).toHaveBeenCalled();
      });

      await fireEvent.click(getByText('Submit'));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            'test-form-input': undefined,
          }),
          expect.anything()
        );
      });
    });
  });

  it('waits to query until requiredParams are set', async () => {
    const renderDropdown = ({ parameters = {}, ...props }) => {
      const Component = () => {
        const [listParameter, setListParameter] = useState();

        return (
          <Form
            initialValues={{
              'test-form-input': undefined,
            }}
            onSubmit={onSubmit}
          >
            <ResourceSelect
              name="test-form-input"
              parameters={{ ...parameters, list: listParameter }}
              {...props}
            />
            <Button
              type="button"
              data-testid="btn-set-list"
              onClick={() => setListParameter('foo')}
            >
              Set List Parameter
            </Button>
            <Button type="submit">Submit</Button>
          </Form>
        );
      };
      return render(<Component />);
    };

    avCodesApi.postGet.mockResolvedValue({
      data: {
        codes: [
          {
            id: 'code1',
            value: 'value1',
          },
        ],
      },
    });

    const { getByTestId } = renderDropdown({
      resource: avCodesApi,
      labelKey: 'value',
      valueKey: 'id',
      classNamePrefix: 'test__codes',
      getResult: 'codes',
      requiredParams: ['list'],
    });

    await waitFor(() => {
      expect(avCodesApi.postGet).not.toHaveBeenCalled();
    });

    // Set required parameter list
    fireEvent.click(getByTestId('btn-set-list'));

    // Check that query was fired off after required parameter set
    await waitFor(() => {
      expect(avCodesApi.postGet).toHaveBeenCalledTimes(1);
    });
  });

  it('waits to search until shouldSearch returns true', async () => {
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
      shouldSearch: (inputValue) => inputValue === 'flo',
    });

    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(0);

    let selectInput;

    // Should skip network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'f' },
    });
    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(0);

    // Should skip network request
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'fl' },
    });
    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(0);

    // Should make network request because inputValue is equal to "flo"
    selectInput = container.querySelector('#test-form-input');
    fireEvent.change(selectInput, {
      target: { value: 'flo' },
    });
    const regionsOption = await waitFor(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);
    expect(avRegionsApi.postGet.mock.calls[0][0]).toBe(
      'q=flo&limit=50&offset=0'
    );
  });
});

describe('SelectByValue', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('selects the matching selectByValue option by string', async () => {
    avRegionsApi.postGet.mockResolvedValue({
      data: {
        regions: [
          {
            id: 'FL',
            value: 'Florida',
          },
          {
            id: 'TX',
            value: 'Texas',
          },
        ],
      },
    });

    const { getByText } = renderSelect({
      resource: avRegionsApi,
      labelKey: 'value',
      valueKey: 'id',
      classNamePrefix: 'test__regions',
      getResult: 'regions',
      selectByValue: { value: 'TX' },
    });

    await waitFor(() => {
      expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);
    });
    await fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          'test-form-input': {
            id: 'TX',
            value: 'Texas',
          },
        }),
        expect.anything()
      );
    });
  });

  it('selects the matching selectByValue option by key', async () => {
    avRegionsApi.postGet.mockResolvedValue({
      data: {
        regions: [
          {
            label: 'Florida',
            value: {
              foo: 'FL',
              bar: '123',
            },
          },
          {
            label: 'Texas',
            value: {
              foo: 'TX',
              bar: '456',
            },
          },
        ],
      },
    });

    const { getByText } = renderSelect({
      resource: avRegionsApi,
      classNamePrefix: 'test__regions',
      getResult: 'regions',
      selectByValue: { key: 'foo', value: 'TX' },
    });

    await waitFor(() => {
      expect(avRegionsApi.postGet).toHaveBeenCalledTimes(1);
    });
    await fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          'test-form-input': {
            label: 'Texas',
            value: {
              foo: 'TX',
              bar: '456',
            },
          },
        }),
        expect.anything()
      );
    });
  });

  it('does not select an option when none match', async () => {
    avRegionsApi.postGet.mockResolvedValue({
      data: {
        regions: [
          {
            id: 'FL',
            value: 'Florida',
          },
          {
            id: 'TX',
            value: 'Texas',
          },
        ],
      },
    });

    const { getByText } = renderSelect({
      resource: avRegionsApi,
      labelKey: 'value',
      valueKey: 'id',
      classNamePrefix: 'test__regions',
      getResult: 'regions',
      selectByValue: { value: 'KY' },
    });

    await fireEvent.click(getByText('Submit'));
    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});

// -----
const renderResourceSelect = (props) => {
  const Component = () => {
    const [cacheUniq, setCacheUniq] = useState(false);

    return (
      <Form
        initialValues={{
          'test-form-input': undefined,
        }}
        onSubmit={onSubmit}
      >
        <ResourceSelect
          name="test-form-input"
          cacheUniq={cacheUniq}
          parameters={({ q, limit, offset = 0, ...rest }) => ({
            q,
            limit,
            testq: q,
            testPage: offset / limit + 1,
            offset,
            ...rest,
          })}
          {...props}
        />
        <Button
          type="button"
          data-testid="btn-toggle-cacheUniq"
          onClick={() => setCacheUniq(!cacheUniq)}
        >
          Toggle Cache Uniq Button
        </Button>
        <Button type="submit">Submit</Button>
      </Form>
    );
  };
  return render(<Component />);
};

describe('API calls', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('Sends custom parameters to API', async () => {
    avRegionsApi.postGet.mockResolvedValueOnce({
      data: {
        regions: [
          {
            id: 'FL',
            value: 'Florida',
          },
        ],
      },
    });

    const { container, getByText } = renderResourceSelect({
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

    const regionsOption = await waitFor(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    expect(avRegionsApi.postGet).toHaveBeenCalledTimes(2); // should be 1...
    expect(avRegionsApi.postGet.mock.calls[1][0]).toBe(
      'q=&limit=50&testq=&testPage=1&offset=0'
    );
  });

  it('Sends custom parameters to API with method=POST', async () => {
    avRegionsApi.post.mockResolvedValueOnce({
      data: {
        regions: [
          {
            id: 'FL',
            value: 'Florida',
          },
        ],
      },
    });

    const { container, getByText } = renderResourceSelect({
      resource: avRegionsApi,
      labelKey: 'value',
      valueKey: 'id',
      classNamePrefix: 'test__regions',
      getResult: 'regions',
      minCharsToSearch: 3,
      method: 'POST',
    });

    const regionsSelect = container.querySelector('.test__regions__control');
    fireEvent.keyDown(regionsSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(regionsSelect, { key: 'Enter', keyCode: 13 });

    const regionsOption = await waitFor(() => getByText('Florida'));
    expect(regionsOption).toBeDefined();

    expect(avRegionsApi.post).toHaveBeenCalledTimes(1);
    expect(avRegionsApi.post.mock.calls[0][0]).toStrictEqual({
      customerId: undefined,
      q: '',
      limit: 50,
      testq: '',
      testPage: 1,
      offset: 0,
    });
  });

  // ---

  // -----
  const renderGQLResourceSelect = (props) => {
    const Component = () => {
      const [cacheUniq, setCacheUniq] = useState(false);

      return (
        <Form
          initialValues={{
            'region-form-input': undefined,
          }}
          onSubmit={onSubmit}
        >
          <ResourceSelect
            name="region-form-input"
            cacheUniq={cacheUniq}
            graphqlConfig={{
              type: 'region',
              query: `{regionPagination{count pageInfo{hasNextPage}items{id value}}}`,
            }}
            {...props}
          />
          <Button
            type="button"
            data-testid="btn-toggle-cacheUniq"
            onClick={() => setCacheUniq(!cacheUniq)}
          >
            Toggle Cache Uniq Button
          </Button>
          <Button type="submit">Submit</Button>
        </Form>
      );
    };
    return render(<Component />);
  };

  it('Queries using graphQl', async () => {
    avRegionsApi.post.mockResolvedValueOnce({
      data: {
        regionPagination: {
          count: 57,
          pageInfo: {
            hasNextPage: true,
          },
          items: [
            {
              id: 'UmVnaW9uOkFM',
              value: 'New York',
            },
          ],
        },
      },
    });

    const { container, getByText } = renderGQLResourceSelect({
      resource: avRegionsApi,
      labelKey: 'value',
      valueKey: 'id',
      classNamePrefix: 'test__regions',
      // getResult: 'regions',
      getResult: (data) => data.regionPagination.items,
    });

    const regionsSelect = container.querySelector('.test__regions__control');
    fireEvent.keyDown(regionsSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(regionsSelect, { key: 'Enter', keyCode: 13 });

    const regionsOption = await waitFor(() => getByText('New York'));
    expect(regionsOption).toBeDefined();

    expect(avRegionsApi.post).toHaveBeenCalledTimes(1);
    expect(avRegionsApi.post.mock.calls[0][0]).toMatchObject({
      query: `{regionPagination{count pageInfo{hasNextPage}items{id value}}}`,
      variables: {
        filters: {
          q: '',
        },
        page: 1,
        perPage: 50,
      },
    });
  });
});

describe('Custom Resources', () => {
  describe('AvRegionSelect', () => {
    it('defaults to the user current region when defaultToCurrentRegion true', async () => {
      avRegionsApi.getCurrentRegion.mockResolvedValueOnce({
        data: {
          regions: [
            {
              id: 'FL',
              value: 'Florida',
              currentlySelected: true,
            },
          ],
        },
      });
      // eslint-disable-next-line react/prop-types
      const RegionComponent = ({ regionProps }) => (
        <Form
          initialValues={{
            'test-form-input': undefined,
          }}
          onSubmit={onSubmit}
        >
          <AvRegionSelect {...regionProps} />
          <Button type="submit">Submit</Button>
        </Form>
      );

      const regionProps = {
        name: 'test-form-input',
        classNamePrefix: 'test__region',
        defaultToCurrentRegion: true,
      };

      const { getByText } = render(
        <RegionComponent regionProps={regionProps} />
      );

      await fireEvent.click(getByText('Submit'));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            'test-form-input': {
              id: 'FL',
              value: 'Florida',
              currentlySelected: true,
            },
          }),
          expect.anything()
        );
      });
    });

    it('calls avRegionsApi.all', async () => {
      avRegionsApi.getCurrentRegion.mockResolvedValueOnce({
        data: {
          regions: [
            {
              id: 'FL',
              value: 'Florida',
              currentlySelected: true,
            },
          ],
        },
      });
      avRegionsApi.all.mockResolvedValueOnce([
        {
          id: 'FL',
          value: 'Florida',
        },
        {
          id: 'TX',
          value: 'Texas',
        },
        {
          id: 'WA',
          value: 'Washington',
        },
      ]);

      // eslint-disable-next-line react/prop-types
      const RegionComponent = ({ regionProps }) => (
        <Form
          initialValues={{
            'test-form-input': undefined,
          }}
          onSubmit={onSubmit}
        >
          <AvRegionSelect {...regionProps} />
          <Button type="submit">Submit</Button>
        </Form>
      );

      const regionProps = {
        name: 'test-form-input',
        classNamePrefix: 'test__region',
        defaultToCurrentRegion: true,
      };

      render(<RegionComponent regionProps={regionProps} />);

      expect(avRegionsApi.all).toHaveBeenCalled();
    });

    it('filters when a search value is typed', async () => {
      avRegionsApi.all.mockResolvedValueOnce([
        {
          id: 'FL',
          value: 'Florida',
        },
        {
          id: 'TX',
          value: 'Texas',
        },
        {
          id: 'TN',
          value: 'Tennessee',
        },
        {
          id: 'WA',
          value: 'Washington',
        },
      ]);

      avRegionsApi.getCurrentRegion.mockResolvedValueOnce({
        data: {
          regions: [
            {
              id: 'FL',
              value: 'Florida',
              currentlySelected: true,
            },
          ],
        },
      });

      avRegionsApi.getResult = null;

      // eslint-disable-next-line react/prop-types
      const RegionComponent = ({ regionProps }) => (
        <Form
          initialValues={{
            'test-form-input': undefined,
          }}
          onSubmit={onSubmit}
        >
          <AvRegionSelect {...regionProps} />
          <Button type="submit">Submit</Button>
        </Form>
      );

      const regionProps = {
        name: 'test-form-input',
        classNamePrefix: 'test__region',
        defaultToCurrentRegion: true,
      };

      const { container, getByText, queryByText } = render(
        <RegionComponent regionProps={regionProps} />
      );

      expect(avRegionsApi.all).toHaveBeenCalled();

      const regionComp = container.querySelector('.test__region__control');
      const regionInput = container.querySelector('.test__region__input');
      fireEvent.keyDown(regionComp, { key: 'ArrowDown', keyCode: 40 });
      fireEvent.keyDown(regionComp, { key: 'Enter', keyCode: 13 });

      await waitFor(() => expect(getByText('Texas')).toBeDefined());

      fireEvent.keyDown(regionInput, {
        key: 'w',
        keyCode: 87,
      });

      waitFor(async () => {
        const regionOptionWA = getByText('Washington');
        fireEvent.click(regionOptionWA);
        expect(queryByText('Florida')).toBeNull();

        fireEvent.click(getByText('Submit'));

        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
              'test-form-input': {
                id: 'WA',
                value: 'Washington',
              },
            }),
            expect.anything()
          );
        });
      });

      // uses the new filter to search by id
      fireEvent.keyDown(regionInput, {
        key: 't',
        keyCode: 84,
      });
      fireEvent.keyDown(regionInput, {
        key: 'x',
        keyCode: 88,
      });

      waitFor(async () => {
        const regionOptionTX = getByText('Texas');
        fireEvent.click(regionOptionTX);
        expect(queryByText('Florida')).toBeNull();

        fireEvent.click(getByText('Submit'));

        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
              'test-form-input': {
                id: 'TX',
                value: 'Texas',
              },
            }),
            expect.anything()
          );
        });
      });
    });

    it('filters using the default search when a search value is typed', async () => {
      avRegionsApi.getCurrentRegion.mockResolvedValueOnce({
        data: {
          regions: [
            {
              id: 'FL',
              value: 'Florida',
              currentlySelected: true,
            },
          ],
        },
      });

      avRegionsApi.all.mockResolvedValue([
        {
          id: 'FL',
          value: 'Florida',
        },
        {
          id: 'TX',
          value: 'Texas',
        },
        {
          id: 'TN',
          value: 'Tennessee',
        },
        {
          id: 'WA',
          value: 'Washington',
        },
      ]);

      // eslint-disable-next-line react/prop-types
      const RegionComponent = ({ regionProps }) => (
        <Form
          initialValues={{
            'test-form-input': undefined,
          }}
          onSubmit={onSubmit}
        >
          <AvRegionSelect {...regionProps} />
          <Button type="submit">Submit</Button>
        </Form>
      );

      const regionProps = {
        name: 'test-form-input',
        classNamePrefix: 'test__region',
        defaultToCurrentRegion: true,
        pageAllSearchBy: 'not a method',
      };

      const { container, getByText, queryByText } = render(
        <RegionComponent regionProps={regionProps} />
      );

      expect(avRegionsApi.all).toHaveBeenCalled();

      const regionComp = container.querySelector('.test__region__control');
      const regionInput = container.querySelector('.test__region__input');
      fireEvent.keyDown(regionComp, { key: 'ArrowDown', keyCode: 40 });
      fireEvent.keyDown(regionComp, { key: 'Enter', keyCode: 13 });

      await waitFor(() => expect(getByText('Texas')).toBeDefined());

      fireEvent.keyDown(regionInput, {
        key: 'w',
        keyCode: 87,
      });

      waitFor(async () => {
        const regionOptionWA = getByText('Washington');
        fireEvent.click(regionOptionWA);
        expect(queryByText('Florida')).toBeNull();

        fireEvent.click(getByText('Submit'));

        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
              'test-form-input': {
                id: 'WA',
                value: 'Washington',
              },
            }),
            expect.anything()
          );
        });
      });

      // does not use the new filter to search by id
      fireEvent.keyDown(regionInput, {
        key: 't',
        keyCode: 84,
      });
      fireEvent.keyDown(regionInput, {
        key: 'x',
        keyCode: 88,
      });

      waitFor(async () => {
        const regionOptionTX = getByText('Texas');
        fireEvent.click(regionOptionTX);
        expect(queryByText('Florida')).toBeNull();

        fireEvent.click(getByText('Submit'));

        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({}),
            expect.anything()
          );
        });
      });
    });

    it('uses getResult', async () => {
      avRegionsApi.getCurrentRegion.mockResolvedValueOnce({
        data: {
          regions: [
            {
              id: 'FL',
              value: 'Florida',
              currentlySelected: true,
            },
          ],
        },
      });
      avRegionsApi.all.mockResolvedValueOnce([
        {
          id: 'FL',
          value: 'Florida',
        },
        {
          id: 'TX',
          value: 'Texas',
        },
        {
          id: 'WA',
          value: 'Washington',
        },
      ]);
      // eslint-disable-next-line react/prop-types
      const RegionComponent = ({ regionProps }) => (
        <Form
          initialValues={{
            'test-form-input': undefined,
          }}
          onSubmit={onSubmit}
        >
          <AvRegionSelect {...regionProps} />
          <Button type="submit">Submit</Button>
        </Form>
      );

      const regionProps = {
        name: 'test-form-input',
        classNamePrefix: 'test__region',
        getResult: (data) => data.filter((region) => region.id === 'FL'),
        defaultToCurrentRegion: true,
      };

      const { container, getAllByText, queryByText } = render(
        <RegionComponent regionProps={regionProps} />
      );

      expect(avRegionsApi.all).toHaveBeenCalled();

      const regionComp = container.querySelector('.test__region__control');
      fireEvent.keyDown(regionComp, { key: 'ArrowDown', keyCode: 40 });
      await waitFor(() => getAllByText('Florida'));

      expect(getAllByText('Florida')).toBeDefined();
      expect(queryByText('Texas')).toBeNull();
      expect(queryByText('Washington')).toBeNull();
    });
  });
});
