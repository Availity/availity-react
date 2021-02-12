import React from 'react';
import * as yup from 'yup';
import '../src/validatePhone';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Form } from '@availity/form';
import { Phone } from '..';

const phoneProps = {
  name: 'test_phone',
  id: 'test_phone',
  title: 'Please enter number in the following format: 201-555-0123',
  label: 'AvPhone',
  // showExtension: true,
  phoneColProps: {
    xs: { size: 9 },
  },
  extProps: {
    name: 'test-ext',
    id: 'test-ext',
    label: 'Ext.',
    extColProps: {
      xs: { size: 3 },
    },
  },
};

const renderPhone = (props, strictValidation = false) => {
  const Component = () => (
    <Form
      initialValues={{
        test_phone: '201',
      }}
      onSubmit={() => {}}
      validationSchema={yup.object().shape({
        test_phone: yup
          .string()
          .validatePhone('This field is invalid', strictValidation),
      })}
    >
      <Phone name="test_phone" {...props} />
    </Form>
  );
  return render(<Component />);
};

describe('Phone', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should render extension field', async () => {
    const { getByText } = renderPhone({
      ...phoneProps,
      showExtension: true,
    });

    await expect(getByText('Ext.')).toBeDefined();
  });

  test('Should format valid phone number', async () => {
    const { getByDisplayValue } = renderPhone(phoneProps);
    const testPhoneInput = getByDisplayValue('201');

    // Set value
    await fireEvent.change(testPhoneInput, {
      target: {
        name: 'test_phone',
        value: '2015550123',
      },
    });

    // Formatter runs onBlur for screen reader friendliness
    await fireEvent.blur(testPhoneInput);

    await expect(getByDisplayValue('(201) 555-0123')).toBeDefined();
  });

  test('Should format partial phone number', async () => {
    const { getByDisplayValue } = renderPhone(phoneProps);
    const testPhoneInput = getByDisplayValue('201');

    await fireEvent.change(testPhoneInput, {
      target: {
        name: 'test_phone',
        value: '20155501',
      },
    });

    await fireEvent.blur(testPhoneInput);

    await expect(getByDisplayValue('(201) 555-01')).toBeDefined();
  });

  test('Should not format invalid phone number', async () => {
    const { getByDisplayValue } = renderPhone(phoneProps);
    const testPhoneInput = getByDisplayValue('201');

    await fireEvent.change(testPhoneInput, {
      target: {
        name: 'test_phone',
        value: '22233344445',
      },
    });

    await fireEvent.blur(testPhoneInput);

    await expect(getByDisplayValue('22233344445')).toBeDefined();
  });

  test('Should render error message with strict validation', async () => {
    const { getByDisplayValue, getByText } = renderPhone(phoneProps, true);
    const testPhoneInput = getByDisplayValue('201');

    await fireEvent.change(testPhoneInput, {
      target: {
        name: 'test_phone',
        value: '2223334444',
      },
    });

    await fireEvent.blur(testPhoneInput);

    await waitFor(() => {
      expect(testPhoneInput.className).toContain('is-touched');
      expect(testPhoneInput.className).toContain('is-invalid');
      expect(getByDisplayValue('(222) 333-4444')).toBeDefined();
      expect(getByText('This field is invalid')).toBeDefined();
    });
  });

  test('Should not render error message with default lax validation', async () => {
    const { getByDisplayValue } = renderPhone(phoneProps);
    const testPhoneInput = getByDisplayValue('201');

    await fireEvent.change(testPhoneInput, {
      target: {
        name: 'test_phone',
        value: '2223334444',
      },
    });

    await fireEvent.blur(testPhoneInput);

    await waitFor(() => {
      expect(testPhoneInput.className).toContain('is-touched');
      expect(testPhoneInput.className).toContain('av-valid');
      expect(getByDisplayValue('(222) 333-4444')).toBeDefined();
    });
  });
});
