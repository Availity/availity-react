import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avOrganizationsApi } from '@availity/api-axios';
import { ReactQueryConfigProvider } from 'react-query';
import { useOrganizations } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data: organizations, status, error } = useOrganizations();

  return (
    <ReactQueryConfigProvider config={{ cacheTime: 0, retry: false }}>
      {status === 'loading' ? (
        <span data-testid="loading" />
      ) : (
        JSON.stringify(organizations || error)
      )}
    </ReactQueryConfigProvider>
  );
};

describe('useOrganizations', () => {
  test('should set error on rejected promise', async () => {
    avOrganizationsApi.getOrganizations.mockRejectedValueOnce(
      'An error occurred'
    );

    const { getByText } = render(<Component />);

    await waitForElement(() => getByText('"An error occurred"'));
  });
  test('should return loading', () => {
    avOrganizationsApi.getOrganizations.mockResolvedValueOnce({
      data: {
        organizations: [
          {
            links: {
              permissions: { href: 'test' },
              patients: { href: 'test' },
              self: { href: 'test' },
              admin: { href: 'test' },
              businessArrangements: { href: 'test' },
              users: { href: 'test' },
            },
          },
        ],
      },
    });

    const { getByTestId } = render(<Component />);

    getByTestId('loading');
  });

  test('should return user', async () => {
    avOrganizationsApi.getOrganizations.mockResolvedValueOnce({
      data: {
        organizations: [
          {
            links: {
              permissions: { href: 'test' },
              patients: { href: 'test' },
              self: { href: 'test' },
              admin: { href: 'test' },
              businessArrangements: { href: 'test' },
              users: { href: 'test' },
            },
          },
        ],
      },
    });

    const { getByText } = render(<Component />);

    await waitForElement(() =>
      getByText(
        JSON.stringify({
          data: {
            organizations: [
              {
                links: {
                  permissions: { href: 'test' },
                  patients: { href: 'test' },
                  self: { href: 'test' },
                  admin: { href: 'test' },
                  businessArrangements: { href: 'test' },
                  users: { href: 'test' },
                },
              },
            ],
          },
        })
      )
    );
  });
});
