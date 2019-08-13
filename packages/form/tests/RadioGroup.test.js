import React from 'react';
import { render, wait, fireEvent, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Radio, RadioGroup } from '..';

afterEach(cleanup);

describe('RadioGroup', () => {
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

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
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

    await fireEvent.click(getByText('Radio One'));

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          hello: 'uno',
        }),
        expect.anything()
      );
    });
  });
});
