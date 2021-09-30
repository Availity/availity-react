import React from 'react';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Checkbox, CheckboxGroup } from '..';

afterEach(cleanup);

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

    await waitFor(() => {
      const checkbox = getByTestId('hello-check');

      expect(checkbox.className).toContain('is-touched');
      expect(checkbox.className).toContain('is-invalid');
      expect(getByText('This field is required')).toBeDefined();
    });
  });

  test('renders aria attributes on input when invalid form', async () => {
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
          <Checkbox groupName="hello" label="Check One" value="uno" data-testid="hello-check" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    const checkbox = getByTestId('hello-check');

    expect(checkbox).toHaveAttribute('aria-invalid', 'false');
    expect(checkbox).toHaveAttribute('aria-describedby', '');

    await fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
      expect(checkbox).toHaveAttribute('aria-describedby', 'hello-feedback');
      expect(getByText('This field is required')).toHaveAttribute('id', 'hello-feedback');
    });
  });

  test('renders empty aria-describedby on input when invalid form with no groupName passed', async () => {
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

    await waitFor(() => {
      const checkbox = getByTestId('hello-check');

      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
      expect(checkbox).toHaveAttribute('aria-describedby', '');
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

    const el = getByText('Check One');
    expect(el).toBeDefined();
  });

  test('renders with field help icon', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" helpId="UnoHelpTopic" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(getByTestId('field-help-icon')).toBeDefined();
  });

  test('renders without inline applied', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" inline={false} />
        </CheckboxGroup>
      </Form>
    );

    const checkbox = getByText('Check One').parentElement;

    expect(checkbox.className).not.toContain('form-check-inline');
  });

  test('should generate uuid even when id is not added', () => {
    const { container } = render(
      <Form initialValues={{ hello: '' }} onSubmit={() => {}}>
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" />
        </CheckboxGroup>
      </Form>
    );

    expect(container.querySelector('input').hasAttribute('id')).toBeTruthy();
  });

  test('should use id when passed in', () => {
    const { container } = render(
      <Form initialValues={{ hello: '' }} onSubmit={() => {}}>
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" id="test" />
        </CheckboxGroup>
      </Form>
    );

    expect(container.querySelector('input').getAttribute('id')).toEqual('test');
  });
});
