import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import 'jest-dom/extend-expect';

import PaginationControl, { defaultButtonText } from '../PaginationControl';

const pagesTestId = 'page-selector';

describe('PaginationControl', () => {
  afterEach(cleanup);

  let baseProps;
  beforeEach(() => {
    baseProps = {
      onPageChange: jest.fn(),
      page: 1,
      pageCount: 5,
    };
  });

  test('renders as expected', () => {
    const { getByTestId } = render(<PaginationControl {...baseProps} />);
    expect(getByTestId(pagesTestId)).toBeDefined();
  });

  test('page is required', () => {
    const useProps = {
      ...baseProps,
      page: undefined,
    };
    expect(() => {
      render(<PaginationControl {...useProps} />);
    }).toThrow();
  });

  test('pageCount is required', () => {
    const useProps = {
      ...baseProps,
      pageCount: undefined,
    };
    expect(() => {
      render(<PaginationControl {...useProps} />);
    }).toThrow();
  });

  test('onPageChange is required', () => {
    const useProps = {
      ...baseProps,
      onPageChange: undefined,
    };
    expect(() => {
      render(<PaginationControl {...useProps} />);
    }).toThrow();
  });

  test('should add correct classes for size,align,unstyled', () => {
    const { container, rerender } = render(
      <PaginationControl {...baseProps} />
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
          ...baseProps,
          [testCase.prop]: option,
        };

        rerender(<PaginationControl {...testProps} />);
        expect(container.firstChild).toHaveClass(expected);
      });
    });
  });

  describe('Navigation buttons', () => {
    test('renders nav buttons by default', () => {
      const { getByLabelText } = render(<PaginationControl {...baseProps} />);
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
      const { queryByLabelText, rerender } = render(
        <PaginationControl {...baseProps} />
      );

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
          rerender(
            <PaginationControl
              {...baseProps}
              {...{ [testCase.prop]: testText }}
            />
          );

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
        <PaginationControl {...baseProps} pageCount={1} page={1} />
      );
      const pageButton = getByLabelText('Page-1');
      expect(pageButton).toHaveTextContent('1');
    });

    test('does not render pages on simple', () => {
      const { queryByLabelText } = render(
        <PaginationControl {...baseProps} pageCount={1} page={1} simple />
      );
      const pageButton = queryByLabelText('Page-1');
      expect(pageButton).toBeNull();
    });

    test('should render current page as active', () => {
      const { getByLabelText } = render(
        <PaginationControl {...baseProps} pageCount={1} page={1} />
      );
      const pageButton = getByLabelText('Page-1');
      expect(pageButton.parentElement).toHaveClass('active');
    });

    test('should render padding values', () => {
      const page = 3;
      const pagePadding = 2;
      const pageCount = 10;

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { getByLabelText } = render(<PaginationControl {...props} />);

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

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { queryByLabelText } = render(<PaginationControl {...props} />);

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

      const props = {
        ...baseProps,
        pagePadding,
        pageCount,
        page,
      };

      const { getByLabelText } = render(<PaginationControl {...props} />);

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
    const props = {
      ...baseProps,
      pageCount,
      page,
    };
    const { getByLabelText } = render(<PaginationControl {...props} />);
    expect(props.onPageChange).not.toHaveBeenCalled();
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
        expect(props.onPageChange).toHaveBeenLastCalledWith(expected);
        expect(props.onPageChange).toHaveBeenCalledTimes(totalCalls);
      }
    });
  });
});
