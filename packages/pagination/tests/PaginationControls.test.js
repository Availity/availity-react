import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect';

import { PaginationControls } from '../PaginationControls';

describe('PaginationControls', () => {
  afterEach(cleanup);
  let baseProps;
  beforeEach(() => {
    baseProps = {
      pageCount: 5,
      onPageChange: jest.fn(),
    };
  });

  test('renders successfully', () => {
    const { container } = render(<PaginationControls {...baseProps} />);
    expect(container).toBeDefined();
  });

  describe('Pages', () => {
    const pagesTestId = 'page-selector';
    test('renders pages component', () => {
      const { getByTestId } = render(<PaginationControls {...baseProps} />);
      expect(getByTestId(pagesTestId)).toBeDefined();
    });

    test('passed down pagesClassName', () => {
      const mockClass = 'testPageClass';
      const { getByTestId } = render(
        <PaginationControls {...baseProps} pagesClassName={mockClass} />
      );
      expect(getByTestId(pagesTestId)).toHaveClass(mockClass);
    });
    test('use pageButtonAlign or align', () => {
      const { getByTestId, rerender } = render(
        <PaginationControls {...baseProps} />
      );
      [
        {
          props: {
            pageButtonsAlign: 'start',
            align: 'center',
          },
          expected: 'start',
        },
        {
          props: {
            pageButtonsAlign: 'start',
            align: 'end',
          },
          expected: 'start',
        },
        {
          props: {
            pageButtonsAlign: 'center',
            align: 'start',
          },
          expected: 'center',
        },
        {
          props: {
            pageButtonsAlign: 'end',
            align: 'start',
          },
          expected: 'end',
        },
        {
          props: {
            pageButtonsAlign: 'between',
            align: 'start',
          },
          expected: 'between',
        },
        {
          props: {
            align: 'start',
          },
          expected: 'start',
        },
        {
          props: {
            align: 'center',
          },
          expected: 'center',
        },
        {
          props: {
            align: 'end',
          },
          expected: 'end',
        },
        {
          props: {
            align: 'between',
          },
          expected: 'between',
        },
      ].forEach(testCase => {
        const props = { ...baseProps, ...testCase.props };
        rerender(<PaginationControls {...props} />);
        expect(getByTestId(pagesTestId)).toHaveClass(
          `justify-content-${testCase.expected}`
        );
      });
    });
  });
});
