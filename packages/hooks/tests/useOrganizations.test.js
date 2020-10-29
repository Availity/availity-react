import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avOrganizationsApi } from '@availity/api-axios';
import { useOrganizations } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data, isFetching, error } = useOrganizations(
    {},
    { cacheTime: 0, retry: false }
  );

  if (isFetching) return <span data-testid="loading" />;
  if (data) return <span data-testid="valid">{JSON.stringify(data)}</span>;
  if (error) return <span data-testid="invalid">An error occurred</span>;

  return null;
};

describe('useOrganizations', () => {
  test('should set error on rejected promise', async () => {
    avOrganizationsApi.getOrganizations.mockRejectedValueOnce(
      'An error occurred'
    );

    const { getByTestId } = render(<Component />);

    await waitForElement(() => getByTestId('invalid'));
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

  test('should return organizations', async () => {
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
