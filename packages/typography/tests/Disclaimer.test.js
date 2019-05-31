import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Disclaimer } from '..';

describe('Disclaimer', () => {
  afterEach(cleanup);

  test('should render styled', () => {
    const { getByTestId } = render(<Disclaimer />);

    const container = getByTestId('disclaimer');

    expect(container.className).toContain('disclaimer');
    expect(container.className).not.toContain('disclaimer-unstyled');
  });

  test('should render unstyled', () => {
    const { getByTestId } = render(<Disclaimer styled={false} />);

    const container = getByTestId('disclaimer');

    expect(container.className).toContain('disclaimer-unstyled');
  });
});
