import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';
import { AvProviderSelect, AvOrganizationSelect } from '@availity/select/resources';
// import README from '@availity/select/README.md';

import '@availity/mock';
import FormikResults from '../util/FormikResults';

const singleValueSchema = (name: string, required = false) =>
  yup.object().shape({
    [name]: yup.string().isRequired(required, 'This field is required.').nullable(),
  });

export default {
  title: 'Form Components/Select/resources',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const _AvProviderSelect: Story = ({ customerId, disabled, isMulti, label, max, min, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      AvProviderSelect: null,
    }}
    validationSchema={singleValueSchema('AvProviderSelect', required)}
  >
    <AvProviderSelect
      name="AvProviderSelect"
      label={label}
      customerId={customerId}
      requiredParams={['customerId']}
      watchParams={['customerId']}
      minLength={min}
      maxLength={max}
      isMulti={isMulti}
      required={required}
      isDisabled={disabled}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
_AvProviderSelect.args = {
  customerId: '1234',
  disabled: false,
  isMulti: false,
  label: 'Select a Provider',
  max: 3,
  min: 2,
  required: true,
};
_AvProviderSelect.storyName = 'AvProviderSelect';

export const _AvOrganizationSelect: Story = ({ disabled, errorMessage, isMulti, label, max, min, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      AvOrganizationSelect: null,
    }}
    validationSchema={singleValueSchema('AvOrganizationSelect', required)}
  >
    <AvOrganizationSelect
      name="AvOrganizationSelect"
      label={label}
      minLength={min}
      maxLength={max}
      isMulti={isMulti}
      required={required}
      errorMessage={errorMessage}
      isDisabled={disabled}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
_AvOrganizationSelect.args = {
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select a Provider',
  max: 3,
  min: 2,
  required: true,
};
_AvOrganizationSelect.storyName = 'AvOrganizationSelect';
