import React from 'react';
import { render } from '@testing-library/react';
import { ScrollableContainer } from '..';

describe('Scrollable Container', () => {
  test('should render', () => {
    const { container } = render(
      <ScrollableContainer>
        <div>This is my Content.</div>
      </ScrollableContainer>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
