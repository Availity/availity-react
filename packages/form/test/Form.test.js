import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Input } from '..';

describe('Form', () => {
  test('renders', () => {
    const { getByTestId } = render(<Form />);

    getByTestId('form-container');
  });

  test('validates properly', async () => {
    const schema = yup.object().shape({
      hello: yup.string().required('This field is required.'),
    });

    const onSubmit = jest.fn();

    const { getByTestId, getByText } = render(
      <Form
        initialValues={{
          hello: 'hello',
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <Input name="hello" data-testid="hello-input" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    getByTestId('form-container');

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          hello: 'hello',
        }),
        expect.anything()
      );
    });
  });
});
