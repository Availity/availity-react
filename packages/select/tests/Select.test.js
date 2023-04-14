import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Button } from 'reactstrap';
import { components } from 'react-select';
import * as yup from 'yup';
import { Form, Input } from '@availity/form';

import Select from '../src';

const singleValueSchema = (name) =>
  yup.object().shape({
    [name]: yup.string().required('This field is required.'),
  });

const multiValueSchema = (name, required, min, max) =>
  yup.object().shape({
    [name]: yup
      .array()
      .of(yup.string())
      .min(min, `Must select at least ${min} option${min !== 1 && 's'}.`)
      .max(max, `Cannot select more than ${max} option${max !== 1 && 's'}.`)
      .required('This field is required.'),
  });

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

const groupedOptions = [
  {
    label: 'options',
    options: [
      { label: 'Option 1', value: 'value for option 1' },
      { label: 'Option 2', value: 'value for option 2' },
      { label: 'Option 3', value: 'value for option 3' },
      { label: 'Option 4', value: 'value for option 4' },
    ],
    type: 'group',
  },
];

// I know it's lame but this is the only way to test with react-select
// https://stackoverflow.com/questions/55575843/how-to-test-react-select-with-react-testing-library
const selectItem = async (container, getByText, name) => {
  const select = container.querySelector('.av__control');
  fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });

  const selectOption = await waitFor(() => getByText(name));

  expect(selectOption).toBeDefined();

  fireEvent.click(selectOption);

  expect(container.querySelector('.av__option--is-selected')).toBeDefined();
  expect(select.querySelector('.av__placeholder')).toBe(null);
};

