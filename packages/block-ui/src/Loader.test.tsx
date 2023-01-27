import React from 'react';
import { render } from '@testing-library/react';

import Loader, { Bullet } from './Loader';

describe('Loader', () => {
  test('should be defined', () => {
    expect(Loader).toBeDefined();
  });

  test('should render', () => {
    const { getAllByText } = render(<Loader />);
    const result = getAllByText(/•/);
    expect(result.length).toBe(3);
  });
});

describe('Bullet', () => {
  test('should be defined', () => {
    expect(Bullet).toBeDefined();
  });

  test('should render', () => {
    const { getByText } = render(<Bullet />);
    expect(getByText(/•/)).toBeDefined();
  });
});
