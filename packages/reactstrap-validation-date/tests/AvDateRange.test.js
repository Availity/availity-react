import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import moment from 'moment';
import { AvDateRange } from '..';

const onValidSubmit = jest.fn();
const onInvalidSubmit = jest.fn();
const onSubmit = jest.fn();

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// eslint-disable-next-line react/prop-types
const DateRange = ({ model, ...props }) => (
  <AvForm
    onInvalidSubmit={onInvalidSubmit}
    onSubmit={onSubmit}
    onValidSubmit={onValidSubmit}
    model={model}
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

  test('should work with default values prop', async () => {
    const { getByText } = render(
      <DateRange
        name="standAlone"
        start={{
          name: 'date.start',
        }}
        end={{
          name: 'date.end',
        }}
        defaultValues={{
          start: {
            value: '1',
            units: 'day',
          },
          end: {
            value: '3',
            units: 'day',
          },
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          date: {
            start: moment()
              .add(1, 'day')
              .format('YYYY-MM-DD'),
            end: moment()
              .add(3, 'day')
              .format('YYYY-MM-DD'),
          },
        })
      );
    });
  });

  test('should work with default values form model', async () => {
    const { getByText } = render(
      <DateRange
        name="standAlone"
        start={{
          name: 'date.start',
        }}
        end={{
          name: 'date.end',
        }}
        model={{
          'date.start': '2001-01-01',
          'date.end': '2001-01-04',
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

  test('should call invalid submit if date range exceeds max distance', async () => {
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
        distance={{ max: { value: 2, units: 'day' } }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onInvalidSubmit).toHaveBeenCalled();
    });
  });

  test('should call invalid submit if date range is shorter than min distance', async () => {
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
        distance={{ min: { value: 10, units: 'day' } }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onInvalidSubmit).toHaveBeenCalled();
    });
  });

  test('should pass on date range with min and max distance', async () => {
    const { getByText } = render(
      <DateRange
        name="standAlone"
        start={{
          name: 'date.start',
          value: '01/01/2001',
        }}
        end={{
          name: 'date.end',
          value: '01/05/2001',
        }}
        distance={{
          min: { value: 2, units: 'day' },
          max: {
            value: 6,
            units: 'day',
          },
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalled();
    });
  });

  test('works with text input', async () => {
    const { container, getByText } = render(
      <DateRange
        name="dateRange"
        start={{ name: 'date.start' }}
        end={{ name: 'date.end' }}
      />
    );

    // Simulate user entering start date
    const start = container.querySelector('#dateRange-start');

    fireEvent.change(start, {
      target: {
        value: '01/04/1997',
      },
    });

    // Simulate user entering end date
    const end = container.querySelector('#dateRange-end');

    fireEvent.change(end, {
      target: {
        value: '01/05/1997',
      },
    });

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          date: {
            start: '1997-01-04',
            end: '1997-01-05',
          },
        })
      );
    });
  });

  test('works with date picker', async () => {
    const { container, getByText } = render(
      <DateRange
        name="dateRange"
        start={{ name: 'date.start' }}
        end={{ name: 'date.end' }}
      />
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    // Simulate user selecting today as start date
    const start = container.querySelector('.CalendarDay__today');
    fireEvent.click(start);

    // Simulate user selecting tomorrow as end date
    const end = container.querySelector('.CalendarDay__today').nextSibling;
    fireEvent.click(end);

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          date: {
            start: moment().format('YYYY-MM-DD'),
            end: moment()
              .add(1, 'day')
              .format('YYYY-MM-DD'),
          },
        })
      );
    });
  });
});
