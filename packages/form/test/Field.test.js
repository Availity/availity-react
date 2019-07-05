import React from 'react';
import { render } from '@testing-library/react';
import { Form, Field } from '..';

describe('Field', () => {
  test('renders with label', () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
      >
        <Field name="hello" label="Hello Label" data-testid="hello-input" />
      </Form>
    );

    getByText('Hello Label');
  });
});
