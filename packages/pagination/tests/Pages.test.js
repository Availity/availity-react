import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Pages, { defaultButtonText } from '../PaginationControls/Pages';

const pagesTestId = 'page-selector';

describe('Pages', () => {
  afterEach(cleanup);
  let mockFn;
  let baseProps;
  beforeEach(() => {
    mockFn = jest.fn();
    baseProps = {
      onPageChange: jest.fn(),
      pageCount: 5,
    };
  });

  test('renders as expected', () => {
    const { getByTestId } = render(<Pages {...baseProps} />);
    expect(getByTestId(pagesTestId)).toBeDefined();
  });

  test('onPageChange is required', () => {
    const useProps = {
      ...baseProps,
      onPageChange: undefined,
    };
    expect(() => {
      render(<Pages {...useProps} />);
    }).toThrow();
  });

  test('pageCount must be defined', () => {
    const useProps = {
      ...baseProps,
      pageCount: undefined,
    };
    expect(() => {
      render(<Pages {...useProps} />);
    }).toThrowError(/must define pageCount or totalCount and itemsPerPage/);
  });

  // TODO: figure out how to get this test working to validate props
  // test('pageCount, totalCount, and itemsPerPage must be positive if defined', () => {
  //   ['pageCount', 'totalCount', 'itemsPerPage'].forEach(propName => {
  //     const errorCheck = new RegExp(`${propName} must be a positive number`);
  //     [-2, -1].forEach(i => {
  //       expect(() => {
  //         const props = { ...baseProps, [propName]: i };
  //         // console.log(`${propName}: ${props[propName]}`);
  //         render(<Pages {...props} />);
  //       }).toThrowError(errorCheck);
  //     });
  //   });
  // });

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

  describe('Navigation buttons', () => {
    test('renders nav buttons by default', () => {
      const { getByLabelText } = render(<Pages {...baseProps} />);
      [
        { label: 'First', text: defaultButtonText.firstBtn },
        { label: 'Previous', text: defaultButtonText.prevBtn },
        { label: 'Next', text: defaultButtonText.nextBtn },
        { label: 'Last', text: defaultButtonText.lastBtn },
      ].forEach(testCase => {
        expect(getByLabelText(testCase.label)).toHaveTextContent(testCase.text);
      });
    });

    test('renders nav buttons with expected text', () => {
      const { queryByLabelText, rerender } = render(<Pages {...baseProps} />);

      [
        {
          label: 'First',
          prop: 'firstBtn',
          testValues: ['hello world', 'First', 'First Page', false],
        },
        {
          label: 'Previous',
          prop: 'prevBtn',
          testValues: ['Previous', 'Previous Page', false],
        },
        {
          label: 'Next',
          prop: 'nextBtn',
          testValues: ['Next', 'Next Page', false],
        },
        {
          label: 'Last',
          prop: 'lastBtn',
          testValues: ['Last', 'Last Page', false],
        },
      ].forEach(testCase => {
        testCase.testValues.forEach(testText => {
          rerender(<Pages {...baseProps} {...{ [testCase.prop]: testText }} />);

          const elm = queryByLabelText(testCase.label);

          const test = expect(elm);
          if (!testText) {
            test.toBeNull();
          } else {
            test.toHaveTextContent(testText);
          }
        });
      });
    });
  });

  describe('Page buttons', () => {
    test('renders a page button', () => {
      const { getByLabelText } = render(
        <Pages onPageChange={mockFn} pageCount={1} page={1} />
      );
      const pageButton = getByLabelText('Page-1');
      expect(pageButton).toHaveTextContent('1');
    });

    test('does not render pages on simple', () => {
      const { queryByLabelText } = render(
        <Pages onPageChange={mockFn} pageCount={1} page={1} simple />
      );
      const pageButton = queryByLabelText('Page-1');
      expect(pageButton).toBeNull();
    });

    test('should render current page as active', () => {
      const { getByLabelText } = render(
        <Pages onPageChange={mockFn} pageCount={1} page={1} />
      );
      const pageButton = getByLabelText('Page-1');
      expect(pageButton.parentElement).toHaveClass('active');
    });

    test('should render padding values', () => {
      const page = 3;
      const pagePadding = 2;
      const pageCount = 10;

      const { getByLabelText } = render(
        <Pages
          onPageChange={mockFn}
          pageCount={pageCount}
          page={page}
          pagePadding={pagePadding}
        />
      );

      for (let i = page - pagePadding; i <= page + pagePadding; i += 1) {
        const pageButton = getByLabelText(`Page-${i}`);
        expect(pageButton).toHaveTextContent(i);
        if (i === page) {
          expect(pageButton.parentElement).toHaveClass('active');
        }
      }
    });

    test('should only render padding if within the pageCount', () => {
      const page = 3;
      const pagePadding = 2;
      const pageCount = 4;

      const { queryByLabelText } = render(
        <Pages
          onPageChange={mockFn}
          pageCount={pageCount}
          page={page}
          pagePadding={pagePadding}
        />
      );

      for (let i = page - pagePadding; i <= page + pagePadding; i += 1) {
        const pageButton = queryByLabelText(`Page-${i}`);
        if (i <= pageCount) {
          expect(pageButton).toHaveTextContent(i);
          if (i === page) {
            expect(pageButton.parentElement).toHaveClass('active');
          }
        } else {
          expect(pageButton).toBeNull();
        }
      }
    });

    test('padding should shift for ends of range', () => {
      const pagePadding = 2;
      const pageCount = 10;

      const page = 1;

      const { getByLabelText } = render(
        <Pages
          onPageChange={mockFn}
          pageCount={pageCount}
          page={page}
          pagePadding={pagePadding}
        />
      );

      for (let i = 1; i <= 5; i += 1) {
        const pageButton = getByLabelText(`Page-${i}`);
        expect(pageButton).toHaveTextContent(i);
        if (i === page) {
          expect(pageButton.parentElement).toHaveClass('active');
        }
      }
    });
  });

  test('should call onPageChange for each button', () => {
    const pageCount = 5;
    const page = 2;
    const { getByLabelText } = render(
      <Pages onPageChange={mockFn} pageCount={pageCount} page={page} />
    );
    expect(mockFn).not.toHaveBeenCalled();
    let totalCalls = 0;
    const Labels = [
      {
        label: 'First',
        expected: 1,
      },
      {
        label: 'Previous',
        expected: page - 1,
      },
      { label: 'Next', expected: page + 1 },
      { label: 'Last', expected: pageCount },
    ];
    for (let i = 1; i <= pageCount; i += 1) {
      Labels.push({
        label: `Page-${i}`,
        expected: i === page ? false : i,
      });
    }

    Labels.forEach(({ label, expected }) => {
      if (expected) {
        const btn = getByLabelText(label);
        expect(btn).toBeDefined();
        fireEvent.click(btn);
        totalCalls += 1;
        expect(mockFn).toHaveBeenLastCalledWith(expected);
        expect(mockFn).toHaveBeenCalledTimes(totalCalls);
      }
    });
  });
});
