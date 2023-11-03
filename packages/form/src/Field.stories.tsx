/* eslint-disable no-console */
import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/date/styles.scss';

import { Field } from '.';
// import README from '../form/README.md';

import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Form Components/Form/Field',
  component: Field,
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

export const _Field: StoryObj<typeof Field> = {
  render: ({ required, helpMessage, helpId }) => (
    <FormResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        hello: '',
      }}
      validationSchema={yup.object().shape({
        hello: yup.string().when([], {
          is: () => required,
          then: yup.string().required('This field is required.'),
          otherwise: yup.string().notRequired(),
        }),
      })}
    >
      <Field name="hello" type="text" label="Hello" helpMessage={helpMessage} helpId={helpId} required={required} />
      <Button className="ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormResults>
  ),
  args: {
    helpMessage: '',
    helpId: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field wrapped in additional features such as label, feedback, grid options, etc.',
      },
    },
  },
};
