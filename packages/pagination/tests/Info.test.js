import React from 'react';
import { render, cleanup } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Info from '../PaginationInfo';

const baseProps = {
  itemsPerPage: 10,
  page: 1,
};
const infoTestId = 'selector-info';

describe('Info', () => {
  afterEach(cleanup);

  test('renders successfully', () => {
    const { container } = render(<Info {...baseProps} />);
    expect(container).toBeDefined();
  });

  test('does not render if itemsPerPage is undefined', () => {
    const { itemsPerPage, ...props } = baseProps;
    expect(() => {
      render(<Info {...props} />);
    }).toThrow();
  });

  test('does not render if page is undefined', () => {
    const { page, ...props } = baseProps;
    expect(() => {
      render(<Info {...props} />);
    }).toThrow();
  });

  test('does render with page and itemsPerPage defined', () => {
    const { getByTestId } = render(<Info {...baseProps} />);
    expect(getByTestId(infoTestId)).toBeDefined();
  });

  const baseTests = [
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
      testName: 'renders items through totalCount if less than page number',
      props: {
        itemsPerPage: 10,
        page: 1,
        totalCount: 5,
      },
      expected: 'Showing Items 0-5 of 5',
    },
    {
      testName:
        'renders items through totalCount if less than page number on other pages',
      props: {
        itemsPerPage: 10,
        page: 2,
        totalCount: 15,
      },
      expected: 'Showing Items 10-15 of 15',
    },
    {
      testName: "doesn't render 'of count' without totalCount",
      props: {
        itemsPerPage: 10,
        page: 1,
      },
      expected: 'Showing Items 0-10',
    },
  ];

  const runInfoTests = testCases => {
    testCases.forEach(testCase => {
      test(testCase.testName || testCase.expected, () => {
        const { getByTestId } = render(
          <Info
            {...{
              ...baseProps,
              ...testCase.props,
            }}
          />
        );
        const infoElm = getByTestId(infoTestId);
        expect(infoElm).toHaveTextContent(testCase.expected);
      });
    });
  };

  runInfoTests(baseTests);

  describe('itemLabel', () => {
    const labelTests = baseTests.map(testCase => {
      const { props, expected } = testCase;
      const output = { ...testCase };
      output.props = {
        ...props,
        itemLabel: 'Users',
      };
      output.expected = expected.replace('Items', 'Users');

      return output;
    });
    runInfoTests(labelTests);
  });
});
