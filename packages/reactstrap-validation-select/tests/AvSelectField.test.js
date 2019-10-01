import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

import { AvSelectField } from '..';

afterEach(cleanup);

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

const renderSelect = props =>
  render(
    <AvForm>
      <AvSelectField name="test-form-input" {...props} />
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

    getByText('Hello World');
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

    await waitForElement(() => getByText('This field is wrong.'));
  });
});
