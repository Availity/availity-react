import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import Icon from '..';

describe('Icon', () => {
  test('should render default size and aria-label', () => {
    const { getByTestId } = render(<Icon data-testid="icon" name="home" />);

    const icon = getByTestId('icon');

    expect(icon).toBeDefined();

    expect(icon.getAttribute('aria-label')).toBe('home');
  });

  test('should render given a size', () => {
    const { container } = render(
      <Icon data-testid="icon" name="home" size="3x" />
    );

    const icon = container.querySelector('.icon-3x');

    expect(icon).not.toBe(null);
  });

  test('should render custom aria-label', () => {
    const { getByTestId } = render(
      <Icon data-testid="icon" name="home" aria-label="custom label" />
    );

    const icon = getByTestId('icon');

    expect(icon.getAttribute('aria-label')).toBe('custom label');
  });

  test('should render with extra className', () => {
    const { getByTestId } = render(
      <Icon data-testid="icon" name="home" className="custom-classname" />
    );

    const icon = getByTestId('icon');

    expect(icon.className).toBe('icon icon-home custom-classname');
  });
});
