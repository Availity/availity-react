/* eslint-disable react/prop-types */
import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import moment from 'moment';
import { AvDate } from '..';

const onValidSubmit = jest.fn();
const onInvalidSubmit = jest.fn();
const onSubmit = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Date = (props) => (
  <AvForm
    onInvalidSubmit={onInvalidSubmit}
    onSubmit={onSubmit}
    model={props.model}
    onValidSubmit={onValidSubmit}
  >
    <AvDate {...props} />
    <Button type="submit">Submit</Button>
  </AvForm>
);

describe('AvDate', () => {
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
      <Date name="standAlone" value="07/20/1995" max="06/20/1995" />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onInvalidSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('min date validation', async () => {
    const { getByText } = render(
      <Date name="standAlone" value="07/20/1995" min="08/20/1995" />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onInvalidSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('works with text input', async () => {
    const { container, getByText } = render(<Date name="standAlone" />);

    const input = container.querySelector('.DateInput_input');

    fireEvent.change(input, {
      target: {
        value: '01/04/1997',
      },
    });

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          standAlone: '1997-01-04',
        })
      );
    });
  });

  test('works with default value', async () => {
    const { getByText } = render(
      <Date
        name="standAlone"
        model={{
          standAlone: '1997-01-04',
        }}
      />
    );

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          standAlone: '1997-01-04',
        })
      );
    });
  });

  test('works with date picker', async () => {
    const { container, getByText } = render(<Date name="standAlone" />);

    const input = container.querySelector('.DateInput_input');

    fireEvent.focus(input);

    fireEvent.click(container.querySelector('.CalendarDay__today'));

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onValidSubmit).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          standAlone: moment().format('YYYY-MM-DD'),
        })
      );
    });
  });
});
