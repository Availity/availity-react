import React from 'react';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Input } from '..';

afterEach(cleanup);

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

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
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

    fireEvent.focus(getByTestId('hello-input'));

    fireEvent.blur(getByTestId('hello-input'));

    await waitFor(() => {
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

    fireEvent.focus(getByTestId('hello-input'));

    fireEvent.blur(getByTestId('hello-input'));

    await waitFor(() => {
      const input = getByTestId('hello-input');
      expect(input.className).toContain('is-invalid');
      expect(input.className).toContain('was-validated');
    });
  });

  test('checkbox renders initial checked of true', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: true,
        }}
        validationSchema={yup.object().shape({
          hello: yup.boolean().required(),
        })}
        onSubmit={() => {}}
      >
        <Input name="hello" data-testid="hello-input" type="checkbox" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const input = getByTestId('hello-input');

    expect(input.getAttribute('value')).toBe('true');
    expect(input.getAttribute('checked')).toBe(''); // null would mean its not checked...
  });

  test('should render appropriate aria-attributes', async () => {
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

    const input = getByTestId('hello-input');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveAttribute('aria-describedby', '');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', ''); // left blank if no feedback
    });
  });
});
