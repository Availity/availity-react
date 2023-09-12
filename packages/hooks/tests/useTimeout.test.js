import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useTimeout } from '..';

const Component = () => {
  const timeout = useTimeout(1000);

  return <p data-testid="timeout-test">{timeout ? 'True' : 'False'}</p>;
};

jest.useFakeTimers();

describe('useTimeout', () => {
  test('should render "False"', () => {
    const { getByTestId } = render(<Component />);

    expect(getByTestId('timeout-test').textContent).toEqual('False');
  });

  test('should render "True"', async () => {
    const { getByTestId } = render(<Component />);

    jest.runAllTimers();

    await waitFor(() => {
      expect(getByTestId('timeout-test').textContent).toEqual('True');
    });
  });
});
