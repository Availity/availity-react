import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { useTimeout } from '..';

afterEach(cleanup);

// eslint-disable-next-line react/prop-types
const Component = () => {
  const timeout = useTimeout(1000);

  return <p data-testid="timeout-test">{timeout ? 'True' : 'False'}</p>;
};

describe('useTimeout', () => {
  test('should render "False"', () => {
    const { getByTestId } = render(<Component />);

    expect(getByTestId('timeout-test').textContent).toEqual('False');
  });

  test('should render "True"', async () => {
    const { getByTestId } = render(<Component />);

    await waitFor(() => {
      expect(getByTestId('timeout-test').textContent).toEqual('True');
    });
  });
});
