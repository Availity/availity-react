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

    test('should render page +- (number padding value)', () => {
      const page = 3;
      const pagePadding = 2;
      const pageCount = 10;

      const expectedMin = page - pagePadding;
      const expectedMax = page + pagePadding;

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { queryByLabelText } = render(<PaginationControl {...props} />);

      for (let i = 1; i <= pageCount; i += 1) {
        const pageButton = queryByLabelText(`Page-${i}`);
        if (i < expectedMin || i > expectedMax) {
          expect(pageButton).toBeNull();
        } else {
          expect(pageButton).toHaveTextContent(i);
          if (i === page) {
            expect(pageButton.parentElement).toHaveClass('active');
          }
        }
      }
    });

    test('should adjust padding values when close to max', () => {
      const page = 4;
      const pagePadding = 2;
      const pageCount = 5;

      const expectedMax = pageCount;
      const expectedMin = pageCount - 1 - 2 * pagePadding;

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { queryByLabelText } = render(<PaginationControl {...props} />);

      for (let i = 1; i <= pageCount; i += 1) {
        const pageButton = queryByLabelText(`Page-${i}`);
        if (i < expectedMin || i > expectedMax) {
          expect(pageButton).toBeNull();
        } else {
          expect(pageButton).toHaveTextContent(i);
          if (i === page) {
            expect(pageButton.parentElement).toHaveClass('active');
          }
        }
      }
    });

    test('should adjust padding values when close to min', () => {
      const page = 2;
      const pagePadding = 2;
      const pageCount = 5;

      const expectedMin = 1;
      const expectedMax = 1 + 1 + 2 * pagePadding;

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { queryByLabelText } = render(<PaginationControl {...props} />);

      for (let i = 1; i <= pageCount; i += 1) {
        const pageButton = queryByLabelText(`Page-${i}`);
        if (i < expectedMin || i > expectedMax) {
          expect(pageButton).toBeNull();
        } else {
          expect(pageButton).toHaveTextContent(i);
          if (i === page) {
            expect(pageButton.parentElement).toHaveClass('active');
          }
        }
      }
    });

    test('should only should render the current page with padding 0', () => {
      const page = 2;
      const pagePadding = 0;
      const pageCount = 5;

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { queryByLabelText } = render(<PaginationControl {...props} />);

      for (let i = 1; i <= pageCount; i += 1) {
        const pageButton = queryByLabelText(`Page-${i}`);
        if (i === page) {
          expect(pageButton).toHaveTextContent(i);
          expect(pageButton.parentElement).toHaveClass('active');
        } else {
          expect(pageButton).toBeNull();
        }
      }
    });

    test('should only should render the current page with padding false', () => {
      const page = 2;
      const pagePadding = false;
      const pageCount = 5;

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { queryByLabelText } = render(<PaginationControl {...props} />);

      for (let i = 1; i <= pageCount; i += 1) {
        const pageButton = queryByLabelText(`Page-${i}`);
        if (i === page) {
          expect(pageButton).toHaveTextContent(i);
          expect(pageButton.parentElement).toHaveClass('active');
        } else {
          expect(pageButton).toBeNull();
        }
      }
    });

    test('should render all pages with padding true', () => {
      const page = 3;
      const pagePadding = true;
      const pageCount = 10;

      const props = {
        ...baseProps,
        page,
        pagePadding,
        pageCount,
      };

      const { getByLabelText } = render(<PaginationControl {...props} />);

      for (let i = 1; i <= pageCount; i += 1) {
        const pageButton = getByLabelText(`Page-${i}`);

        expect(pageButton).toHaveTextContent(i);
        if (i === page) {
          expect(pageButton.parentElement).toHaveClass('active');
        }
      }
    });
  });

  describe('onPageChange', () => {
    test('first page button should call with 1', () => {
      const pageCount = 5;
      const page = 1;
      const props = {
        ...baseProps,
        pageCount,
        page,
      };
      const { getByLabelText } = render(<PaginationControl {...props} />);

      const firstBtn = getByLabelText('First');
      expect(firstBtn).toBeDefined();
      fireEvent.click(firstBtn);
      expect(props.onPageChange).toHaveBeenCalledWith(1);
    });

    test('previous page button should call with current page - 1 (or 1 on first page)', () => {
      const pageCount = 5;
      let page = 1;
      const props = {
        ...baseProps,
        pageCount,
        page,
      };
      const { getByLabelText, rerender } = render(
        <PaginationControl {...props} />
      );
      expect(props.onPageChange).not.toHaveBeenCalled();

      while (page <= pageCount) {
        let expected = page - 1;

        if (page > 1) {
          props.page = page;
          rerender(<PaginationControl {...props} />);
        } else {
          expected = 1;
        }

        const prevBtn = getByLabelText('Previous');
        expect(prevBtn).toBeDefined();
        fireEvent.click(prevBtn);
        expect(props.onPageChange).toHaveBeenCalledTimes(page);
        expect(props.onPageChange).toHaveBeenLastCalledWith(expected);

        page += 1;
      }
    });

    test('page buttons should call with that button value', () => {
      const pageCount = 10;
      const page = 3;
      const props = {
        ...baseProps,
        pageCount,
        page,
        pagePadding: true,
      };

      const { getByLabelText } = render(
        <PaginationControl {...props} pagePadding />
      );
      expect(props.onPageChange).not.toHaveBeenCalled();
      for (let i = 1; i <= pageCount; i += 1) {
        const btn = getByLabelText(`Page-${i}`);
        expect(btn).toBeDefined();
        fireEvent.click(btn);
        expect(props.onPageChange).toHaveBeenCalledWith(i);
        expect(props.onPageChange).toHaveBeenCalledTimes(i);
      }
    });

    test('next page button should call with current page + 1 (or pageCount on last page)', () => {
      const pageCount = 5;
      let page = 1;
      const props = {
        ...baseProps,
        pageCount,
        page,
      };
      const { getByLabelText, rerender } = render(
        <PaginationControl {...props} />
      );
      expect(props.onPageChange).not.toHaveBeenCalled();

      while (page <= pageCount) {
        if (page > 1) {
          props.page = page;
          rerender(<PaginationControl {...props} />);
        }

        const prevBtn = getByLabelText('Next');
        expect(prevBtn).toBeDefined();
        fireEvent.click(prevBtn);
        expect(props.onPageChange).toHaveBeenCalledTimes(page);

        const expected = page < pageCount ? page + 1 : pageCount;
        expect(props.onPageChange).toHaveBeenLastCalledWith(expected);

        page += 1;
      }
    });

    test('first page button should call with last page', () => {
      const pageCount = 5;
      const page = 1;
      const props = {
        ...baseProps,
        pageCount,
        page,
      };
      const { getByLabelText } = render(<PaginationControl {...props} />);

      const firstBtn = getByLabelText('Last');
      expect(firstBtn).toBeDefined();
      fireEvent.click(firstBtn);
      expect(props.onPageChange).toHaveBeenCalledWith(pageCount);
    });
  });
});
