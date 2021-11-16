import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Agreement from './Agreement';

describe('Agreement', () => {
  afterEach(cleanup);

  test('should render styled', () => {
    const { getByTestId } = render(<Agreement data-testid="agreement" />);

    const container = getByTestId('agreement');

    expect(container.className).toContain('agreement');
  });
});