describe('Select', () => {
  test('single value submits', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select name="singleSelect" options={options} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          singleSelect: 'value for option 1',
        }),
        expect.anything()
      );
    });
  });

  test('single value grouped options submits', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select name="singleSelect" options={groupedOptions} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          singleSelect: 'value for option 1',
        }),
        expect.anything()
      );
    });
  });

  test('multi select grouped options submits', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={multiValueSchema('singleSelect', true, 1, 2)}
      >
        <Select isMulti name="singleSelect" options={groupedOptions} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          singleSelect: ['value for option 1'],
        }),
        expect.anything()
      );
    });
  });

  test('multi select submits', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          multiSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={multiValueSchema('multiSelect', true, 1, 2)}
      >
        <Select name="multiSelect" isMulti options={options} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');
    await selectItem(container, getByText, 'Option 2');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          multiSelect: ['value for option 1', 'value for option 2'],
        }),
        expect.anything()
      );
    });
  });

  test('select all submits', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          selectAll: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={multiValueSchema('selectAll', true, 1, 4)}
      >
        <Select name="selectAll" isMulti options={options} data-testid="single-select" allowSelectAll />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Select all');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          selectAll: ['value for option 1', 'value for option 2', 'value for option 3', 'value for option 4'],
        }),
        expect.anything()
      );
    });
  });

  test('select all submits from null initial value', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          selectAll: null,
        }}
        onSubmit={onSubmit}
        validationSchema={multiValueSchema('selectAll', true, 1, 4)}
      >
        <Select name="selectAll" isMulti options={options} data-testid="single-select" allowSelectAll />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Select all');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          selectAll: ['value for option 1', 'value for option 2', 'value for option 3', 'value for option 4'],
        }),
        expect.anything()
      );
    });
  });

  test('select all submits with initialValue', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          selectAll: ['value for option 1'],
        }}
        onSubmit={onSubmit}
        validationSchema={multiValueSchema('selectAll', true, 1, 4)}
      >
        <Select name="selectAll" isMulti options={options} data-testid="single-select" allowSelectAll />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Select all');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          selectAll: ['value for option 1', 'value for option 2', 'value for option 3', 'value for option 4'],
        }),
        expect.anything()
      );
    });
  });

  test('renders error class with invalid', async () => {
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select name="singleSelect" options={options} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const select = container.querySelector('.av-select');

      expect(select.className).toContain('is-touched');
      expect(select.className).toContain('av-invalid');
      expect(select.className).toContain('is-invalid');
    });
  });

  test(`maxLength doesn't allow more than X Options`, async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          multiSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={multiValueSchema('multiSelect', true, 1, 2)}
      >
        <Select name="multiSelect" isMulti maxLength={2} options={options} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');
    await selectItem(container, getByText, 'Option 2');
    // This will not get added
    await selectItem(container, getByText, 'Option 3');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          multiSelect: ['value for option 1', 'value for option 2'],
        }),
        expect.anything()
      );
    });
  });

  test('raw props submits whole object', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          singleSelect: yup.object(),
        })}
      >
        <Select name="singleSelect" options={options} raw data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          singleSelect: { label: 'Option 1', value: 'value for option 1' },
        }),
        expect.anything()
      );
    });
  });

  test('autofill as boolean works', async () => {
    const opts = [
      {
        label: 'Doe, John',
        value: {
          firstName: 'John',
          lastName: 'Doe',
          full: {
            name: 'John Doe',
          },
        },
      },
      {
        label: 'Doe, Jane',
        value: {
          firstName: 'Jane',
          lastName: 'Doe',
          full: {
            name: 'Jane Doe',
          },
        },
      },
    ];

    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          testFormInput: undefined,
          firstName: '',
          lastName: '',
          'full.name': '',
        }}
        onSubmit={onSubmit}
      >
        <Select name="testFormInput" options={opts} classNamePrefix="test" raw autofill />
        <Input data-testid="first-input" name="firstName" />
        <Input data-testid="last-input" name="lastName" />
        <Input data-testid="full-input" name="full.name" />

        <Button>Submit</Button>
      </Form>
    );

    // Simulate the user selecting "Doe, John"
    const select = container.querySelector('.test__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

    const option = await waitFor(() => getByText('Doe, John'));

    expect(option).toBeDefined();

    fireEvent.click(option);

    // Simulate the user clicking "Submit"
    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();

    fireEvent.click(submitButton);

    // Check that values got autofilled
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][0];
      expect(payload.firstName).toBe('John');
      expect(payload.lastName).toBe('Doe');
      expect(payload.full.name).toBe('John Doe');
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
      <Form
        initialValues={{
          testFormInput: undefined,
          firstName: '',
          lastName: '',
          'full.name': '',
          fullReversed: '',
        }}
        onSubmit={onSubmit}
      >
        <Select
          name="test-form-input"
          options={opts}
          classNamePrefix="test"
          raw
          autofill={{
            firstName: 'name.first',
            lastName: 'name.last',
            'full.name': (opt) => `${opt.name.first} ${opt.name.last}`,
            fullReversed: (opt) => `${opt.name.last} ${opt.name.first}`,
          }}
        />
        <Input data-testid="first-input" name="firstName" />
        <Input data-testid="last-input" name="lastName" />
        <Input data-testid="full-input" name="full.name" />
        <Input data-testid="full-reversed-input" name="fullReversed" />

        <Button>Submit</Button>
      </Form>
    );

    // Simulate the user selecting "Doe, John"
    const select = container.querySelector('.test__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

    const option = await waitFor(() => getByText('Doe, John'));

    expect(option).toBeDefined();

    fireEvent.click(option);

    // Simulate the user clicking "Submit"
    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();

    fireEvent.click(submitButton);

    // Check that values got autofilled
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][0];
      expect(payload.firstName).toBe('John');
      expect(payload.lastName).toBe('Doe');
      expect(payload.full.name).toBe('John Doe');
      expect(payload.fullReversed).toBe('Doe John');
    });
  });

  test('creatable', async () => {
    const opts = [
      {
        labelKeyTest: 'Doe, John',
        valueKeyTest: {
          name: {
            first: 'John',
            last: 'Doe',
          },
        },
      },
      {
        labelKeyTest: 'Doe, Jane',
        valueKeyTest: {
          name: {
            first: 'Jane',
            last: 'Doe',
          },
        },
      },
    ];

    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelectCreatable: undefined,
        }}
        onSubmit={onSubmit}
      >
        <Select
          name="singleSelectCreatable"
          options={opts}
          valueKey="valueKeyTest"
          labelKey="labelKeyTest"
          creatable
          raw
        />
        <Button>Submit</Button>
      </Form>
    );

    // Simulate the user selecting "Doe, John"
    const select = container.querySelector('.av__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });

    fireEvent.change(container.querySelector('#singleSelectCreatable'), {
      target: {
        value: 'HelloWorld',
      },
    });

    await selectItem(container, getByText, 'Create "HelloWorld"');

    // Simulate the user clicking "Submit"
    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][0];
      expect(payload.singleSelectCreatable.labelKeyTest).toBe('HelloWorld');
      expect(payload.singleSelectCreatable.valueKeyTest).toBe('helloworld');
    });
  });

  test('async creatable', async () => {
    const loadOptions = jest.fn();

    loadOptions.mockResolvedValue({
      options: [
        {
          labelKeyTest: 'Doe, John',
          valueKeyTest: {
            name: {
              first: 'John',
              last: 'Doe',
            },
          },
        },
        {
          labelKeyTest: 'Doe, Jane',
          valueKeyTest: {
            name: {
              first: 'Jane',
              last: 'Doe',
            },
          },
        },
      ],
      hasMore: false,
      additional: {
        page: 2,
      },
    });

    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelectCreatable: undefined,
        }}
        onSubmit={onSubmit}
      >
        <Select
          name="singleSelectCreatable"
          loadOptions={loadOptions}
          valueKey="valueKeyTest"
          labelKey="labelKeyTest"
          creatable
          raw
        />
        <Button>Submit</Button>
      </Form>
    );

    // Simulate the user selecting "Doe, John"
    const select = container.querySelector('.av__control');
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });

    fireEvent.change(container.querySelector('#singleSelectCreatable'), {
      target: {
        value: 'HelloWorld',
      },
    });

    await selectItem(container, getByText, 'Create "HelloWorld"');

    // Simulate the user clicking "Submit"
    const submitButton = getByText('Submit');
    expect(submitButton).toBeDefined();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][0];
      expect(payload.singleSelectCreatable.labelKeyTest).toBe('HelloWorld');
      expect(payload.singleSelectCreatable.valueKeyTest).toBe('helloworld');
    });
  });

  test('waits to query resource until input is focused when waitUntilFocused is true', async () => {
    const loadOptions = jest.fn();

    loadOptions.mockResolvedValue({
      options: [
        {
          id: 'FL',
          value: 'Florida',
        },
      ],
      hasMore: false,
      additional: {
        page: 2,
      },
    });

    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect-wait"
          classNamePrefix="test__wait"
          loadOptions={loadOptions}
          waitUntilFocused
          data-testid="single-select-wait"
          additional={{
            page: 1,
            perPage: 50,
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    // Check the loadOptions is not called on mount
    await waitFor(() => {
      expect(loadOptions).not.toHaveBeenCalled();
    });

    const waitUntilFocusSelect = container.querySelector('.test__wait__control');
    const input = container.querySelector('input');
    fireEvent.focus(input);
    fireEvent.keyDown(waitUntilFocusSelect, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(waitUntilFocusSelect, { key: 'Enter', keyCode: 13 });

    // Check the loadOptions is called only after the input has been focused
    await waitFor(() => {
      expect(loadOptions).toHaveBeenCalledTimes(1);
    });
  });

  test('checks accessibility of the options', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select name="singleSelect" options={options} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const select = container.querySelector('.av__control');

    // Open the dropdown
    fireEvent.click(select);
    // Hover down to the first option
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });

    const optionOne = getByText('Option 1');

    await waitFor(() => {
      expect(optionOne).toHaveAttribute('role', 'option');
      expect(optionOne).toHaveAttribute('aria-selected');
      expect(optionOne).toHaveAttribute('name');
    });
  });

  test('renders error message in placeholder with invalid', async () => {
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select name="singleSelect" options={options} data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const hiddenPlaceholderMessage = container.querySelector('.av__placeholder .sr-only');

      expect(hiddenPlaceholderMessage.innerHTML).toContain('This field is required.');
    });
  });

  test('renders help message in placeholder', async () => {
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          helpMessage="This is a help message."
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const hiddenPlaceholderMessage = container.querySelector('.av__placeholder .sr-only');

      expect(hiddenPlaceholderMessage.innerHTML).toContain('This is a help message.');
    });
  });

  test('renders aria attributes when invalid', async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          multiSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={multiValueSchema('multiSelect', true, 2, 3)}
      >
        <Select name="multiSelect" isMulti feedback options={options} data-testid="multi-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const select = container.querySelector('.av__input');

    expect(select).not.toHaveAttribute('aria-invalid');
    expect(select).toHaveAttribute('aria-errormessage', '');

    await selectItem(container, getByText, 'Option 1');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(select).toHaveAttribute('aria-invalid', 'true');
      expect(select).toHaveAttribute('aria-errormessage', 'multiselect-feedback');
    });

    await selectItem(container, getByText, 'Option 2');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(select).not.toHaveAttribute('aria-invalid');
      expect(select).toHaveAttribute('aria-errormessage', '');
    });
  });

  test('allow component overrides', async () => {
    // Display 'Foo' as the selected value instead of the given option
    const SingleValue = (props) => <components.SingleValue {...props}>Foo</components.SingleValue>;

    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select name="singleSelect" options={options} data-testid="single-select" components={{ SingleValue }} />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const select = container.querySelector('.av__control');

    // Open the dropdown
    fireEvent.click(select);
    // Hover down to the first option and select
    fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(select, { key: 'Enter', keyCode: 13 });

    await waitFor(() => {
      expect(getByText('Foo')).toBeDefined();
    });
  });

  test('when isClearable should display the clear button', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select name="singleSelect" options={options} data-testid="single-select" isClearable />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const clearButton = await waitFor(() => getByText('clear'));
    expect(clearButton).toBeDefined();
  });

  test('when isClearable should display clear button with custom `clear` text when provided', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).toBeDefined();
  });

  test('when isClearable should set clearButtonProps', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
          clearButtonProps={{ disabled: true }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).toBeDisabled();
  });

  test('when isClearable and has no value should disable the clear button', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).toBeDisabled();
  });

  test('when isClearable and isMulti and has no value should disable the clear button', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          isMulti
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).toBeDisabled();
  });

  test('when isClearable and has value should enable the clear button', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: options[0],
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).not.toBeDisabled();
  });

  test('when isClearable and isMulti and has value should enable the clear button', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: options[0],
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          isMulti
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).not.toBeDisabled();
  });

  test('when isClearable and has no value should enable the clear button after selecting value', async () => {
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).toBeDisabled();

    await selectItem(container, getByText, 'Option 1');

    await waitFor(() => {
      expect(clearButton).not.toBeDisabled();
    });
  });

  test('when isClearable and isMulti and has no value should enable the clear button after selecting value', async () => {
    const { container, getByText } = render(
      <Form
        initialValues={{
          singleSelect: undefined,
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          isMulti
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).toBeDisabled();

    await selectItem(container, getByText, 'Option 1');

    await waitFor(() => {
      expect(clearButton).not.toBeDisabled();
    });
  });

  test('when isClearable and has value should disable the clear button after clearing the value', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: options[0],
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).not.toBeDisabled();

    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(clearButton).toBeDisabled();
    });
  });

  test('when isClearable and isMulti and has value should disable the clear button after clearing the value', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          singleSelect: options[0],
        }}
        onSubmit={() => {}}
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          isMulti
          data-testid="single-select"
          isClearable
          clearButtonText="Clear!"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const clearButton = await waitFor(() => getByText('Clear!'));
    expect(clearButton).not.toBeDisabled();

    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(clearButton).toBeDisabled();
    });
  });
});
