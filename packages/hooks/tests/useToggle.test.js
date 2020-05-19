import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { useToggle } from '..';

afterEach(cleanup);

// eslint-disable-next-line react/prop-types
const Component = ({ initialToggle = false }) => {
  const [isToggled, toggle] = useToggle(initialToggle);

  return (
    <button type="button" data-testid="toggle-test" onClick={toggle}>
      {isToggled ? 'Hello' : 'World'}
    </button>
  );
};

describe('useToggle', () => {
  test('should render "Hello"', () => {
    const { getByTestId } = render(<Component />);

    expect(getByTestId('toggle-test').textContent).toEqual('World');
  });

  test('should render "World"', () => {
    const { getByTestId } = render(<Component initialToggle />);

    expect(getByTestId('toggle-test').textContent).toEqual('Hello');
  });

  test('should toggle the state when clicked', () => {
    const { getByTestId } = render(<Component />);

    const button = getByTestId('toggle-test');

    expect(button.textContent).toEqual('World');

    fireEvent.click(button);

    expect(getByTestId('toggle-test').textContent).toEqual('Hello');
  });
});
