import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { string, object } from 'yup';
import { Button } from 'reactstrap';
import { Field, Form } from '..';

const initialValues = { name: 'John' };
const validations = object().shape({
  name: string().required('error'),
});
const validate = jest.fn();

function renderForm(props) {
  return render(
    <Form
      initialValues={initialValues}
      validationSchema={validations}
      validate={validate}
    >
      <Field data-testid="nameField" name="name" {...props} />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

describe('Field', () => {
  test('renders with initial value', () => {
    const { container, getByDisplayValue } = renderForm();

    expect(container.querySelectorAll('input')).toHaveLength(1);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(1);
    expect(container.querySelectorAll('.av-valid')).toHaveLength(1);

    expect(getByDisplayValue('John')).toBeDefined();
  });

  test('should render label and help', () => {
    const { getByText } = renderForm({
      label: 'Name',
      helpMessage: 'help text',
    });

    expect(getByText('Name')).toBeDefined();
    expect(getByText('help text')).toBeDefined();
  });

  test('should render error message', async () => {
    const { getByText, getByDisplayValue } = renderForm();

    await fireEvent.change(getByDisplayValue('John'), {
      target: {
        name: 'name',
        value: '',
      },
    });
    fireEvent.click(getByText('Submit'));
    await wait(() => {
      expect(getByText('error')).toBeDefined();
    });
  });

  test('should hide label if labelHidden passed', async () => {
    const { queryByDisplayValue } = renderForm({
      label: 'Name',
      labelHidden: true,
    });

    await expect(queryByDisplayValue('Name')).toEqual(null);
  });
});
