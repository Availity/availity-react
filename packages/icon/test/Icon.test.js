import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Icon from '..';

describe('Icon', () => {
  test('should render normal size', () => {
    const { getByTestId } = render(<Icon data-testid="icon" name="home" />);

    const icon = getByTestId('icon');

    expect(icon).toBeDefined();
  });
});
