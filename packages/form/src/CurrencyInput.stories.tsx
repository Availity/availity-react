/* eslint-disable no-console */
import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/date/styles.scss';

import { CurrencyInput, Form } from '.';
// import README from '../form/README.md';

import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Form Components/Form/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Availity form component that is wired to be hooked up to formik.',
      },
    },
  },
  args: {
    required: false,
  },
};

export const _CurrencyInput: StoryObj<typeof CurrencyInput> = {
  render: ({ value }) => {
    const [newValue, setNewValue] = useState(value);

    return (
      <FormResults
        onSubmit={() => {
          console.log('submitted');
        }}
        initialValues={{
          paidAmount: value,
        }}
        validationSchema={yup.object().shape({
          paidAmount: yup.string().required('This field is required'),
        })}
      >
        <CurrencyInput
          name="paidAmount"
          value={newValue}
          id="paidAmount"
          onValueChanged={(value) => {
            setNewValue(value);
          }}
        />
      </FormResults>
    );
  },
  args: {
    value: '4.93',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field that utilizes the Form validation. Formats and displays the value as a currency ($USD).',
      },
    },
  },
};
