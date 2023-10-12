import React from 'react';
import PropTypes from 'prop-types';
import { waitFor, cleanup } from '@testing-library/react';
import { avOrganizationsApi } from '@availity/api-axios';
import { QueryClient } from '@tanstack/react-query';
import renderWithClient from './util';
import { useOrganizations } from '..';

jest.mock('@availity/api-axios');

let queryStates = [];
beforeEach(() => {
  queryStates = [];
});

const queryClient = new QueryClient();

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  queryClient.clear();
  queryStates = [];
});

const pushState = (state) => {
  queryStates.push(state);
};

const Component = ({ log }) => {
  // Mirror testing methods from react-query instead of relying on timing or booleans
  // https://github.com/tannerlinsley/react-query/blob/master/src/react/tests/useQuery.test.tsx
  const state = useOrganizations({}, { cacheTime: 0, retry: false });

  // not directly used in assertions here, but useful for debugging purposes
  if (log) log(state);

  const { data, error, status } = state;

  return (
    <div>
      <h1>Status: {status}</h1>
      <h1>Data: {JSON.stringify(data)}</h1>
      <h1>Error: {error}</h1>
    </div>
  );
};

Component.propTypes = {
  log: PropTypes.func,
};

describe('useOrganizations', () => {
  test('should return an error', async () => {
    avOrganizationsApi.getOrganizations.mockRejectedValueOnce('An error occurred');

    const { getByText } = renderWithClient(queryClient, <Component log={pushState} />);

    getByText('Status: loading');
    await waitFor(() => {
      const el = getByText('Status: error');
      expect(el).toBeDefined();
    });
    await waitFor(() => {
      const el = getByText('Error: An error occurred');
      expect(el).toBeDefined();
    });
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

    const { getByText } = renderWithClient(queryClient, <Component log={pushState} />);

    getByText('Status: loading');
    await waitFor(() => {
      const el = getByText(
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
      );
      expect(el).toBeDefined();
    });
  });
});
