import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Button, Label } from 'reactstrap';
import { Form } from '@availity/form';
import * as yup from 'yup';
import { DateField } from '..';

afterEach(() => {
  cleanup();
});

describe('Date', () => {
  test('renders with a string label', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <DateField name="singleDate" data-testid="single-select" label="My Date Field" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const field = getByText('My Date Field');
    expect(field).toBeDefined();
  });

  test('renders with a component label', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <DateField name="singleDate" data-testid="single-select" label={<Label>My Date Field</Label>} />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const label = getByText('My Date Field');
    expect(label.hasAttribute('for')).toBeFalsy();
  });

  test('renders label props passed with labelAttrs', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <DateField name="singleDate" data-testid="single-select" label="My Date Field" labelAttrs={{ tag: 'h3' }} />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const label = getByText('My Date Field');
    expect(label.tagName).toEqual('H3');
  });

  test('renders with field help icon', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={() => {}}
      >
        <DateField name="singleDate" data-testid="single-select" label="My Date Field" helpId="dateHelp" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(getByTestId('field-help-icon')).toBeDefined();
  });

  test('renders with required asterisk', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={() => {}}
      >
        <DateField name="singleDate" data-testid="single-select" label="My Date Field" required />
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(getByTestId('required-asterisk')).toBeDefined();
  });

  test('renders error text', async () => {
    const onSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          singleDate: yup.string().required('This field is required'),
        })}
      >
        <DateField name="singleDate" data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const field = getByTestId('date-input-group-singleDate');
      const error = getByText('This field is required');
      expect(field).toBeDefined();
      expect(error).toBeDefined();
    });
  });
});
