import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { AvDateRange } from '..';

const onValidSubmit = jest.fn();
const onInvalidSubmit = jest.fn();
const onSubmit = jest.fn();

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const DateRange = props => (
  <AvForm
    onInvalidSubmit={onInvalidSubmit}
    onSubmit={onSubmit}
    onValidSubmit={onValidSubmit}
  >
    <AvDateRange {...props} />
    <Button type="submit">Submit</Button>
  </AvForm>
);

describe('AvDateRange', () => {
  test('should submit proper structure', async () => {
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
      />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          date: {
            start: '2001-01-01',
            end: '2001-01-04',
          },
        })
      );
    });
  });
});
