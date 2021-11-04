/* eslint-disable no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Phone } from '@availity/phone';
import '@availity/phone/src/validatePhone';
// import README from '@availity/phone/README.md';

import FormikResults from '../util/FormikResults';

export default {
  title: 'Form Components/Phone',
  parameters: {
    docs: {
      // page: README,
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
