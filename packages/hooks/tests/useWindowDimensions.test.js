import React from 'react';
import { render, waitFor, act, fireEvent } from '@testing-library/react';
import { useWindowDimensions } from '..';

const Component = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div data-testid="window_dimensions">
      {' '}
      <span data-testid="window_height">{height}</span>
      <span data-testid="window_width">{width}</span>
    </div>
  );
};

describe('useWindowDimensions', () => {
  test('should show window dimensions', async () => {
    const { getByTestId } = render(<Component />);

    const element = getByTestId('window_dimensions');
    expect(element).not.toBeNull();

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 500;

      fireEvent(window, new Event('resize'));
    });

    const heightEl = getByTestId('window_height');
    const widthEl = getByTestId('window_width');

    await waitFor(() => {
      expect(heightEl.textContent).toBe('500');
      expect(widthEl.textContent).toBe('500');
    });
  });
});
