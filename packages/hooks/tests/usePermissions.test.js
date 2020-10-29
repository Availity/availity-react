import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avPermissionsApi } from '@availity/api-axios';
import { usePermissions } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data, isFetching, error } = usePermissions(
    {},
    { cacheTime: 0, retry: false }
  );

  if (isFetching) return <span data-testid="loading" />;
  if (data) return <span data-testid="valid">{JSON.stringify(data)}</span>;
  if (error) return <span data-testid="invalid">An error occurred</span>;

  return null;
};

describe('usePermissions', () => {
  test('should return loading', async () => {
    avPermissionsApi.getPermissions.mockResolvedValueOnce({
      id: '44',
      description: 'test',
      links: { self: { href: 'test.com' } },
    });

    const { getByTestId } = render(<Component />);

    await waitForElement(() => getByTestId('loading'));
  });

  test('should set error on rejected promise', async () => {
    avPermissionsApi.getPermissions.mockRejectedValueOnce('An error occurred');

    const { getByTestId } = render(<Component />);

    await waitForElement(() => getByTestId('invalid'));
  });

  test('should return permissions', async () => {
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
