import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Input, Feedback } from '..';

describe('Feedback', () => {
  test('renders feedback error', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => ({})}
        validationSchema={yup.object().shape({
          hello: yup.string().required('Oops'),
        })}
      >
        <Input name="hello" data-testid="hello-input" />
        <Feedback data-testid="hello-feedback" name="hello" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      const feedback = getByTestId('hello-feedback');

      expect(feedback.textContent).toBe('Oops');
    });
  });
});
