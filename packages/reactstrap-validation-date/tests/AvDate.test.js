import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { AvDate } from '..';

const onValidSubmit = jest.fn();
const onInvalidSubmit = jest.fn();
const onSubmit = jest.fn();

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const Date = props => (
  <AvForm
    onInvalidSubmit={onInvalidSubmit}
    onSubmit={onSubmit}
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
});
