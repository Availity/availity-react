import React, { useState } from 'react';
import { render, waitFor, act, cleanup } from '@testing-library/react';
import { useEffectAsync } from '../src/index';

afterEach(cleanup);

const Component = ({ asyncFunc }: { asyncFunc: () => Promise<string> }) => {
  const [state, setState] = useState('Hello');

  useEffectAsync(async () => {
    const newState = await asyncFunc();

    act(() => setState(newState));
  }, []);

  return <div data-testid="effect-test">{state}</div>;
};
const asyncFunc = () => Promise.resolve('World');

describe('useEffectAsync', () => {
  test('should render "Hello" then "World"', async () => {
    const { getByTestId } = render(<Component asyncFunc={asyncFunc} />);

    expect(getByTestId('effect-test').textContent).toEqual('Hello');

    await waitFor(() => getByTestId('effect-test'));

    expect(getByTestId('effect-test').textContent).toEqual('World');
  });
});
