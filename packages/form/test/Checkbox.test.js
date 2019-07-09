import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Checkbox, CheckboxGroup } from '..';

describe('Radio', () => {
  test('renders danger className when invalid form', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.array().required('This field is required'),
        })}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" data-testid="hello-check" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      const checkbox = getByTestId('hello-check');

      expect(checkbox.className).toContain('is-touched');
      expect(checkbox.className).toContain('is-invalid');
    });
  });

  test('renders with label', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: '',
        }}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" />
        </CheckboxGroup>
      </Form>
    );

    getByText('Check One');
  });
});
