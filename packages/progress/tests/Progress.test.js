import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Progress from '..';

describe('Progress', () => {
  afterEach(cleanup);

  test('should render striped style', () => {
    const { getByTestId } = render(<Progress striped />);

    const container = getByTestId('progress-inner');

    expect(container.className).toContain('progress-bar-striped');
  });

  test('should render animated style', () => {
    const { getByTestId } = render(<Progress animated />);

    const container = getByTestId('progress-inner');

    expect(container.className).toContain('progress-bar-animated');
  });

  test('should render complete style', () => {
    const { getByTestId } = render(<Progress complete />);

    const container = getByTestId('progress-outer');

    expect(container.className).toContain('progress-complete');
  });
});
