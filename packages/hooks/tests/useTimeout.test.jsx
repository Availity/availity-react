import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useTimeout } from '../src/index';

const Component = () => {
  const timeout = useTimeout(1000);

  return <p data-testid="timeout-test">{timeout ? 'True' : 'False'}</p>;
};

vi.useFakeTimers();

describe('useTimeout', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('should render "False"', () => {
    const { getByTestId } = render(<Component />);

    expect(getByTestId('timeout-test').textContent).toEqual('False');
  });

  test.todo('should render "True"', async () => {
    const { getByTestId } = render(<Component />);

    vi.runAllTimers();

    await waitFor(() => {
      expect(getByTestId('timeout-test').textContent).toEqual('True');
    });
  });
});
