import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { string, object } from 'yup';
import { Button } from 'reactstrap';
import { Radio, RadioGroup, Form } from '..';

const initialValues = { name: '' };
const validations = object().shape({
  name: string().required('required'),
});

function renderForm() {
  return render(
    <Form initialValues={initialValues} validationSchema={validations}>
      <RadioGroup data-testid="nameField" name="name" label="Name">
        <Radio label="John" value="John" />
        <Radio label="Joe" value="Joe" />
      </RadioGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

describe('Radio', () => {
  test('renders with initial value', () => {
    const { container, getByText } = renderForm();

    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(3);

    expect(getByText('John')).toBeDefined();
    expect(getByText('Joe')).toBeDefined();
  });

  test('should render label', () => {
    const { getByText } = renderForm();

    expect(getByText('Name')).toBeDefined();
  });

  test('should render error message when none selected', async () => {
    const { getByText } = renderForm();

    fireEvent.click(getByText('Submit'));
    await wait(() => {
      expect(getByText('required')).toBeDefined();
    });
  });
});
