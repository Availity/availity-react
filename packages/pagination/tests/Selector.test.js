import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Selector from '../PaginationSelector';

describe('Selector', () => {
  afterEach(cleanup);

  test('renders successfully', () => {
    const { container } = render(
      <Selector itemsPerPage={10} page={1} totalCount={10} />
    );
    expect(container).toBeDefined();
  });

  describe('info', () => {
    const infoTestId = 'selector-info';

    test('does not render if itemsPerPage is undefined', () => {
      const { queryByTestId } = render(<Selector page={1} />);
      expect(queryByTestId(infoTestId)).toBeNull();
    });

    test('does not render if page is undefined', () => {
      const { queryByTestId } = render(<Selector itemsPerPage={10} />);
      expect(queryByTestId(infoTestId)).toBeNull();
    });

    test('does render with page and itemsPerPage defined', () => {
      const { getByTestId } = render(<Selector page={1} itemsPerPage={10} />);
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
          const { getByTestId } = render(<Selector {...testCase.props} />);
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

  describe('input', () => {
    const inputTestId = 'selector-input';

    let baseProps = {};

    beforeEach(() => {
      baseProps = {
        onCountChange: jest.fn(),
      };
    });

    const standardOptions = [];
    for (let i = 1; i <= 10; i += 1) {
      standardOptions.push(i * 5);
    }

    test("doesn't render without perPageOptions", () => {
      const { queryByTestId } = render(<Selector {...baseProps} />);
      expect(queryByTestId(inputTestId)).toBeNull();
    });

    test("doesn't render with less than 2 perPageOptions", () => {
      const { queryByTestId } = render(
        <Selector {...baseProps} perPageOptions={[1]} />
      );
      expect(queryByTestId(inputTestId)).toBeNull();
    });

    test("doesn't render without onCountChange", () => {
      const { queryByTestId } = render(
        <Selector perPageOptions={standardOptions} />
      );
      expect(queryByTestId(inputTestId)).toBeNull();
    });

    test('renders when perPageOptions provided', () => {
      const { getByTestId } = render(
        <Selector {...baseProps} perPageOptions={[1, 2, 3]} />
      );
      expect(getByTestId(inputTestId)).toBeDefined();
    });

    test('renders options for each number provided', () => {
      const { rerender, getByTestId } = render(
        <Selector {...baseProps} perPageOptions={[1, 2, 3]} />
      );

      // init options with value so first test starts with 2 options
      const allOptions = [1];

      for (let i = 1; i <= 10; i += 1) {
        // push new factor of 5 to options and update
        allOptions.push(5 * i);
        rerender(<Selector {...baseProps} perPageOptions={allOptions} />);

        const outerContainer = getByTestId(inputTestId);
        expect(outerContainer).toBeDefined();
        // get all options and make sure they are only whats provided by the options array
        const renderedOptions = outerContainer.querySelectorAll('option');
        expect(renderedOptions.length).toBe(allOptions.length);
        allOptions.forEach((value, index) => {
          const option = renderedOptions[index];
          expect(option).toHaveTextContent(new RegExp(`^${value}`));
          expect(option).toHaveAttribute('value', value.toString());
        });
      }
    });

    test('supports options object syntax', () => {
      const useOptions = standardOptions.map(value => ({ value }));
      const { getByTestId } = render(
        <Selector {...baseProps} perPageOptions={useOptions} />
      );

      const outerContainer = getByTestId(inputTestId);
      expect(outerContainer).toBeDefined();
      // get all options and make sure they are only whats provided by the options array
      const renderedOptions = outerContainer.querySelectorAll('option');
      expect(renderedOptions.length).toBe(useOptions.length);
      useOptions.forEach(({ value }, index) => {
        const option = renderedOptions[index];
        expect(option).toHaveTextContent(new RegExp(`^${value}`));
        expect(option).toHaveAttribute('value', value.toString());
      });
    });

    test('renders option labels if object provided', () => {
      const useOptions = [
        { value: 1, label: 'hello' },
        { value: 2, label: 'world' },
        { value: 3 },
      ];

      const { getByTestId } = render(
        <Selector {...baseProps} perPageOptions={useOptions} />
      );

      const outerContainer = getByTestId(inputTestId);
      expect(outerContainer).toBeDefined();
      // get all options and make sure they are only whats provided by the options array
      const renderedOptions = outerContainer.querySelectorAll('option');
      expect(renderedOptions.length).toBe(useOptions.length);
      useOptions.forEach(({ value, label }, index) => {
        const option = renderedOptions[index];
        expect(option).toHaveTextContent(label || new RegExp(`^${value}`));
        expect(option).toHaveAttribute('value', value.toString());
      });
    });

    test("renders optionLabel (string), itemLabel, or 'results' for each option", () => {
      const props = {
        ...baseProps,
        perPageOptions: standardOptions,
      };

      const { getByTestId, rerender } = render(<Selector {...props} />);

      let expectLabel = 'results';
      const itemLabelTest = 'Item Label Test';
      const optionLabelTest = 'Option Label Test';

      const testOptions = () => {
        rerender(<Selector {...props} />);

        const outerContainer = getByTestId(inputTestId);
        expect(outerContainer).toBeDefined();
        // get all options and make sure they are only whats provided by the options array
        const renderedOptions = outerContainer.querySelectorAll('option');
        expect(renderedOptions.length).toBe(standardOptions.length);
        standardOptions.forEach((value, index) => {
          const option = renderedOptions[index];
          expect(option).toHaveTextContent(`${value} ${expectLabel}`);
          expect(option).toHaveAttribute('value', value.toString());
        });
      };

      testOptions();

      props.itemLabel = itemLabelTest;
      expectLabel = itemLabelTest;

      testOptions();

      props.optionLabel = optionLabelTest;
      expectLabel = optionLabelTest;

      testOptions();
    });

    test('accept function for optionLabel', () => {
      const optionLabel = jest.fn(value => `wow! ${value} options per page`);
      const props = {
        ...baseProps,
        perPageOptions: standardOptions,
        optionLabel,
      };

      const { getByTestId } = render(<Selector {...props} />);

      const outerContainer = getByTestId(inputTestId);
      expect(outerContainer).toBeDefined();
      // get all options and make sure they are only whats provided by the options array
      const renderedOptions = outerContainer.querySelectorAll('option');
      expect(renderedOptions.length).toBe(standardOptions.length);
      standardOptions.forEach((value, index) => {
        const option = renderedOptions[index];
        expect(optionLabel).toHaveBeenCalledWith(value);
        expect(option).toHaveTextContent(`wow! ${value} options per page`);
        expect(option).toHaveAttribute('value', value.toString());
      });
    });

    test('sets input selected value to itemsPerPage', () => {
      const props = {
        ...baseProps,
        perPageOptions: standardOptions,
      };
      const { getByTestId, rerender } = render(<Selector {...props} />);

      standardOptions.forEach((value, index) => {
        rerender(<Selector {...props} itemsPerPage={value} />);

        const outerContainer = getByTestId(inputTestId);
        expect(outerContainer).toBeDefined();

        const input = outerContainer.querySelector('select');
        expect(input).toBeDefined();
        expect(input.value).toBe(value.toString());

        const renderedOptions = outerContainer.querySelectorAll('option');
        for (let i = 0; i < standardOptions.length; i += 1) {
          const option = renderedOptions[i];
          expect(option.selected).toBe(i === index);
        }
      });
    });

    test('calls on count change when option selected', () => {
      const props = {
        ...baseProps,
        perPageOptions: standardOptions,
      };
      const { container } = render(<Selector {...props} />);

      const input = container.querySelector('select');
      expect(input).toBeDefined();

      standardOptions.forEach((value, index) => {
        const stringValue = value.toString();
        fireEvent.change(input, {
          target: { value: stringValue },
        });
        expect(props.onCountChange).toHaveBeenCalledTimes(index + 1);
        expect(props.onCountChange).toHaveBeenLastCalledWith(stringValue);
      });
    });
  });
});
