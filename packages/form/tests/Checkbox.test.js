import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { array, object } from 'yup';
import { Button } from 'reactstrap';
import { Checkbox, CheckboxGroup, Form } from '..';

const initialValues = { name: ['Joe'] };
const validations = object().shape({
  name: array().required('required'),
});

function renderForm(props) {
  return render(
    <Form
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={() => {}}
      {...props}
    >
      <CheckboxGroup data-testid="nameField" name="name" label="Name">
        <Checkbox label="John" value="John" />
        <Checkbox label="Joe" value="Joe" />
      </CheckboxGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

describe('Checkbox', () => {
  test('renders with initial value', () => {
    const { container, getByText, getByDisplayValue } = renderForm();

    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(3);

    expect(getByText('John')).toBeDefined();
    expect(getByText('Joe')).toBeDefined();
    expect(getByDisplayValue('Joe').checked).toEqual(true);
  });

  test('should render label', () => {
    const { getByText } = renderForm();

    expect(getByText('Name')).toBeDefined();
  });

  test('should render error message when none selected', async () => {
    const { getByText, getByDisplayValue } = renderForm();
    const checkbox = getByDisplayValue('Joe');
    fireEvent.click(checkbox);

    fireEvent.click(getByText('Submit'));
    await wait(() => {
      expect(getByText('required')).toBeDefined();
    });
  });
});
