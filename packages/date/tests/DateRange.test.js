import React from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  within,
} from '@testing-library/react';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import { object, string } from 'yup';
import moment from 'moment';
import { DateRange } from '..';

afterEach(() => {
  cleanup();
});

describe('DateRange', () => {
  test('renders error classes', async () => {
    const onSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={object().shape({
          dateRange: string().required('This field is required'),
        })}
      >
        <DateRange id="dateRange" name="dateRange" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      const input = getByTestId('date-range-input-group-dateRange');
      expect(input.className).toContain('is-invalid');
      expect(input.className).toContain('is-touched');
    });
  });

  test('onChange callback works', async () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();

    const { container } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
      >
        <DateRange id="dateRange" name="dateRange" onChange={onChange} />
        <Button type="submit">Submit</Button>
      </Form>
    );

    // Simulate user entering start date
    const start = container.querySelector('#dateRange-start');

    fireEvent.focus(start);

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

    await wait(() => {
      expect(onChange.mock.calls[1][0]).toStrictEqual({
        startDate: '1997-01-04',
        endDate: '1997-01-05',
      });
    });
  });

  test('autoSync updates other value', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
      >
        <DateRange id="dateRange" name="dateRange" autoSync />
        <Button type="submit">Submit</Button>
      </Form>
    );

    // Simulate user entering start date
    const start = container.querySelector('#dateRange-start');

    fireEvent.focus(start);

    fireEvent.change(start, {
      target: {
        value: '01/04/1997',
      },
    });

    const end = container.querySelector('#dateRange-end');
    fireEvent.focus(end);

    // Store the state of the end value
    const endValue = end.value;

    // Check that end date was auto synced
    expect(endValue).toEqual(start.value);

    // Simulate user clearing start date
    const startDt = container.querySelector('#dateRange-start');
    fireEvent.focus(startDt);

    fireEvent.change(startDt, {
      target: {
        value: '11/10/1993',
      },
    });

    const endDt = container.querySelector('#dateRange-end');
    fireEvent.focus(endDt);

    // Check that end date was not auto synced
    expect(startDt.value).toBe('11/10/1993');
    expect(endDt.value).toBe(endValue);
  });

  test('works with text input', async () => {
    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
      >
        <DateRange id="dateRange" name="dateRange" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    // Simulate user entering start date
    const start = container.querySelector('#dateRange-start');

    fireEvent.focus(start);

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
  });

  test('works with date picker', async () => {
    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
      >
        <DateRange id="dateRange" name="dateRange" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    // Simulate user selecting today as start date
    const current = container.querySelector('.CalendarDay__today');
    const previous = current.previousSibling;
    const next =
      current.nextSibling ||
      current.parentElement.nextSibling.firstElementChild;

    const isCurrentDayLastDayOfMonth =
      moment().dayOfYear() ===
      moment()
        .endOf('month')
        .dayOfYear();

    let expectedStartDate = moment();
    let expectedEndDate = moment().add(1, 'day');
    if (isCurrentDayLastDayOfMonth) {
      fireEvent.click(previous);
      fireEvent.click(current);
      expectedStartDate = moment().subtract(1, 'day');
      expectedEndDate = moment();
    } else {
      fireEvent.click(current);
      fireEvent.click(next);
    }

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          dateRange: {
            startDate: expectedStartDate.format('YYYY-MM-DD'),
            endDate: expectedEndDate.format('YYYY-MM-DD'),
          },
        }),
        expect.anything()
      );
    });
  });

  test('same day can be selected', async () => {
    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
      >
        <DateRange id="dateRange" name="dateRange" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    // Simulate user selecting today as start date
    const start = container.querySelector('.CalendarDay__today');
    fireEvent.click(start);

    // Simulate user selecting today as end date
    const end = container.querySelector('.CalendarDay__today');
    fireEvent.click(end);

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          dateRange: {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
          },
        }),
        expect.anything()
      );
    });
  });

  test('pre-selected date ranges appear', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
      >
        <DateRange id="dateRange" name="dateRange" ranges />
        <Button type="submit">Submit</Button>
      </Form>
    );

    container.querySelector('.DateRangePickerInput_calendarIcon').click();

    await wait(() => {
      expect(
        container.querySelector(
          '.DayPicker_calendarInfo__horizontal DayPicker_calendarInfo__horizontal_1'
        )
      ).toBeDefined();
    });

    // Simulate User hitting the 'Today' pre-set
    container.querySelectorAll('.btn-default')[0].click();

    const today = moment().format('MM/DD/YYYY');

    expect(
      container.querySelectorAll('.DateInput_input.DateInput_input_1')[0].value
    ).toEqual(today);

    expect(
      container.querySelectorAll('.DateInput_input.DateInput_input_1')[1].value
    ).toEqual(today);
  });

  test('renders month picker', async () => {
    const { container, getAllByTestId } = render(
      <Form
        initialValues={{
          dateRange: '',
        }}
      >
        <DateRange name="dateRange" />
      </Form>
    );

    // Simulate user entering start date
    const start = container.querySelector('#dateRange-start');

    fireEvent.focus(start);

    // There will be multiple pickers because react-dates renders hidden prev/next CalendarMonthGrids
    const monthPickers = getAllByTestId('monthPicker');
    expect(monthPickers.length).toBe(4);

    const currentGridMonthPicker = monthPickers[1];
    expect(currentGridMonthPicker.children.length).toBe(12); // 12 options -> 12 months of year

    const jan = within(currentGridMonthPicker).getByText('January');
    expect(jan).toBeDefined();
  });

  test('renders year picker with given range', async () => {
    const min = moment().subtract(101, 'years');
    const max = moment();
    const someYear = '1947';

    const { container, getAllByTestId } = render(
      <Form
        initialValues={{
          dateRange: '',
        }}
      >
        <DateRange name="dateRange" min={min} max={max} />
      </Form>
    );

    // Simulate user entering start date
    const start = container.querySelector('#dateRange-start');

    fireEvent.focus(start);

    // There will be multiple pickers because react-dates renders hidden prev/next CalendarMonthGrids
    const yearPickers = getAllByTestId('yearPicker');
    expect(yearPickers.length).toBe(4);

    const currentGridYearPicker = yearPickers[1];
    expect(currentGridYearPicker.children.length).toBe(
      max.year() - min.year() + 1
    );

    const pickedYear = within(currentGridYearPicker).getByText(someYear);
    expect(pickedYear).toBeDefined();
  });

  test('renders new year option when navigating past initial range', async () => {
    const onChange = jest.fn();

    const min = moment('12/01/2020').subtract(1, 'years');
    const max = moment('12/31/2021');
    const newYear = `${max.year() + 1}`;

    const { container, getAllByTestId } = render(
      <Form
        initialValues={{
          dateRange: '',
        }}
      >
        <DateRange name="dateRange" min={min} max={max} onChange={onChange} />
      </Form>
    );

    // Simulate user entering start date
    const start = container.querySelector('#dateRange-start');
    const end = container.querySelector('#dateRange-end');

    fireEvent.focus(start);

    // There will be multiple pickers because react-dates renders hidden prev/next CalendarMonthGrids
    let yearPickers = getAllByTestId('yearPicker');
    expect(yearPickers.length).toBe(4);

    let currentGridYearPicker = yearPickers[1];
    let nextGridYearPicker = yearPickers[2]; // next in this context refers to the next CalendarMonthGrid to be rendered

    // Expect year options to have same length as range of initial options
    expect(currentGridYearPicker.children.length).toBe(
      max.year() - min.year() + 1
    );
    expect(nextGridYearPicker.children.length).toBe(
      max.year() - min.year() + 1
    );

    fireEvent.change(start, {
      target: {
        value: `12/25/${max.year()}`,
      },
    });

    fireEvent.focus(end);

    fireEvent.change(end, {
      target: {
        value: `12/26/${max.year()}`,
      },
    });

    await wait(() => {
      expect(onChange.mock.calls[0][0]).toStrictEqual({
        endDate: '',
        startDate: `${max.year()}-12-25`,
      });

      expect(onChange.mock.calls[1][0]).toStrictEqual({
        endDate: `${max.year()}-12-26`,
        startDate: `${max.year()}-12-25`,
      });
    });

    fireEvent.focus(start);

    // re-query to grab updated values and reassign
    yearPickers = getAllByTestId('yearPicker');
    currentGridYearPicker = yearPickers[1];
    nextGridYearPicker = yearPickers[3];

    // Expect current MonthGrid to have same number of options, it is still December of max
    // Expect next MonthGrid (January) to have new year option created
    expect(currentGridYearPicker.children.length).toBe(
      max.year() - min.year() + 1
    );
    expect(nextGridYearPicker.children.length).toBe(
      max.year() - min.year() + 2
    );

    const pickedYear = within(nextGridYearPicker).getByText(newYear);
    expect(pickedYear).toBeDefined();
  });
});
