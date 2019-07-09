import React from 'react';
import {
  render,
  wait,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form } from '@availity/form';
import Select from '..';

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
          singleSelect: { label: 'Option 1', value: 'value for option 1' },
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
          multiSelect: [
            { label: 'Option 1', value: 'value for option 1' },

            { label: 'Option 2', value: 'value for option 2' },
          ],
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
          multiSelect: [
            { label: 'Option 1', value: 'value for option 1' },

            { label: 'Option 2', value: 'value for option 2' },
          ],
        }),
        expect.anything()
      );
    });
  });
});
