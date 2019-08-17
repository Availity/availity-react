import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import { Form } from '@availity/form';
import '@availity/yup/moment';
import * as yup from 'yup';
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
        validationSchema={yup.object().shape({
          dateRange: yup.string().required('This field is required'),
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
    const start = container.querySelector('.CalendarDay__today');
    fireEvent.click(start);

    // Simulate user selecting tomorrow as end date
    const end = container.querySelector('.CalendarDay__today').nextSibling;
    fireEvent.click(end);

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          dateRange: {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment()
              .add(1, 'day')
              .format('YYYY-MM-DD'),
          },
        }),
        expect.anything()
      );
    });
  });

  test('works with custom start/end keys', async () => {
    const onSubmit = jest.fn();
    const schema = yup.object().shape({
      dateRange: yup.dateRange({
        startKey: 'customStartKey',
        endKey: 'customEndKey',
      }),
    });

    const { container, getByText } = render(
      <Form
        initialValues={{
          dateRange: undefined,
        }}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        <DateRange
          id="dateRange"
          name="dateRange"
          startKey="customStartKey"
          endKey="customEndKey"
        />
        <Button type="submit">Submit</Button>
      </Form>
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
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          dateRange: {
            customStartKey: moment().format('YYYY-MM-DD'),
            customEndKey: moment()
              .add(1, 'day')
              .format('YYYY-MM-DD'),
          },
        }),
        expect.anything()
      );
    });
  });
});
