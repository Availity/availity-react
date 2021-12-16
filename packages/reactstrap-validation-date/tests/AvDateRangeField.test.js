import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { AvDateRangeField } from '..';

afterEach(() => {
  cleanup();
});

const DateRange = (props) => (
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

    const el = await waitFor(() => getByText('Date must come after value'));
    expect(el).toBeDefined();
  });

  test('start date and no end date', async () => {
    const { getByText } = render(
      <DateRange
        name="standAlone"
        start={{
          name: 'date.start',
          value: '01/01/2001',
        }}
        end={{
          name: 'date.end',
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    const el = await waitFor(() => getByText('Both start and end date are required.'));
    expect(el).toBeDefined();
  });

  test('end date after start date', async () => {
    const { getByText } = render(
      <DateRange
        name="standAlone"
        start={{
          name: 'date.start',
          value: '01/04/2001',
        }}
        end={{
          name: 'date.end',
          value: '01/01/2001',
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    const el = await waitFor(() => getByText('Start Date must come before End Date.'));
    expect(el).toBeDefined();
  });

  test('end date and no start date', async () => {
    const { getByText } = render(
      <DateRange
        name="standAlone"
        start={{
          name: 'date.start',
        }}
        end={{
          name: 'date.end',
          value: '01/01/2001',
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    const range = await waitFor(() => getByText('Both start and end date are required.'));
    expect(range).toBeDefined();
  });

  test('display label with grid', async () => {
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
        label="Date Range Field"
        grid={{
          xs: 12,
          md: 6,
        }}
      />
    );

    const label = getByText('Date Range Field');

    expect(label.className).toContain('col-md-6');
  });


});
