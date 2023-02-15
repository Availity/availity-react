/* eslint-disable no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { FieldProps } from '@availity/form';
import { Phone } from '..';

import './validatePhone';
// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';

export default {
  title: 'Form Components/Phone',
  parameters: {
    docs: {
      description: {
        component: 'Availity Phone component using Formik and Yup',
      },
    },
  },
} as Meta;

export const Default: Story = ({
  country,
  required,
  strict,
  showExtension,
  enablePhoneColProps,
  phoneColProps,
  enableExtColProps,
  extColProps,
}) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      phone: '',
      ext: '',
    }}
    validationSchema={yup.object().shape({
      phone: yup.string().validatePhone(undefined, strict, country).isRequired(required, 'This field is required.'),
      ext: yup.string().isRequired(required),
    })}
  >
    <Phone
      name="phone"
      label="Phone"
      country={country}
      showExtension={showExtension}
      phoneColProps={enablePhoneColProps ? phoneColProps : undefined}
      extProps={{
        name: 'ext',
        label: 'Ext.',
        extColProps: enableExtColProps ? extColProps : undefined,
      }}
    />
    <Button type="submit" color="primary">
      Submit
    </Button>
  </FormikResults>
);
Default.args = {
  country: 'US',
  required: false,
  strict: false,
  showExtension: false,
  enablePhoneColProps: false,
  phoneColProps: { xs: { size: 9 } },
  enableExtColProps: false,
  extColProps: { xs: { size: 3 } },
};
Default.storyName = 'default';

export const hidden_FieldProps = ({}: FieldProps): JSX.Element => {
  return <></>;
};

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Phone</h5>
    <ArgsTable of={Phone} />

    <h4>Availity Form Props</h4>
    <h5>Field</h5>
    <div>Props passed from Phone to Field component </div>
    <ArgsTable of={hidden_FieldProps} />
  </>
);
