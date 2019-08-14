import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import * as yup from 'yup';
import { DateField } from '..';

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
        <DateField
          name="singleDate"
          data-testid="single-select"
          label="My Date Field"
        />
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

    await wait(() => {
      getByTestId('date-input-group-singleDate');
      getByText('This field is required');
    });
  });
});
