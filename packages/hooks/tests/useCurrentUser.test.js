import React from 'react';
import PropTypes from 'prop-types';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avUserApi } from '@availity/api-axios';
import { queryCache } from 'react-query';
import { useCurrentUser } from '..';

jest.mock('@availity/api-axios');

let queryStates = [];
beforeEach(() => {
  queryStates = [];
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  queryCache.clear();
  queryStates = [];
});

const pushState = state => {
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

    const { getByText } = render(<Component log={pushState} />);

    getByText('Status: loading');
    await waitForElement(() => getByText('Status: error'));
    await waitForElement(() => getByText('Error: An error occurred'));
  });

  test('should return user', async () => {
    avUserApi.me.mockResolvedValueOnce({
      id: 'aka12345',
      userId: 'testExample',
      akaname: 'aka12345',
      lastName: 'Last',
      firstName: 'First',
    });

    const { getByText } = render(<Component />);

    getByText('Status: loading');
    await waitForElement(() =>
      getByText(
        `Data: ${JSON.stringify({
          id: 'aka12345',
          userId: 'testExample',
          akaname: 'aka12345',
          lastName: 'Last',
          firstName: 'First',
        })}`
      )
    );
  });
});
