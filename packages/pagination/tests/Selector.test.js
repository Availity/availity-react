import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Selector from '../PaginationControls/Selector';

describe('Selector', () => {
  afterEach(cleanup);
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
  });

  test('renders successfully', () => {
    const { container } = render(
      <Selector
        itemsPerPage={10}
        page={1}
        totalCount={10}
        onCountChange={mockFn}
      />
    );
    expect(container).toBeDefined();
  });

  describe('info', () => {
    test('does not render if itemsPerPage is undefined', () => {
      const { queryByText } = render(
        <Selector page={1} totalCount={10} onCountChange={mockFn} />
      );
      expect(queryByText(/^Showing/)).toBeNull();
    });

    const baseProps = {
      onCountChange: mockFn,
    };

    [
      {
        testName: 'base render for first 10 items of 100 on page 1',
        props: {
          itemsPerPage: 10,
          page: 1,
          totalCount: 100,
        },
        expected: 'Showing Items 0-10 of 100',
      },
      {
        testName: 'renders as expected if on 2nd page with incremented items',
        props: {
          itemsPerPage: 10,
          page: 2,
          totalCount: 100,
        },
        expected: 'Showing Items 10-20 of 100',
      },
      {
        testName: 'renders only 1 item on a single page',
        props: {
          itemsPerPage: 1,
          page: 1,
          totalCount: 10,
        },
        expected: 'Showing Items 0-1 of 10',
      },
      {
        testName: 'renders custom itemLabel if passed in props',
        props: {
          itemsPerPage: 10,
          page: 1,
          totalCount: 100,
          itemLabel: 'Users',
        },
        expected: 'Showing Users 0-10 of 100',
      },
    ].forEach(testCase => {
      test(testCase.testName || testCase.expected, () => {
        const { getByText } = render(
          <Selector {...baseProps} {...testCase.props} />
        );
        const infoElm = getByText(/^Showing/);
        expect(infoElm).toHaveTextContent(testCase.expected);
      });
    });
  });

  describe('input', () => {
    const baseProps = {
      page: 1,
      totalCount: 20,
      itemsPerPage: 10,
      onCountChange: mockFn,
    };

    [
      {
        testName: 'does not render if perPageOptions prop is not defined',
        props: null,
        testObjects: [
          {
            queryString: /^10 results/,
            expected: 'toBeNull',
          },
        ],
      },
      {
        testName: 'renders correct results defined in perPageOptions prop',
        props: {
          perPageOptions: [1, 2],
        },
        testObjects: [
          {
            queryString: /^1 results/,
            expected: 'toBeDefined',
          },
          {
            queryString: /^2 results/,
            expected: 'toBeDefined',
          },
        ],
      },
      {
        testName: 'renders custom optionLabel when defined in props',
        props: {
          perPageOptions: [1, 2],
          optionsLabel: 'Cards',
        },
        testObjects: [
          {
            queryString: /^1 Cards/,
            expected: 'toBeDefined',
          },
        ],
      },
    ].forEach(testCase => {
      test(testCase.testName, () => {
        const { queryByText } = render(
          <Selector {...baseProps} {...testCase.props} />
        );

        testCase.testObjects.forEach(test => {
          const queryElm = queryByText(test.queryString);

          if (test.expected === 'toBeNull') {
            expect(queryElm).toBeNull();
          } else if (test.expected === 'toBeDefined') {
            expect(queryElm).toBeDefined();
          }
        });
      });
    });
  });
});
