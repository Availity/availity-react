import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import 'jest-dom/extend-expect';

import Selector from '../PaginationSelector';

const inputTestId = 'selector-input';

describe('Selector', () => {
  afterEach(cleanup);

  let baseProps;

  beforeEach(() => {
    baseProps = {
      perPageOptions: [5, 10, 15, 20],
      itemsPerPage: 5,
      onCountChange: jest.fn(),
    };
  });

  test('renders successfully', () => {
    const { container } = render(<Selector {...baseProps} />);
    expect(container).toBeDefined();
  });

  test('render fails without perPageOptions', () => {
    const { perPageOptions, ...props } = baseProps;
    expect(() => {
      render(<Selector {...props} />);
    }).toThrow();

    const useProps = {
      ...props,
      perPageOptions: 10,
    };
    expect(() => {
      render(<Selector {...useProps} />);
    }).toThrow();
  });

  test('render fails without itemsPerPage', () => {
    const { itemsPerPage, ...props } = baseProps;
    expect(() => {
      render(<Selector {...props} />);
    }).toThrow();
  });

  test('render fails without onCountChange', () => {
    const { onCountChange, ...props } = baseProps;
    expect(() => {
      render(<Selector {...props} />);
    }).toThrow();
  });

  test('should not render if less than 2 perPageOptions', () => {
    const props = {
      ...baseProps,
      perPageOptions: [5],
    };

    const { queryByTestId } = render(<Selector {...props} />);
    expect(queryByTestId(inputTestId)).toBeNull();
  });

  test('renders options for each number provided', () => {
    const props = { ...baseProps };
    const { rerender, getByTestId } = render(<Selector {...props} />);

    // init options with value so first test starts with 2 options
    props.perPageOptions = [1];

    for (let i = 1; i <= 10; i += 1) {
      // push new factor of 5 to options and update
      props.perPageOptions.push(5 * i);
      rerender(<Selector {...props} />);

      const outerContainer = getByTestId(inputTestId);
      expect(outerContainer).toBeDefined();
      // get all options and make sure they are only whats provided by the options array
      const renderedOptions = outerContainer.querySelectorAll('option');
      expect(renderedOptions.length).toBe(props.perPageOptions.length);
      props.perPageOptions.forEach((value, index) => {
        const option = renderedOptions[index];
        expect(option).toHaveTextContent(new RegExp(`^${value}`));
        expect(option).toHaveAttribute('value', value.toString());
      });
    }
  });

  test('supports options object syntax', () => {
    const perPageOptions = baseProps.perPageOptions.map(value => ({ value }));
    const props = {
      ...baseProps,
      perPageOptions,
    };
    const { getByTestId } = render(<Selector {...props} />);

    const outerContainer = getByTestId(inputTestId);
    expect(outerContainer).toBeDefined();
    // get all options and make sure they are only whats provided by the options array
    const renderedOptions = outerContainer.querySelectorAll('option');
    expect(renderedOptions.length).toBe(perPageOptions.length);
    perPageOptions.forEach(({ value }, index) => {
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
    const props = { ...baseProps };

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
      expect(renderedOptions.length).toBe(props.perPageOptions.length);
      props.perPageOptions.forEach((value, index) => {
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
      optionLabel,
    };

    const { getByTestId } = render(<Selector {...props} />);

    const outerContainer = getByTestId(inputTestId);
    expect(outerContainer).toBeDefined();
    // get all options and make sure they are only whats provided by the options array
    const renderedOptions = outerContainer.querySelectorAll('option');
    expect(renderedOptions.length).toBe(props.perPageOptions.length);
    props.perPageOptions.forEach((value, index) => {
      const option = renderedOptions[index];
      expect(optionLabel).toHaveBeenCalledWith(value);
      expect(option).toHaveTextContent(`wow! ${value} options per page`);
      expect(option).toHaveAttribute('value', value.toString());
    });
  });

  test('sets input selected value to itemsPerPage', () => {
    const { getByTestId, rerender } = render(<Selector {...baseProps} />);

    baseProps.perPageOptions.forEach((value, index) => {
      rerender(<Selector {...baseProps} itemsPerPage={value} />);

      const outerContainer = getByTestId(inputTestId);
      expect(outerContainer).toBeDefined();

      const input = outerContainer.querySelector('select');
      expect(input).toBeDefined();
      expect(input.value).toBe(value.toString());

      const renderedOptions = outerContainer.querySelectorAll('option');
      for (let i = 0; i < baseProps.perPageOptions.length; i += 1) {
        const option = renderedOptions[i];
        expect(option.selected).toBe(i === index);
      }
    });
  });

  test('calls on count change when option selected', () => {
    const { container } = render(<Selector {...baseProps} />);

    const input = container.querySelector('select');
    expect(input).toBeDefined();

    baseProps.perPageOptions.forEach((value, index) => {
      const stringValue = value.toString();
      fireEvent.change(input, {
        target: { value: stringValue },
      });
      expect(baseProps.onCountChange).toHaveBeenCalledTimes(index + 1);
      expect(baseProps.onCountChange).toHaveBeenLastCalledWith(stringValue);
    });
  });
});
