import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Icon from '..';

describe('Icon', () => {
  test('should render normal size when given no size prop', () => {
    const { getByTestId } = render(<Icon data-testid="icon" name="home" />);

    const icon = getByTestId('icon');

    expect(icon).toBeDefined();
  });

  test('should render given a size', () => {
    const { container } = render(
      <Icon data-testid="icon" name="home" size="7" />
    );

    const icon = container.querySelector('.icon-5x');

    expect(icon).toBeDefined();
  });
});
