import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avProvidersApi } from '@availity/api-axios';
import { useProviders } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data, isFetching, error } = useProviders(
    {
      customerId: 264330,
    },
    { cacheTime: 0, retry: false }
  );

  if (isFetching) return <span data-testid="loading" />;
  if (data) return <span data-testid="valid">{JSON.stringify(data)}</span>;
  if (error) return <span data-testid="invalid">An error occurred</span>;

  return null;
};

describe('useProviders', () => {
  test('should set error on rejected promise', async () => {
    avProvidersApi.getProviders.mockRejectedValueOnce('An error occurred');

    const { getByText } = render(<Component />);

    await waitForElement(() => getByText('An error occurred'));
  });

  test('should return loading', async () => {
    avProvidersApi.getProviders.mockResolvedValueOnce({
      data: {
        providers: [
          {
            id: 'test',
            lastName: 'test',
            firstName: 'test',
            middleName: 'test',
            uiDisplayName: 'test',
          },
        ],
      },
    });

    const { getByTestId } = render(<Component />);

    await waitForElement(() => getByTestId('loading'));
  });

  test('should return providers', async () => {
    avProvidersApi.getProviders.mockResolvedValueOnce({
      data: {
        providers: [
          {
            id: 'test',
            lastName: 'test',
            firstName: 'test',
            middleName: 'test',
            uiDisplayName: 'test',
          },
        ],
      },
    });

    const { getByText } = render(<Component />);

    await waitForElement(() =>
      getByText(
        JSON.stringify({
          data: {
            providers: [
              {
                id: 'test',
                lastName: 'test',
                firstName: 'test',
                middleName: 'test',
                uiDisplayName: 'test',
              },
            ],
          },
        })
      )
    );
  });
});
