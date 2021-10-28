import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Button, Label } from 'reactstrap';
import { Form } from '@availity/form';
import * as yup from 'yup';
import { DateRangeField } from '..';

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
        <DateRangeField name="dateRange" label="My Date Field" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const el = getByText('My Date Field');
    expect(el).toBeDefined();
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
        <DateRangeField name="dateRange" label={<Label>My Date Field</Label>} />
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
        <DateRangeField name="dateRange" label="My Date Field" labelAttrs={{ tag: 'h3' }} />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const label = getByText('My Date Field');
    expect(label.tagName).toEqual('H3');
  });

  test('renders error text', async () => {
    const onSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          dateRange: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          dateRange: yup.string().required('This field is required'),
        })}
      >
        <DateRangeField id="dateRange" name="dateRange" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const el1 = getByTestId('date-range-input-group-dateRange');
      const el2 = getByText('This field is required');
      expect(el1).toBeDefined();
      expect(el2).toBeDefined();
    });
  });
});
