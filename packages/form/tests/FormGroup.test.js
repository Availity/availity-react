import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';

import { Form, Input, FormGroup } from '..';

describe('FormGroup', () => {
  test('renders with danger className when invalid form input', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => ({})}
        validationSchema={yup.object().shape({
          hello: yup.string().required(),
        })}
      >
        <FormGroup for="hello" data-testid="hello-group">
          <Input name="hello" data-testid="hello-input" />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const formGroup = getByTestId('hello-group');

      expect(formGroup.className).toContain('text-danger');
    });
  });
});
