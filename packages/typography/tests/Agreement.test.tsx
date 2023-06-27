import React from 'react';
import { render } from '@testing-library/react';
import Agreement from '../src/Agreement';

describe('Agreement', () => {
  test('should render with className', () => {
    const { getByTestId } = render(<Agreement className="test-class" />);

    const container = getByTestId('agreement');

    expect(container.className).toContain('test-class');
    expect(container.className).toContain('agreement');
  });

  test('should render with children', () => {
    const { getByTestId } = render(<Agreement className="test-class">Agreement Text</Agreement>);

    const container = getByTestId('agreement');

    expect(container.textContent).toBe('Agreement Text');
  });

  test('should render as a div by default', () => {
    const { container } = render(<Agreement className="test-class" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  test('should render as different HTML tags', () => {
    const { container } = render(<Agreement tag="section" className="test-class" />);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
});
