import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avPermissionsApi } from '@availity/api-axios';
import { ReactQueryConfigProvider } from 'react-query';
import { usePermissions } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data: permissions, status, error } = usePermissions();

  return (
    <ReactQueryConfigProvider config={{ cacheTime: 0, retry: false }}>
      {status === 'loading' ? (
        <span data-testid="loading" />
      ) : (
        JSON.stringify(permissions || error)
      )}
    </ReactQueryConfigProvider>
  );
};

describe('usePermissions', () => {
  test('should set error on rejected promise', async () => {
    avPermissionsApi.getPermissions.mockRejectedValueOnce('An error occurred');

    const { getByText } = render(<Component />);

    await waitForElement(() => getByText('"An error occurred"'));
  });
  test('should return loading', () => {
    avPermissionsApi.getPermissions.mockResolvedValueOnce({
      id: '44',
      description: 'test',
      links: { self: { href: 'test.com' } },
    });

    const { getByTestId } = render(<Component />);

    getByTestId('loading');
  });

  test('should return user', async () => {
    avPermissionsApi.getPermissions.mockResolvedValueOnce({
      id: '44',
      description: 'test',
      links: { self: { href: 'test.com' } },
    });

    const { getByText } = render(<Component />);

    await waitForElement(() =>
      getByText(
        JSON.stringify({
          id: '44',
          description: 'test',
          links: { self: { href: 'test.com' } },
        })
      )
    );
  });
});
