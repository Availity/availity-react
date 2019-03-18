import React from 'react';
import FavoriteHeart from '..';
import { render } from 'react-testing-library';

describe('FavoriteHeart', () => {
  test('should render', () => {
    const { container } = render(<FavoriteHeart id="123" />);

    expect(container).toBeDefined();
  });
});
