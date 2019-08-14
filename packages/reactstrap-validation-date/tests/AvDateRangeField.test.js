import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { AvDateRangeField } from '..';

afterEach(() => {
  cleanup();
});

const DateRange = props => (
  <AvForm>
    <AvDateRangeField {...props} />
    <Button type="submit">Submit</Button>
  </AvForm>
);

describe('AvDateRange', () => {
  test('display proper validation message', async () => {
    const { getByText } = render(
      <DateRange
        name="standAlone"
        start={{
          name: 'date.start',
          value: '01/01/2001',
        }}
        end={{
          name: 'date.end',
          value: '01/04/2001',
        }}
        min="01/03/2001"
        validate={{
          min: {
            value: '01/03/2001',
            errorMessage: 'Date must come after value',
          },
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await waitForElement(() => getByText('Date must come after value'));
  });
});
