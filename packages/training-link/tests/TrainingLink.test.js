import React from 'react';
import { render } from 'react-testing-library';
import TrainingLink from '..';

describe('TrainingLink', () => {
  test('should not render with link and name', () => {
    const { container } = render(
      <TrainingLink link="http://catvidoes.com" name="Appeals" />
    );

    expect(container).toMatchSnapshot();
  });
});
