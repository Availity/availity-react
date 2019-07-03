import React from 'react';
import { render } from '@testing-library/react';
import { Form, Input } from "..";

describe('Form', () => {
  test('renders with initial value', () => {
    const { getByTestId } = render(
      <Form
      initialValues={{
          hello:'hello',
      }}
      >
        <Input name="hello" data-testid="hello-input"/>
      </Form>
    );

    const input = getByTestId('hello-input');

    expect(input.value).toBe('hello')
  });
});
