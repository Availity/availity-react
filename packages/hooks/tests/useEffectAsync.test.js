import React, { useState } from 'react';
import { render, waitForElement, act, cleanup } from '@testing-library/react';
import { useEffectAsync } from '..';

afterEach(cleanup);

// eslint-disable-next-line react/prop-types
const Component = ({ asyncFunc }) => {
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
    // Create Async Method
    // Render
    const { getByTestId } = render(<Component asyncFunc={asyncFunc} />);

    // Expect the component to render "Hello"
    expect(getByTestId('effect-test').textContent).toEqual('Hello');

    // Wait for the Async Function to be called after mounting
    await waitForElement(() => getByTestId('effect-test'));

    // Expect the component to render "World"
    expect(getByTestId('effect-test').textContent).toEqual('World');
  });
});
