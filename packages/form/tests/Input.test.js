import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { string, object } from 'yup';
import { Input, Form, RadioGroup } from '..';

const initialValues = { name: 'John' };
const validations = object().shape({
  name: string().required(),
});
const validate = jest.fn();

function renderForm(props) {
  return render(
    <Form
      initialValues={initialValues}
      validationSchema={validations}
      validate={validate}
    >
      <Input data-testid="nameInput" name="name" {...props} />
    </Form>
  );
}

function renderCheckboxForm() {
  return render(
    <Form
      initialValues={initialValues}
      validationSchema={validations}
      validate={validate}
    >
      <RadioGroup name="name">
        <Input
          data-testid="nameInput"
          // name="name"
          type="checkbox"
          checked={false}
        />
      </RadioGroup>
    </Form>
  );
}

describe('Input', () => {
  test('should render default input', () => {
    const { container, getByDisplayValue } = renderForm();

    expect(container.querySelectorAll('input')).toHaveLength(1);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(1);
    expect(container.querySelectorAll('.av-valid')).toHaveLength(1);

    expect(getByDisplayValue('John')).toBeDefined();
    expect(container.querySelectorAll('.is-touched')).toHaveLength(0);
    expect(container.querySelectorAll('.av-invalid')).toHaveLength(0);
    expect(container.querySelectorAll('.is-invalid')).toHaveLength(0);
  });

  test('should render touched classes', () => {
    const { container, getByTestId } = renderForm();

    const input = getByTestId('nameInput');
    fireEvent.blur(input);
    expect(container.querySelectorAll('.is-touched')).toHaveLength(1);
    expect(container.querySelectorAll('.av-invalid')).toHaveLength(0);
    expect(container.querySelectorAll('.is-invalid')).toHaveLength(0);
  });

  test('should render error classes', async () => {
    const { container, getByTestId } = renderForm();

    const input = getByTestId('nameInput');
    fireEvent.change(input, {
      target: {
        name: 'name',
        value: '',
      },
    });
    await wait(() => {
      expect(validate).toHaveBeenCalled();
    });
    fireEvent.blur(input);

    expect(container.querySelectorAll('.av-invalid')).toHaveLength(1);
    expect(container.querySelectorAll('.is-invalid')).toHaveLength(1);
  });

  test('should render for type checkbox', async () => {
    const { container, getByTestId } = renderCheckboxForm();

    const input = getByTestId('nameInput');
    await fireEvent.click(input);
    await fireEvent.click(input);
    await wait(() => {
      expect(container.querySelectorAll('.is-touched')).toHaveLength(1);
      expect(container.querySelectorAll('.av-invalid')).toHaveLength(1);
      expect(container.querySelectorAll('.is-invalid')).toHaveLength(1);
      expect(container.querySelectorAll('.was-validated')).toHaveLength(1);
    });
  });
});
