import React from 'react';
import {
  render,
  wait,
  fireEvent,
  waitForElement,
  cleanup,
} from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Input } from '@availity/form';
import Select from '..';

afterEach(cleanup);

const singleValueSchema = name =>
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

// I know it's lame but this is the only way to test with react-select
// https://stackoverflow.com/questions/55575843/how-to-test-react-select-with-react-testing-library
const selectItem = async (container, getByText, name) => {
  const select = container.querySelector('.av__control');
  fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });

  const selectOption = await waitForElement(() => getByText(name));

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
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          singleSelect: 'value for option 1',
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
        <Select
          name="multiSelect"
          isMulti
          options={options}
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');
    await selectItem(container, getByText, 'Option 2');

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          multiSelect: ['value for option 1', 'value for option 2'],
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
        <Select
          name="singleSelect"
          options={options}
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
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
        <Select
          name="multiSelect"
          isMulti
          maxLength={2}
          options={options}
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');
    await selectItem(container, getByText, 'Option 2');
    // This will not get added
    await selectItem(container, getByText, 'Option 3');

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
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
        validationSchema={singleValueSchema('singleSelect')}
      >
        <Select
          name="singleSelect"
          options={options}
          raw
          data-testid="single-select"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await selectItem(container, getByText, 'Option 1');

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
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
      <Form
        initialValues={{
          testFormInput: undefined,
          firstName: '',
          lastName: '',
        }}
        onSubmit={onSubmit}
      >
        <Select
          name="testFormInput"
          options={opts}
          classNamePrefix="test"
          raw
          autofill
        />
        <Input data-testid="first-input" name="firstName" />
        <Input data-testid="last-input" name="lastName" />

        <Button>Submit</Button>
      </Form>
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
      const payload = onSubmit.mock.calls[0][0];
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
      <Form
        initialValues={{
          testFormInput: undefined,
          firstName: '',
          lastName: '',
          fullName: '',
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
            fullName: opt => `${opt.name.first} ${opt.name.last}`,
          }}
        />
        <Input data-testid="first-input" name="firstName" />
        <Input data-testid="last-input" name="lastName" />
        <Input data-testid="full-input" name="fullName" />

        <Button>Submit</Button>
      </Form>
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
      const payload = onSubmit.mock.calls[0][0];
      expect(payload.firstName).toBe('John');
      expect(payload.lastName).toBe('Doe');
      expect(payload.fullName).toBe('John Doe');
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

    await fireEvent.click(submitButton);

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const payload = onSubmit.mock.calls[0][0];
      expect(payload.singleSelectCreatable.labelKeyTest).toBe('HelloWorld');
      expect(payload.singleSelectCreatable.valueKeyTest).toBe('helloworld');
    });
  });
});
