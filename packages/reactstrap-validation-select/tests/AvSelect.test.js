import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  wait,
  cleanup,
} from '@testing-library/react';
import { AvForm, AvInput } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

import AvSelect from '..';

afterEach(cleanup);

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

const customOptions = [
  { customLabel: 'Option 1', customValue: 'value for option 1' },
  { customLabel: 'Option 2', customValue: 'value for option 2' },
];

const renderSelect = props =>
  render(
    <AvForm>
      <AvSelect name="test-form-input" {...props} />
    </AvForm>
  );

describe('AvSelect', () => {
  test('default behavior works', async () => {
    const { container, getByText } = renderSelect({
      options,
      classNamePrefix: 'test',
      getResult: 'regions',
    });

    const select = container.querySelector('.test__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

    const option = await waitForElement(() => getByText('Option 1'));

    expect(option).toBeDefined();

    fireEvent.click(option);

    expect(
      container.querySelector('.test__creatable__option--is-selected')
    ).toBeDefined();
    expect(select.querySelector('.test__creatable__placeholder')).toBe(null);
  });

  test('creatable works', async () => {
    const { container, getByText } = renderSelect({
      options,
      classNamePrefix: 'test__creatable',
      getResult: 'regions',
      creatable: true,
    });

    const selectInput = container.querySelector('#react-select-3-input');
    fireEvent.change(selectInput, {
      target: { value: 'Test' },
    });
    fireEvent.keyDown(selectInput, { key: 'Enter', keyCode: 13 });

    const selectOption = await waitForElement(() => getByText('Test'));

    expect(selectOption).toBeDefined();

    expect(
      container.querySelector('.test__creatable__option--is-selected')
    ).toBeDefined();
    expect(selectInput.querySelector('.test__creatable__placeholder')).toBe(
      null
    );
  });

  test('creatable works with custom keys', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <AvForm onSubmit={onSubmit}>
        <AvSelect
          name="test_form_input"
          classNamePrefix="test_custom_creatable"
          options={customOptions}
          labelKey="customLabel"
          valueKey="customValue"
          raw
          creatable
        />
        <Button>Submit</Button>
      </AvForm>
    );

    // Create new option
    const input = container.querySelector('#react-select-4-input');
    fireEvent.change(input, {
      target: { value: 'New Option Test' },
    });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });

    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();

    await fireEvent.click(submitButton);

    // Check for proper object format in payload
    await wait(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][2];
      expect(payload.test_form_input.customLabel).toBe('New Option Test');
      expect(payload.test_form_input.customValue).toBe('newoptiontest');
    });
  });

  test('autofill as boolean works', async () => {
    const opts = [
      {
        label: 'Doe, John',
        value: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      {
        label: 'Doe, Jane',
        value: {
          firstName: 'Jane',
          lastName: 'Doe',
        },
      },
    ];

    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <AvForm onSubmit={onSubmit}>
        <AvSelect
          name="test-form-input"
          options={opts}
          classNamePrefix="test"
          raw
          autofill
        />
        <AvInput data-testid="first-input" name="firstName" />
        <AvInput data-testid="last-input" name="lastName" />

        <Button>Submit</Button>
      </AvForm>
    );

    // Simulate the user selecting "Doe, John"
    const select = container.querySelector('.test__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

    const option = await waitForElement(() => getByText('Doe, John'));

    expect(option).toBeDefined();

    fireEvent.click(option);

    // Simulate the user clicking "Submit"
    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();

    await fireEvent.click(submitButton);

    // Check that values got autofilled
    await wait(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][2];
      expect(payload.firstName).toBe('John');
      expect(payload.lastName).toBe('Doe');
    });
  });

  test('autofill as object works', async () => {
    const opts = [
      {
        label: 'Doe, John',
        value: {
          name: {
            first: 'John',
            last: 'Doe',
          },
        },
      },
      {
        label: 'Doe, Jane',
        value: {
          name: {
            first: 'Jane',
            last: 'Doe',
          },
        },
      },
    ];

    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <AvForm onSubmit={onSubmit}>
        <AvSelect
          name="test-form-input"
          options={opts}
          classNamePrefix="test"
          raw
          autofill={{
            firstName: 'name.first',
            lastName: 'name.last',
            fullName: opt => `${opt.name.first} ${opt.name.last}`,
          }}
        />
        <AvInput data-testid="first-input" name="firstName" />
        <AvInput data-testid="last-input" name="lastName" />
        <AvInput data-testid="full-input" name="fullName" />

        <Button>Submit</Button>
      </AvForm>
    );

    // Simulate the user selecting "Doe, John"
    const select = container.querySelector('.test__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

    const option = await waitForElement(() => getByText('Doe, John'));

    expect(option).toBeDefined();

    fireEvent.click(option);

    // Simulate the user clicking "Submit"
    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();

    await fireEvent.click(submitButton);

    // Check that values got autofilled
    await wait(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][2];
      expect(payload.firstName).toBe('John');
      expect(payload.lastName).toBe('Doe');
      expect(payload.fullName).toBe('John Doe');
    });
  });
});
