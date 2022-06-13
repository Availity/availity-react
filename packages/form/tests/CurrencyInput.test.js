import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';

import { Form, CurrencyInput } from '../src';

describe('CurrencyInput', () => {
  test('renders with initial value', () => {
    const { container } = render(
      <Form
        onSubmit={() => {
          console.log('submitted');
        }}
        initialValues={{}}
      >
        <CurrencyInput name="paidAmount" value="1.11" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    const currencyInput = container.querySelector('input');
    expect(currencyInput.value).toEqual('$1.11');
  });

  test('renders danger className when invalid form', async () => {
    const { getByText, container } = render(
      <Form
        onSubmit={() => {
          console.log('submitted');
        }}
        initialValues={{}}
        validationSchema={yup.object().shape({
          paidAmount: yup.string().required('This field is required'),
        })}
      >
        <CurrencyInput name="paidAmount" />
      </Form>
    );

    const currencyInput = container.querySelector('input');

    fireEvent.focus(currencyInput);

    fireEvent.blur(currencyInput);

    await waitFor(() => {
      expect(currencyInput.className).toContain('is-touched');
      expect(currencyInput.className).toContain('is-invalid');
      expect(getByText('This field is required')).toBeDefined();
    });
  });

  test('renders invalid aria attribute on input when invalid form', async () => {
    const { getByText, container } = render(
      <Form
        onSubmit={() => {
          console.log('submitted');
        }}
        initialValues={{}}
        validationSchema={yup.object().shape({
          paidAmount: yup.string().required('This field is required'),
        })}
      >
        <>
          <CurrencyInput name="paidAmount" />
          <Button type="submit">Submit</Button>
        </>
      </Form>
    );

    const currencyInput = container.querySelector('input');

    expect(currencyInput).toHaveAttribute('aria-invalid', 'false');

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(currencyInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test('should format decimals on blur', async () => {
    const { container } = render(
      <Form
        onSubmit={() => {
          console.log('submitted');
        }}
        initialValues={{}}
      >
        <>
          <CurrencyInput name="paidAmount" value="1" />
          <Button type="submit">Submit</Button>
        </>
      </Form>
    );

    const currencyInput = container.querySelector('input');

    fireEvent.focus(currencyInput);

    expect(currencyInput.value).toEqual('1');

    fireEvent.blur(currencyInput);

    expect(currencyInput.value).toEqual('$1.11');
  });

  test('should use id when passed in', () => {
    const { container } = render(
      <Form
        onSubmit={() => {}}
        initialValues={{
          paidAmount: '',
        }}
      >
        <CurrencyInput name="paidAmount" id="paidAmountId" />
      </Form>
    );

    expect(container.querySelector('input').getAttribute('id')).toEqual('paidAmountId');
  });
});
