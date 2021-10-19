import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Input } from '..';

afterEach(cleanup);

describe('Form', () => {
  test('renders', () => {
    const { getByTestId } = render(<Form initialValues={{}} onSubmit={() => {}} />);

    const el = getByTestId('form-container');
    expect(el).toBeDefined();
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

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          hello: 'hello',
        }),
        expect.anything()
      );
    });
  });
});
