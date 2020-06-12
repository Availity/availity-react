import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avProvidersApi } from '@availity/api-axios';
import { ReactQueryConfigProvider } from 'react-query';
import { useProviders } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data: providers, status, error } = useProviders({
    customerId: 264330,
  });

  return (
    <ReactQueryConfigProvider config={{ cacheTime: 0, retry: false }}>
      {status === 'loading' ? (
        <span data-testid="loading" />
      ) : (
        JSON.stringify(providers || error)
      )}
    </ReactQueryConfigProvider>
  );
};

describe('useProviders', () => {
  test('should set error on rejected promise', async () => {
    avProvidersApi.getProviders.mockRejectedValueOnce('An error occurred');

    const { getByText } = render(<Component />);

    await waitForElement(() => getByText('"An error occurred"'));
  });
  test('should return loading', () => {
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

    getByTestId('loading');
  });

  test('should return user', async () => {
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
