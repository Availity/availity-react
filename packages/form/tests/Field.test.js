import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';

import { Form, Field } from '..';

afterEach(cleanup);

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

    const el = getByText('Hello Label');
    expect(el).toBeDefined();
  });

  test('renders with grid', () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={() => {}}
      >
        <Field
          name="hello"
          label="Hello Label"
          data-testid="hello-input"
          grid={{
            xs: 12,
            md: 6,
          }}
        />
      </Form>
    );

    const label = getByText('Hello Label');

    expect(label.className).toContain('col-md-6');
  });

  test('renders with field help icon', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={() => {}}
      >
        <Field
          name="hello"
          label="Hello Label"
          data-testid="hello-input"
          helpId="hellohelptopic"
        />
      </Form>
    );

    expect(getByTestId('field-help-icon')).toBeDefined();
  });

  test('should render help message', () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={() => {}}
      >
        <Field name="hello" helpMessage="help text" data-testid="hello-input" />
      </Form>
    );

    const el = getByText('help text');
    expect(el).toBeDefined();
    expect(el).toHaveAttribute('id', 'hello-helpmessage');
    expect(getByTestId('hello-input')).toHaveAttribute(
      'aria-describedby',
      ' hello-helpmessage'
    );
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

    await waitFor(() => {
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

  test('should generate generated uuid when id is not provided', () => {
    const { container } = render(
      <Form initialValues={{ name: 'John' }} onSubmit={() => {}}>
        <Field name="name" label="Greetings" />
      </Form>
    );

    expect(container.querySelector('input').getAttribute('id')).toEqual(
      container.querySelector('label').getAttribute('for')
    );
  });

  test('label for attribute should point to field id attribute', () => {
    const inputId = 'test-input-id';
    const { container } = render(
      <Form initialValues={{ name: 'John' }} onSubmit={() => {}}>
        <Field name="name" label="Greetings" id={inputId} />
      </Form>
    );

    expect(container.querySelector('input').getAttribute('id')).toEqual(
      inputId
    );
    expect(container.querySelector('label').getAttribute('for')).toEqual(
      inputId
    );
  });

  test('should generate uuid even when label is not added', () => {
    const { container } = render(
      <Form initialValues={{ name: 'John' }} onSubmit={() => {}}>
        <Field name="name" />
      </Form>
    );

    expect(container.querySelector('input').hasAttribute('id')).toBeTruthy();
  });

  test('should have proper aria attributes', async () => {
    const { container, getByText, getByDisplayValue, getByTestId } = render(
      <Form
        initialValues={{ name: 'John' }}
        onSubmit={() => {}}
        validationSchema={yup.object().shape({ name: yup.string().required() })}
      >
        <Field name="name" helpMessage="help text" data-testid="name-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const input = getByTestId('name-input');
    const help = getByText('help text');

    expect(help).toHaveAttribute('id', 'name-helpmessage');
    expect(input).toHaveAttribute('aria-describedby', ' name-helpmessage');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    await fireEvent.change(getByDisplayValue('John'), {
      target: {
        name: 'name',
        value: '',
      },
    });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const feedback = container.querySelector('.invalid-feedback');

      expect(feedback).toBeDefined();
      expect(feedback).toHaveAttribute('id', 'name-feedback');
      expect(help).toHaveAttribute('id', 'name-helpmessage');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute(
        'aria-describedby',
        'name-feedback name-helpmessage'
      );
    });
  });
});
