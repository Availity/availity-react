import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Pages from '../PaginationControls/Pages';

describe.only('Pages', () => {
  afterEach(cleanup);
  const mockFn = jest.fn();
  test('renders successfully', () => {
    const { container } = render(<Pages onPageChange={mockFn} pageCount={5} />);
    expect(container).toBeDefined();
  });

  test('renders nav buttons by default', () => {
    const { getByLabelText } = render(
      <Pages onPageChange={mockFn} pageCount={5} />
    );
    ['First', 'Previous', 'Next', 'Last'].forEach(label => {
      const navLink = getByLabelText(label);
      expect(navLink).toBeDefined();
    });
  });

  test('should add correct classes for size,align,unstyled', () => {
    const { container, rerender } = render(
      <Pages onPageChange={mockFn} pageCount={5} />
    );
    expect(container.firstChild).toHaveClass('pagination flex-grow-1');

    [
      {
        prop: 'size',
        options: ['sm', 'md', 'lg', 'random'],
        class: 'pagination-<option>',
      },
      {
        prop: 'align',
        options: ['start', 'center', 'end', 'between'],
        class: 'justify-content-<option>',
      },
      {
        prop: 'unstyled',
        options: [true, false],
        class: {
          [false]: 'pagination-styled',
          [true]: 'pagination-unstyled',
        },
      },
    ].forEach(testCase => {
      testCase.options.forEach(option => {
        const expected =
          typeof testCase.class === 'string'
            ? testCase.class.replace('<option>', option)
            : testCase.class[option];

        const testProps = {
          [testCase.prop]: option,
        };

        rerender(<Pages onPageChange={mockFn} {...testProps} pageCount={5} />);
        expect(container.firstChild).toHaveClass(expected);
      });
    });
  });
});
