import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';

import { Form, Field } from '..';

describe('Field', () => {
  test('renders with label', () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={() => {}}
      >
        <Field name="hello" label="Hello Label" data-testid="hello-input" />
      </Form>
    );

    getByText('Hello Label');
  });

  test('should render help message', () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={() => {}}
      >
        <Field name="hello" helpMessage="help text" data-testid="hello-input" />
      </Form>
    );

    getByText('help text');
  });

  test('renders with initial value', () => {
    const { container, getByDisplayValue } = render(
      <Form initialValues={{ name: 'John' }} onSubmit={() => {}}>
        <Field name="name" />
      </Form>
    );

    expect(container.querySelectorAll('input')).toHaveLength(1);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(1);
    expect(container.querySelectorAll('.av-valid')).toHaveLength(1);

    expect(getByDisplayValue('John')).toBeDefined();
  });

  test('should render error message', async () => {
    const { container, getByText, getByDisplayValue } = render(
      <Form
        initialValues={{ name: 'John' }}
        onSubmit={() => {}}
        validationSchema={yup.object().shape({ name: yup.string().required() })}
      >
        <Field name="name" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.change(getByDisplayValue('John'), {
      target: {
        name: 'name',
        value: '',
      },
    });
    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(container.querySelector('.invalid-feedback')).toBeDefined();
    });
  });

  test('should hide label if labelHidden passed', async () => {
    const { queryByDisplayValue } = render(
      <Form initialValues={{ name: 'John' }} onSubmit={() => {}}>
        <Field name="hello" label="Name" labelHidden />
      </Form>
    );

    await expect(queryByDisplayValue('Name')).toEqual(null);
  });
});
