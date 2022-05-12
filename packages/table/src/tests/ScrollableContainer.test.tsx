import React from 'react';
import { render } from '@testing-library/react';
import ScrollableContainer from '../ScrollableContainer';

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

  test('should render multiple children', () => {
    const { container } = render(
      <ScrollableContainer>
        <div>This is my Content.</div>
        <div>This is my Content.</div>
      </ScrollableContainer>
    );

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
