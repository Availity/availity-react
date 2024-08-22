/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';
import { Phone } from '..';

import './validatePhone';
// import README from '../README.md';

// eslint-disable-next-line import/no-relative-packages
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
};
type PhoneStoryProps = {
  country: string;
  required: boolean;
  strict: boolean;
  showExtension: boolean;
  enablePhoneColProps: boolean;
  phoneColProps: object;
  enableExtColProps: boolean;
  extColProps: object;
};
export const Default: StoryObj<PhoneStoryProps> = {
  render: ({
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
  ),
  args: {
    country: 'US',
    required: false,
    strict: false,
    showExtension: false,
    enablePhoneColProps: false,
    phoneColProps: { xs: { size: 9 } },
    enableExtColProps: false,
    extColProps: { xs: { size: 3 } },
  },
};
