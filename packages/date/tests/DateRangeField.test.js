import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import * as yup from 'yup';
import { DateRangeField } from '..';

afterEach(() => {
  cleanup();
});

describe('Date', () => {
  test('renders with label', async () => {
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

    getByText('My Date Field');
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

    await wait(() => {
      getByTestId('date-range-input-group-dateRange');
      getByText('This field is required');
    });
  });
});
