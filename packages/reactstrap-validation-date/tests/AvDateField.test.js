import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { AvDateField } from '..';

afterEach(() => {
  cleanup();
});

const Date = props => (
  <AvForm>
    <AvDateField {...props} />
    <Button type="submit">Submit</Button>
  </AvForm>
);

describe('AvDateField', () => {
  test('should render', () => {
    render(<Date name="standAlone" />);
  });

  test('render inital date', () => {
    const { container } = render(<Date name="standAlone" value="07/20/1995" />);

    const input = container.querySelector('.DateInput_input');

    expect(input.value).toBe('07/20/1995');
  });

  test('max date validation', async () => {
    const { getByText } = render(
      <Date
        name="standAlone"
        value="06/20/1995"
        label="Field"
        min="07/20/1995"
        validate={{
          min: {
            value: '07/20/1995',
            errorMessage: 'value must come after this date',
          },
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await waitForElement(() => getByText('value must come after this date'));
  });

  test('min date validation', async () => {
    const { getByText } = render(
      <Date
        name="standAlone"
        value="09/20/1995"
        label="Field"
        max="08/20/1995"
        validate={{
          max: {
            value: '08/20/1995',
            errorMessage: 'value must come before this date',
          },
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await waitForElement(() => getByText('value must come before this date'));
  });

  test('works with grid columns for label', async () => {
    const { getByText } = render(
      <Date
        name="standAlone"
        value="09/20/1995"
        label="Field"
        grid={{
          xs: 12,
          md: 6,
        }}
      />
    );

    const label = getByText('Field');

    expect(label.className).toContain('col-md-6');
  });
});
