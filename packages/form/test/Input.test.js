import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Input } from '..';

describe('Input', () => {
  test('renders with initial value', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={() => {}}
      >
        <Input name="hello" data-testid="hello-input" />
      </Form>
    );

    const input = getByTestId('hello-input');

    expect(input.value).toBe('hello');
  });

  test('renders error className', async () => {
    const { getByTestId, getByText } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
        validationSchema={yup.object().shape({
          hello: yup.string().required(),
        })}
      >
        <Input name="hello" data-testid="hello-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      const input = getByTestId('hello-input');
      expect(input.className).toContain('av-invalid');
      expect(input.className).toContain('is-touched');
    });
  });

  test('renders error className after touch', async () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.string().required(),
        })}
        onSubmit={() => {}}
      >
        <Input name="hello" data-testid="hello-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.focus(getByTestId('hello-input'));

    await fireEvent.blur(getByTestId('hello-input'));

    await wait(() => {
      const input = getByTestId('hello-input');
      expect(input.className).toContain('is-invalid');
      expect(input.className).toContain('is-touched');
    });
  });

  test('checkbox renders error className after touch', async () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.string().required(),
        })}
        onSubmit={() => {}}
      >
        <Input name="hello" data-testid="hello-input" type="checkbox" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.focus(getByTestId('hello-input'));

    await fireEvent.blur(getByTestId('hello-input'));

    await wait(() => {
      const input = getByTestId('hello-input');
      expect(input.className).toContain('is-invalid');
      expect(input.className).toContain('was-validated');
    });
  });
});
