import React from 'react';
import { render, wait, fireEvent, cleanup } from '@testing-library/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Form, Radio, RadioGroup } from '..';

afterEach(cleanup);

describe('Radio', () => {
  test('submits with initial value', async () => {
    const onSubmit = jest.fn();

    const { container, getByText } = render(
      <Form
        initialValues={{
          greeting: 'hello',
        }}
        validationSchema={yup.object().shape({
          greeting: yup.string().required('This field is required'),
        })}
        onSubmit={onSubmit}
      >
        <RadioGroup name="greeting" label="Radio Group">
          <Radio label="Hello" value="hello" data-testid="greeting-radio-1" />
          <Radio
            label="Goodbye"
            value="goodbye"
            data-testid="greeting-radio-2"
          />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(3);

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          greeting: 'hello',
        }),
        expect.anything()
      );
    });
  });

  test('submits with selected value', async () => {
    const onSubmit = jest.fn();

    const { container, getByText, getByTestId } = render(
      <Form
        initialValues={{
          greeting: 'hello',
        }}
        validationSchema={yup.object().shape({
          greeting: yup.string().required('This field is required'),
        })}
        onSubmit={onSubmit}
      >
        <RadioGroup name="greeting" label="Radio Group">
          <Radio label="Hello" value="hello" data-testid="greeting-radio-1" />
          <Radio
            label="Goodbye"
            value="goodbye"
            data-testid="greeting-radio-2"
          />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(container.querySelectorAll('.is-untouched')).toHaveLength(3);

    // Simulate user selecting the goodbye option
    fireEvent.click(getByTestId('greeting-radio-2'));

    fireEvent.click(getByText('Submit'));

    await wait(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          greeting: 'goodbye',
        }),
        expect.anything()
      );
    });
  });

  test('renders danger className when invalid form', async () => {
    const { getByText, getByTestId } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.string().required('This field is required'),
        })}
        onSubmit={() => {}}
      >
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" data-testid="hello-radio" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await fireEvent.click(getByText('Submit'));

    await wait(() => {
      const radio = getByTestId('hello-radio');

      expect(radio.className).toContain('is-touched');
      expect(radio.className).toContain('is-invalid');
    });
  });

  test('renders with label', async () => {
    const { getByText } = render(
      <Form
        initialValues={{
          hello: '',
        }}
        onSubmit={() => {}}
      >
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" />
        </RadioGroup>
      </Form>
    );

    getByText('Radio One');
  });

  test('should generate uuid even when id is not added', () => {
    const { container } = render(
      <Form onSubmit={() => {}}>
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" />
        </RadioGroup>
      </Form>
    );

    expect(container.querySelector('input').hasAttribute('id')).toBeTruthy();
  });

  test('should use id when passed in', () => {
    const { container } = render(
      <Form onSubmit={() => {}}>
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" id="test" />
        </RadioGroup>
      </Form>
    );

    expect(container.querySelector('input').getAttribute('id')).toEqual('test');
  });
});
