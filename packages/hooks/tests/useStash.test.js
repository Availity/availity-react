import React from 'react';
import PropTypes from 'prop-types';
import { waitFor, cleanup } from '@testing-library/react';
import { avStashApi } from '@availity/api-axios';
import { QueryClient } from '@tanstack/react-query';
import { useStash } from '..';
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

const Component = ({ sessionId, log }) => {
  // Mirror testing methods from react-query instead of relying on timing or booleans
  // https://github.com/tannerlinsley/react-query/blob/master/src/react/tests/useQuery.test.tsx
  const state = useStash(sessionId, { cacheTime: 0, retry: false });

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
  sessionId: PropTypes.string,
  log: PropTypes.func,
};

describe('useStash', () => {
  test('should return an error', async () => {
    avStashApi.get.mockRejectedValueOnce('An error occurred');

    const { getByText } = renderWithClient(queryClient, <Component sessionId="test-session-id" log={pushState} />);

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

  test('should return stash data', async () => {
    const mockData = { key: 'value', nested: { foo: 'bar' } };
    avStashApi.get.mockResolvedValueOnce({ data: mockData });

    const { getByText } = renderWithClient(queryClient, <Component sessionId="test-session-id" log={pushState} />);

    getByText('Status: loading');
    await waitFor(() => {
      const el = getByText(`Data: ${JSON.stringify(mockData)}`);
      expect(el).toBeDefined();
    });
  });

  test('should not fetch when sessionId is empty', () => {
    const { getByText } = renderWithClient(queryClient, <Component sessionId="" log={pushState} />);

    getByText('Status: loading');
    expect(avStashApi.get).not.toHaveBeenCalled();
  });
});
