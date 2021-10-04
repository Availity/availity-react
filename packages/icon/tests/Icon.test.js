import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Icon from '..';

afterEach(cleanup);

describe('Icon', () => {
  test('should render default size and aria-hidden', () => {
    const { getByTestId } = render(<Icon data-testid="icon" name="home" />);

    const icon = getByTestId('icon');

    expect(icon).toBeDefined();

    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  test('should render given a size', () => {
    const { container } = render(<Icon data-testid="icon" name="home" size="3x" />);

    const icon = container.querySelector('.icon-3x');

    expect(icon).not.toBe(null);
  });

  test('should render with extra className', () => {
    const { getByTestId } = render(<Icon data-testid="icon" name="home" className="custom-classname" />);

    const icon = getByTestId('icon');

    expect(icon.className).toBe('icon icon-home custom-classname');
  });

  test('should render with different color', () => {
    const { getByTestId } = render(<Icon data-testid="icon" name="home" color="primary" />);

    const icon = getByTestId('icon');

    expect(icon.className).toBe('icon icon-home text-primary');
  });

  test('should render with pointer if onClick', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Icon data-testid="icon" name="home" color="primary" onClick={onClick} />);

    const icon = getByTestId('icon');

    expect(icon.style.cursor).toBe('pointer');
  });
});
