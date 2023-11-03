/* eslint-disable no-console */
import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/date/styles.scss';

import { RadioGroup, Radio } from '.';
// import README from '../form/README.md';

import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Form Components/Form/RadioGroup',
  component: FormResults,
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

export const _RadioGroup: StoryObj<typeof RadioGroup> = {
  render: ({ required, helpId, labelClassName }) => (
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
      <RadioGroup name="hello" label="Radio Group" helpId={helpId} required={required} labelClassName={labelClassName}>
        <Radio name="hello" label="Radio One" value="uno" />
        <Radio name="hello" label="Radio Two" value="dos" helpId="radioTwoHelp" />
        <Radio name="hello" label="Radio Three" value="tres" />
      </RadioGroup>
      <Button className="ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormResults>
  ),
  args: {
    helpId: '',
    labelClassName: 'label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inputs of type radio. Radios should be wrapped in a RadioGroup.',
      },
    },
  },
};
