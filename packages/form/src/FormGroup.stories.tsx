/* eslint-disable unicorn/no-thenable */
/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/date/styles.scss';

import { Input, FormGroup } from '.';
// import README from '../form/README.md';

// eslint-disable-next-line import/no-relative-packages
import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Bootstrap Components/Form/FormGroup',
  component: FormGroup,
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

export const _FormGroup: StoryObj<typeof FormGroup> = {
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
          then: yup.string().required('This field is required.'),
          otherwise: yup.string().notRequired(),
        }),
      })}
    >
      <FormGroup for="hello" data-testid="hello-group">
        <Input name="hello" data-testid="hello-input" />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </FormResults>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wrapper for an Input field. Uses reactstrap FormGroup.',
      },
    },
  },
};
