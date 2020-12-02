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
import { avDate } from '@availity/yup';
import { object } from 'yup';
import moment from 'moment';
import FormikDate from '..';

afterEach(() => {
  cleanup();
});

describe('Date', () => {
  test('renders error classes', async () => {
    const onSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
        validationSchema={object().shape({
          singleDate: avDate({ format: 'MM/DD/YYYY' }).required(
            'This field is required'
          ),
        })}
      >
        <FormikDate name="singleDate" data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      const input = getByTestId('date-input-group-singleDate');
      expect(input.className).toContain('is-invalid');
      expect(input.className).toContain('is-touched');
    });
  });

  test('renders calls on change', async () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();

    const { container } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <FormikDate
          name="singleDate"
          data-testid="single-select"
          onChange={onChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.change(input, {
      target: {
        value: '01/04/1997',
      },
    });

    await wait(() => {
      expect(onChange.mock.calls[0][0]).toBe('1997-01-04');
    });
  });

  test('works with text input', async () => {
    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <FormikDate name="singleDate" data-testid="single-select" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.change(input, {
      target: {
        value: '01/04/1997',
      },
    });

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          singleDate: '1997-01-04',
        }),
        expect.anything()
      );
    });
  });

  test('works with date picker', async () => {
    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <FormikDate name="singleDate" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    fireEvent.click(container.querySelector('.CalendarDay__today'));

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          singleDate: moment().format('YYYY-MM-DD'),
        }),
        expect.anything()
      );
    });
  });

  test('renders month picker', async () => {
    const { container, getAllByTestId } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
      >
        <FormikDate name="singleDate" />
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    // There will be multiple pickers because react-dates renders hidden prev/next CalendarMonthGrids
    const monthPickers = getAllByTestId('monthPicker');
    expect(monthPickers.length).toBe(3);

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
          singleDate: '',
        }}
      >
        <FormikDate name="singleDate" min={min} max={max} />
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    // There will be multiple pickers because react-dates renders hidden prev/next CalendarMonthGrids
    const yearPickers = getAllByTestId('yearPicker');
    expect(yearPickers.length).toBe(3);

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
          singleDate: '',
        }}
      >
        <FormikDate name="singleDate" min={min} max={max} onChange={onChange} />
      </Form>
    );

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    // There will be multiple pickers because react-dates renders hidden prev/next CalendarMonthGrids
    let yearPickers = getAllByTestId('yearPicker');
    expect(yearPickers.length).toBe(3);

    let currentGridYearPicker = yearPickers[1];
    let nextGridYearPicker = yearPickers[2]; // next in this context refers to the next CalendarMonthGrid to be rendered

    // Expect year options to have same length as range of initial options
    expect(currentGridYearPicker.children.length).toBe(
      max.year() - min.year() + 1
    );
    expect(nextGridYearPicker.children.length).toBe(
      max.year() - min.year() + 1
    );

    fireEvent.change(input, {
      target: {
        value: `12/25/${max.year()}`,
      },
    });

    await wait(() => {
      expect(onChange.mock.calls[0][0]).toBe(`${max.year()}-12-25`);
    });

    fireEvent.focus(input);

    // re-query to grab updated values and reassign
    yearPickers = getAllByTestId('yearPicker');
    currentGridYearPicker = yearPickers[1];
    nextGridYearPicker = yearPickers[2];

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
