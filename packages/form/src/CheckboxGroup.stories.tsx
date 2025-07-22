/* eslint-disable unicorn/no-thenable */
/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/date/styles.scss';

import { Checkbox, CheckboxGroup } from '.';
// import README from '../form/README.md';

// eslint-disable-next-line import/no-relative-packages
import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Bootstrap Components/Form/CheckboxGroup',
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

export const _CheckboxGroup: StoryObj<typeof CheckboxGroup> = {
  render: ({ required, helpId, labelClassName }) => (
    <FormResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        checkboxGroup: [],
      }}
      validationSchema={yup.object().shape({
        checkboxGroup: yup.array().when([], {
          is: () => required,
          then: yup.array().required('At least one checkbox is required'),
          otherwise: yup.array().notRequired(),
        }),
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
