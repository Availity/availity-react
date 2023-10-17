import React from 'react';
import PropTypes from 'prop-types';
import { waitFor, cleanup } from '@testing-library/react';
import { avUserApi } from '@availity/api-axios';
import { QueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '..';
import renderWithClient from './util';

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
  const state = useCurrentUser({ cacheTime: 0, retry: false });

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

describe('useCurrentUser', () => {
  test('should set error on rejected promise', async () => {
    avUserApi.me.mockRejectedValueOnce('An error occurred');

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

  test('should return user', async () => {
    avUserApi.me.mockResolvedValueOnce({
      id: 'aka12345',
      userId: 'testExample',
      akaname: 'aka12345',
      lastName: 'Last',
      firstName: 'First',
    });

    const { getByText } = renderWithClient(queryClient, <Component log={pushState} />);

    getByText('Status: loading');
    await waitFor(() => {
      const el = getByText(
        `Data: ${JSON.stringify({
          id: 'aka12345',
          userId: 'testExample',
          akaname: 'aka12345',
          lastName: 'Last',
          firstName: 'First',
        })}`
      );
      expect(el).toBeDefined();
    });
  });
});
