import React from 'react';
import { render } from '@testing-library/react';

import BlockUi from './BlockUi';

describe('BlockUi', () => {
  test('should be defined', () => {
    expect(BlockUi).toBeDefined();
  });

  test('should not render children', () => {
    const { getByText } = render(
      <BlockUi blocking={false}>
        <p>child</p>
      </BlockUi>
    );
    expect(getByText('child')).toBeDefined();
  });

  test('should block and render children', () => {
    const { getByText } = render(
      <BlockUi blocking>
        <p>child</p>
      </BlockUi>
    );
    expect(getByText('child')).toBeDefined();
  });

  test('should block and hide children', () => {
    const { getByText } = render(
      <BlockUi blocking renderChildren={false}>
        <p>child</p>
      </BlockUi>
    );
    expect(() => getByText('child')).toThrow();
  });

  test('should block and use custom message', () => {
    const { getByText } = render(
      <BlockUi blocking message="Loading">
        <p>child</p>
      </BlockUi>
    );
    expect(getByText('Loading')).toBeDefined();
  });
});
