import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avOrganizationsApi } from '@availity/api-axios';
import { useOrganizations } from '..';

jest.mock('@availity/api-axios');

let queryStates = [];
beforeEach(() => {
  queryStates = [];
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  queryStates = [];
});

const Component = () => {
  // Mirror testing methods from react-query instead of relying on timing or booleans
  // https://github.com/tannerlinsley/react-query/blob/master/src/react/tests/useQuery.test.tsx
  const state = useOrganizations({}, { cacheTime: 0, retry: false });

  // not directly used in assertions here, but useful for debugging purposes
  queryStates.push(state);
  const { data, error, status } = state;

  return (
    <div>
      <h1>Status: {status}</h1>
      <h1>Data: {JSON.stringify(data)}</h1>
      <h1>Error: {error}</h1>
    </div>
  );
};

describe('useOrganizations', () => {
  test('should set error on rejected promise', async () => {
    avOrganizationsApi.getOrganizations.mockRejectedValueOnce(
      'An error occurred'
    );

    const { getByText } = render(<Component />);

    await waitForElement(() => getByText('Status: error'));
    await waitForElement(() => getByText('Error: An error occurred'));
  });

  test('should return loading', async () => {
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

    await getByText('Status: loading');
    await waitForElement(() => getByText('Status: success'));
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
        `Data: ${JSON.stringify({
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
        })}`
      )
    );
  });
});
