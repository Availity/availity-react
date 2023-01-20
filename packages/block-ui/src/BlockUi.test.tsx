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
    const { getAllByText } = render(
      <BlockUi blocking message="Loading">
        <p>child</p>
      </BlockUi>
    );
    expect(getAllByText('Loading')[1]).toBeDefined();
  });

  test('should block and have default message for screenreader', () => {
    const { getAllByText } = render(
      <BlockUi blocking>
        <p>child</p>
      </BlockUi>
    );

    // component inserts two focusable elements to control tabbing behavior
    // and needs a screenreader message for each
    const srMessage1 = getAllByText('loading')[0];
    const srMessage2 = getAllByText('loading')[1];

    expect(srMessage1).toBeDefined();
    expect(srMessage1?.className).toContain('sr-only');

    expect(srMessage2).toBeDefined();
    expect(srMessage2?.className).toContain('sr-only');
  });

  test('should block and have custom message for screenreader', () => {
    const { getAllByText, queryByText } = render(
      <BlockUi blocking message="Loading">
        <p>child</p>
      </BlockUi>
    );

    // default screenreader message "loading" should be replaced
    expect(queryByText('loading')).toBeNull();

    const srMessage = getAllByText('Loading')[0];
    expect(srMessage).toBeDefined();
    expect(srMessage?.className).toContain('sr-only');
  });
});
