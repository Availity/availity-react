/* eslint-disable no-console */
import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/date/styles.scss';

import { Checkbox, CheckboxGroup } from '.';
// import README from '../form/README.md';

import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Form Components/Form/CheckboxGroup',
  component: CheckboxGroup,
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

type FormStoryProps = { required: boolean };

type CheckboxStoryProps = {
  helpId: string;
  labelClassName: string;
} & FormStoryProps;

export const _Default: StoryObj<typeof CheckboxGroup> = {
  render: ({ required, helpId, labelClassName }) => (
    <FormResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        checkboxGroup: [],
      }}
      validationSchema={yup.object().shape({
        checkboxGroup: yup.array().isRequired(required, 'At least one checkbox is required'),
      })}
    >
      <CheckboxGroup
        name="checkboxGroup"
        helpId={helpId}
        label="Checkbox Group"
        required={required}
        labelClassName={labelClassName}
      >
        <Checkbox groupName="checkboxGroup" label="Check One" value="uno" />
        <Checkbox groupName="checkboxGroup" label="Check Two" value="dos" />
        <Checkbox groupName="checkboxGroup" label="Check Three" value="tres" />
        <Checkbox groupName="checkboxGroup" label={<>Check Four</>} value="cuatro" />
      </CheckboxGroup>
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
        story: 'Inputs of type checkbox. Checkboxes should be wrapped in a CheckboxGroup.',
      },
    },
  },
};

type RadioStoryProps = CheckboxStoryProps;
