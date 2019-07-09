import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Radio, RadioGroup } from '..';

describe('Radio', () => {
  test('renders danger className when invalid form', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" data-testid="hello-radio" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      const radio = getByTestId('hello-radio');

      expect(radio.className).toContain('is-touched');
      expect(radio.className).toContain('is-invalid');
    });
  });

  test('renders with label', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: '',
        }}
      >
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" />
        </RadioGroup>
      </Form>
    );

    getByText('Radio One');
  });
});
