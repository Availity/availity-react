import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Checkbox, CheckboxGroup } from '..';

describe('Checkbox', () => {
  test('renders with initial value', () => {
    const { container, getByText, getByDisplayValue } = render(
      <Form
        initialValues={{ name: ['Joe'] }}
        validationSchema={yup.object().shape({
          name: yup.array().required('required'),
        })}
        onSubmit={() => {}}
      >
        <CheckboxGroup name="name" label="Name">
          <Checkbox label="John" value="John" />
          <Checkbox label="Joe" value="Joe" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(3);

    expect(getByText('John')).toBeDefined();
    expect(getByText('Joe')).toBeDefined();
    expect(getByDisplayValue('Joe').checked).toEqual(true);
  });

  test('renders danger className when invalid form', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.array().required('This field is required'),
        })}
        onSubmit={() => {}}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" data-testid="hello-check" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      const checkbox = getByTestId('hello-check');

      expect(checkbox.className).toContain('is-touched');
      expect(checkbox.className).toContain('is-invalid');
      expect(getByText('This field is required')).toBeDefined();
    });
  });

  test('renders with label', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" />
        </CheckboxGroup>
      </Form>
    );

    getByText('Check One');
  });
});
