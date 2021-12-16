import React from 'react';
import { render, fireEvent, waitFor, cleanup, queryByAttribute} from '@testing-library/react';
import { Button, Label } from 'reactstrap';
import { Form } from '@availity/form';
import * as yup from 'yup';
import { DateRangeField } from '..';

afterEach(() => {
  cleanup();
});

describe('Date', () => {
  test('renders with a string label', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <DateRangeField name="dateRange" label="My Date Field" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const el = getByText('My Date Field');
    expect(el).toBeDefined();
  });

  test('renders with a component label', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <DateRangeField name="dateRange" label={<Label>My Date Field</Label>} />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const label = getByText('My Date Field');
    expect(label.hasAttribute('for')).toBeFalsy();
  });

  test('renders label props passed with labelAttrs', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={onSubmit}
      >
        <DateRangeField name="dateRange" label="My Date Field" labelAttrs={{ tag: 'h3' }} />
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    const label = getByText('My Date Field');
    expect(label.tagName).toEqual('H3');
  });

  test('renders with field help icon', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={() => {}}
      >
        <DateRangeField name="dateRange" label="My Date Field" helpId="dateHelp" />
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(getByTestId('field-help-icon')).toBeDefined();
  });

  test('renders with required asterisk', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          singleDate: '',
        }}
        onSubmit={() => {}}
      >
        <DateRangeField name="dateRange" label="My Date Field" required />
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(getByTestId('required-asterisk')).toBeDefined();
  });

  test('renders error text', async () => {
    const onSubmit = jest.fn();

    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          dateRange: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          dateRange: yup.string().required('This field is required'),
        })}
      >
        <DateRangeField id="dateRange" name="dateRange" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const el1 = getByTestId('date-range-input-group-dateRange');
      const el2 = getByText('This field is required');
      expect(el1).toBeDefined();
      expect(el2).toBeDefined();
    });
  });

  test('renders aria-describedby', async () => {
    const onSubmit = jest.fn();

    const { container, getByText, getByTestId } = render(
      <Form
        initialValues={{
          dateRange: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          dateRange: yup.string().required('This field is required'),
        })}
      >
        <DateRangeField id="dateRange" name="dateRange" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    await waitFor(() => {
      
      const getById = queryByAttribute.bind(null, 'id');
      const firstInput = getById(container, 'dateRange-start');
      expect(firstInput).toBeDefined();
      expect(firstInput).toHaveAttribute('aria-describedby', 'DateInput__screen-reader-message-dateRange-start daterange-feedback');
      const secondInput = getById(container, 'dateRange-end');
      expect(secondInput).toBeDefined();
      expect(secondInput).toHaveAttribute('aria-describedby', 'DateInput__screen-reader-message-dateRange-end daterange-feedback');
    });
  });
});
