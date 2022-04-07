import React from 'react';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Radio, RadioGroup } from '..';

afterEach(cleanup);

describe('RadioGroup', () => {
  test('renders with group class name', async () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" label="Radio Group" groupClassName="some-group">
          <Radio label="Radio One" value="uno" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    const formControl = getByTestId('radio-items-hello');
    expect(formControl.className).toContain('some-group');
  });

  test('renders danger className when invalid form', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" />
          <Radio label="Radio Two" value="dos" />
          <Radio label="Radio Three" value="tres" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      const radioGroup = getByTestId('radio-items-hello');

      expect(radioGroup.className).toContain('is-touched');
      expect(radioGroup.className).toContain('is-invalid');
    });
  });

  test('submits with proper radio value', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        // eslint-disable-next-line no-undef
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" />
          <Radio label="Radio Two" value="dos" />
          <Radio label="Radio Three" value="tres" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Radio One'));

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          hello: 'uno',
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
          hello: '',
        }}
        // eslint-disable-next-line no-undef
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" onChange={onChange} label="Radio Group">
          <Radio label="Radio One" value="uno" />
          <Radio label="Radio Two" value="dos" />
          <Radio label="Radio Three" value="tres" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    fireEvent.click(getByText('Radio One'));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('uno');
    });
  });

  test('can render radio inline', async () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" label="Radio Group" inline>
          <Radio label="Radio One" value="uno" />
        </RadioGroup>
      </Form>
    );

    const radioGroup = getByTestId('radio-items-hello');
    const formGroup = radioGroup.children[0];
    expect(formGroup.className).toContain('form-check-inline');
  });

  test('renders field help icon', async () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" label="Radio Group" helpId="helloHelpTopic">
          <Radio label="Radio One" value="uno" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(getByTestId('field-help-icon')).toBeDefined();
  });

  test('renders with required asterisk', () => {
    const { getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
      >
        <RadioGroup name="hello" label="Radio Group" required>
          <Radio label="Radio One" value="uno" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    expect(getByTestId('required-asterisk')).toBeDefined();
  });
});
