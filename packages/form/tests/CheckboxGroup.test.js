import React from 'react';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Checkbox, CheckboxGroup } from '..';

afterEach(cleanup);

describe('CheckboxGroup', () => {
  test('renders with group class name', async () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: [],
        }}
        onSubmit={() => {}}
        // eslint-disable-next-line no-undef
        validationSchema={yup.object().shape({
          hello: yup.array().required('At least one checkbox is required'),
        })}
      >
        <CheckboxGroup
          name="hello"
          label="Checkbox Group"
          groupClassName="some-group"
        >
          <Checkbox label="Chcek One" value="uno" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    const formControl = getByTestId('check-items-hello');

    expect(formControl.className).toContain('some-group');
  });

  test('renders danger className when invalid form', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: [],
        }}
        onSubmit={() => {}}
        // eslint-disable-next-line no-undef
        validationSchema={yup.object().shape({
          hello: yup.array().required('At least one checkbox is required'),
        })}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Chcek One" value="uno" />
          <Checkbox label="Check Two" value="dos" />
          <Checkbox label="Check Three" value="tres" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const checkboxGroup = getByTestId('check-items-hello');

      expect(checkboxGroup.className).toContain('is-touched');
      expect(checkboxGroup.className).toContain('is-invalid');
    });
  });

  test('submits with proper radio values', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Form
        initialValues={{
          hello: [],
        }}
        // eslint-disable-next-line no-undef
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          hello: yup.array().required('At least one checkbox is required'),
        })}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" />
          <Checkbox label="Check Two" value="dos" />
          <Checkbox label="Check Three" value="tres" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Check One'));
    await fireEvent.click(getByText('Check Two'));

    await fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          hello: ['uno', 'dos'],
        }),
        expect.anything()
      );
    });
  });

  test('submits with unchecked radio values', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Form
        initialValues={{
          hello: ['uno', 'dos'],
        }}
        // eslint-disable-next-line no-undef
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          hello: yup.array(),
        })}
      >
        <CheckboxGroup name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" />
          <Checkbox label="Check Two" value="dos" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Check One'));
    await fireEvent.click(getByText('Check Two'));

    await fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          hello: [],
        }),
        expect.anything()
      );
    });
  });

  test('calls on change callback', async () => {
    const onChange = jest.fn();

    const { getByText } = render(
      <Form
        initialValues={{
          hello: [],
        }}
        validationSchema={yup.object().shape({
          hello: yup.array(),
        })}
      >
        <CheckboxGroup onChange={onChange} name="hello" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" />
          <Checkbox label="Check Two" value="dos" />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Check One'));

    await waitFor(() => {
      expect(onChange.mock.calls[0][0][0]).toBe('uno');
    });
  });
});
