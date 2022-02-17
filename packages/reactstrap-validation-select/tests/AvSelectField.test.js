import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

import { AvSelectField } from '..';

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

const renderSelect = (props) =>
  render(
    <AvForm>
      <AvSelectField name="test-form-input" data-testid="select-field" {...props} />
      <Button type="submit">Submit</Button>
    </AvForm>
  );

describe('AvSelect', () => {
  test('default behavior works', async () => {
    const { getByText } = renderSelect({
      options,
      classNamePrefix: 'test',
      getResult: 'regions',
      label: 'Hello World',
    });
    const select = getByText('Hello World');
    expect(select).toBeDefined();
  });

  test('works with error message', async () => {
    const { getByText } = renderSelect({
      options,
      classNamePrefix: 'test__creatable',
      getResult: 'regions',
      required: true,
      validate: {
        required: {
          errorMessage: 'This field is wrong.',
        },
      },
    });
    fireEvent.click(getByText('Submit'));
    const err = await waitFor(() => getByText('This field is wrong.'));
    expect(err).toBeDefined();
  });

  test('has aria-describedby attribute', async () => {
    const { getByText } = renderSelect({
      options,
      classNamePrefix: 'test',
      getResult: 'regions',
      label: 'Hello World',
    });
    const select = getByText('Hello World');
    expect(getByTestId('select-field')).toHaveAttribute('aria-describedby');
    expect(select).toBeDefined();
  });

});
