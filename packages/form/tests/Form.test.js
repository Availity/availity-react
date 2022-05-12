import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { DateField } from '@availity/date';
import { SelectField } from '@availity/select';

import { Form, Input, RadioGroup, Radio } from '..';

describe('Form', () => {
  test('renders', () => {
    const { getByTestId } = render(<Form initialValues={{}} onSubmit={() => {}} />);

    const el = getByTestId('form-container');
    expect(el).toBeDefined();
  });

  test('validates properly', async () => {
    const schema = yup.object().shape({
      hello: yup.string().required('This field is required.'),
    });

    const onSubmit = jest.fn();

    const { getByTestId, getByText } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Input name="hello" data-testid="hello-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    getByTestId('form-container');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          hello: 'hello',
        }),
        expect.anything()
      );
    });
  });

  test('focuses first invalid input properly', async () => {
    const schema = yup.object().shape({
      first: yup.string().required('This field is required.'),
      second: yup.string().required('This field is required.'),
      radioGroup: yup.string().required('A selection is required'),
    });

    const onSubmit = jest.fn();

    const { getByTestId, getByText } = render(
      <Form
        initialValues={{
          first: 'first',
          second: '',
          radioGroup: '',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Input name="first" data-testid="first-input" />
        <Input name="second" data-testid="second-input" />
        <RadioGroup name="radioGroup" label="Radio Group">
          <Radio name="radioGroup" label="Radio One" value="uno" data-testid="first-radio" />
          <Radio name="radioGroup" label="Radio Two" value="dos" data-testid="second-radio" />
          <Radio name="radioGroup" label="Radio Three" value="tres" data-testid="third-radio" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    const submit = getByText('Submit');
    const firstInput = getByTestId('first-input');
    const secondInput = getByTestId('second-input');
    const firstRadio = getByTestId('first-radio');

    fireEvent.click(submit);

    await waitFor(() => {
      expect(secondInput).not.toHaveFocus();
      fireEvent.change(secondInput, { target: { value: 'second' } });
    });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(firstRadio).toHaveFocus();
      fireEvent.click(firstRadio);
    });

    submit.focus();
    fireEvent.click(submit);

    await waitFor(() => {
      expect(firstInput).not.toHaveFocus();
      expect(secondInput).not.toHaveFocus();
      expect(firstRadio).not.toHaveFocus();
    });
  });

  test('focuses first invalid @availity/select input properly', async () => {
    const schema = yup.object().shape({
      first: yup.string().required('This field is required.'),
      SelectField: yup.string().required('This field is required.').nullable(),
      second: yup.string().required('This field is required.'),
    });
    const options = [
      { label: 'Option 1', value: 'value for option 1' },
      { label: 'Option 2', value: 'value for option 2' },
      { label: 'Option 3', value: 'value for option 3' },
      { label: 'Option 4', value: 'value for option 4' },
    ];

    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          first: 'first',
          SelectField: undefined,
          second: '',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Input name="first" data-testid="first-input" />
        <SelectField label="Select Field" name="SelectField" options={options} />
        <Input name="second" data-testid="second-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(container.querySelector('.av__input')).toHaveFocus();
    });
  });

  test('invalid submission does not focus valid @availity/select input', async () => {
    const schema = yup.object().shape({
      first: yup.string().required('This field is required.'),
      SelectField: yup.string().required('This field is required.').nullable(),
      second: yup.string().required('This field is required.'),
    });
    const options = [
      { label: 'Option 1', value: 'value for option 1' },
      { label: 'Option 2', value: 'value for option 2' },
      { label: 'Option 3', value: 'value for option 3' },
      { label: 'Option 4', value: 'value for option 4' },
    ];

    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          first: 'first',
          SelectField: 'value for option 1',
          second: '',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Input name="first" data-testid="first-input" />
        <SelectField label="Select Field" name="SelectField" options={options} />
        <Input name="second" data-testid="second-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const selectInput = container.querySelector('.av__input');
    const submit = getByText('Submit');

    submit.focus();
    expect(submit).toHaveFocus();
    fireEvent.click(submit);
    await waitFor(() => {
      expect(container.querySelector('.av__placeholder')).toBe(null);
      expect(selectInput).not.toHaveFocus();
    });
  });

  test('focuses first invalid @availity/date input properly', async () => {
    const schema = yup.object().shape({
      first: yup.string().required('This field is required.'),
      dateField: yup.string().required('This field is required'),
      second: yup.string().required('This field is required.'),
    });

    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          first: 'first',
          dateField: '',
          second: '',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Input name="first" data-testid="first-input" />
        <DateField id="dateField" name="dateField" label="Date Field" data-testid="dateField" />
        <Input name="second" data-testid="second-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(container.querySelector('.DateInput_input')).toHaveFocus();
    });
  });

  test('invalid submission does not focus valid @availity/date input', async () => {
    const schema = yup.object().shape({
      first: yup.string().required('This field is required.'),
      dateField: yup.string().required('This field is required'),
      second: yup.string().required('This field is required.'),
    });

    const onSubmit = jest.fn();

    const { container, getByTestId, getByText } = render(
      <Form
        initialValues={{
          first: 'first',
          dateField: '01/01/2000',
          second: '',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Input name="first" data-testid="first-input" />
        <DateField id="dateField" name="dateField" label="Date Field" data-testid="dateField" />
        <Input name="second" data-testid="second-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    getByText('Submit').focus();
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(container.querySelector('.DateInput_input')).not.toHaveFocus();
      expect(getByTestId('second-input')).toHaveFocus();
    });
  });
});
