/* eslint-disable unicorn/no-thenable */
/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/date/styles.scss';

import { Input } from '.';
// import README from '../form/README.md';

// eslint-disable-next-line import/no-relative-packages
import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Form Components/Form/Input',
  component: Input,
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

export const _Input: StoryObj<typeof Input> = {
  render: ({ required }) => (
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
          then: yup.string().required('This field is required'),
          otherwise: yup.string().notRequired(),
        }),
      })}
    >
      <div className="d-flex">
        <Input name="hello" type="text" label="Hello" />
        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </FormResults>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Input field that utilizes the Form validation.',
      },
    },
  },
};
