import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avUserApi } from '@availity/api-axios';
import { useCurrentUser } from '..';

jest.mock('@availity/api-axios');

avUserApi.me.mockResolvedValue({
  id: 'aka12345',
  userId: 'testExample',
  akaname: 'aka12345',
  lastName: 'Last',
  firstName: 'First',
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const [user, loading] = useCurrentUser();

  return loading ? <span data-testid="loading" /> : JSON.stringify(user);
};

describe('useCurrentUser', () => {
  test('should return loading', () => {
    const { getByTestId } = render(<Component />);

    getByTestId('loading');
  });

  test('should return user', async () => {
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
