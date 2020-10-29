import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avUserApi } from '@availity/api-axios';
import { useCurrentUser } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data, isFetching, error } = useCurrentUser({
    cacheTime: 0,
    retry: false,
  });

  if (isFetching) return <span data-testid="loading" />;
  if (data) return <span data-testid="valid">{JSON.stringify(data)}</span>;
  if (error) return <span data-testid="invalid">An error occurred</span>;

  return null;
};

describe('useCurrentUser', () => {
  test('should set error on rejected promise', async () => {
    avUserApi.me.mockRejectedValueOnce('An error occurred');

    const { getByTestId } = render(<Component />);

    await waitForElement(() => getByTestId('invalid'));
  });

  test('should return loading', () => {
    avUserApi.me.mockResolvedValueOnce({
      id: 'aka12345',
      userId: 'testExample',
      akaname: 'aka12345',
      lastName: 'Last',
      firstName: 'First',
    });

    const { getByTestId } = render(<Component />);

    getByTestId('loading');
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

    await waitForElement(() =>
      getByText(
        JSON.stringify({
          id: 'aka12345',
          userId: 'testExample',
          akaname: 'aka12345',
          lastName: 'Last',
          firstName: 'First',
        })
      )
    );
  });
});
