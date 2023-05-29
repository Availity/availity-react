import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Disclaimer from '../src/Disclaimer';

describe('Disclaimer', () => {
  afterEach(cleanup);

  test('should render styled', () => {
    const { getByTestId } = render(<Disclaimer />);

    const container = getByTestId('disclaimer');

    expect(container.className).toContain('disclaimer');
    expect(container.className).not.toContain('disclaimer-unstyled');
  });

  test('should render as a div by default', () => {
    const { container } = render(<Disclaimer className="test-class" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  test('should render as different HTML tags', () => {
    const { container } = render(<Disclaimer tag="section" className="test-class" />);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
});
