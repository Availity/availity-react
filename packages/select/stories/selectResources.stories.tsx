/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';

import {
  AvCodeSelect,
  AvNavigationSelect,
  AvOrganizationSelect,
  AvPermissionSelect,
  AvProviderSelect,
  AvRegionSelect,
  AvUserSelect,
} from '../resources';
// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';

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
  args: {
    disabled: false,
    isMulti: false,
    label: 'Select',
    max: 3,
    min: 2,
    required: true,
  },
} as Meta;

export const _AvCodeSelect: Story = ({ disabled, isMulti, label, list, max, min, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      AvCodeSelect: null,
    }}
    validationSchema={singleValueSchema('AvCodeSelect', required)}
  >
    <AvCodeSelect
      name="AvCodeSelect"
      label={label}
      parameters={{ list }}
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
_AvCodeSelect.args = {
  label: 'Select a Code',
  list: 'GENALLPRV03',
};
_AvCodeSelect.storyName = 'AvCodeSelect';

export const _AvNavigationSelect: Story = ({ disabled, isMulti, label, list, max, min, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      AvNavigationSelect: null,
    }}
    validationSchema={singleValueSchema('AvNavigationSelect', required)}
  >
    <AvNavigationSelect
      name="AvNavigationSelect"
      label={label}
      parameters={{ list }}
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
_AvNavigationSelect.args = {
  label: 'Select a Payer Space',
};
_AvNavigationSelect.storyName = 'AvNavigationSelect';

export const _AvOrganizationSelect: Story = ({ disabled, isMulti, label, max, min, required }) => (
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
      isDisabled={disabled}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
_AvOrganizationSelect.args = {
  label: 'Select an Organization',
};
_AvOrganizationSelect.storyName = 'AvOrganizationSelect';

export const _AvPermissionsSelect: Story = ({ disabled, isMulti, label, max, min, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      AvPermissionSelect: null,
    }}
    validationSchema={singleValueSchema('AvPermissionSelect', required)}
  >
    <AvPermissionSelect
      name="AvPermissionSelect"
      label={label}
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
_AvPermissionsSelect.args = {
  label: 'Select a Permission',
};
_AvPermissionsSelect.storyName = 'AvPermissionSelect';

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
  label: 'Select a Provider',
};
_AvProviderSelect.storyName = 'AvProviderSelect';

export const _AvRegionSelect: Story = ({ disabled, isMulti, label, max, min, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      AvRegionSelect: null,
    }}
    validationSchema={singleValueSchema('AvRegionSelect', required)}
  >
    <AvRegionSelect
      name="AvRegionSelect"
      label={label}
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
_AvRegionSelect.args = {
  label: 'Select a Region',
  required: true,
};
_AvRegionSelect.storyName = 'AvRegionSelect';

export const _AvUserSelect: Story = ({ disabled, isMulti, label, max, min, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      AvUserSelect: null,
    }}
    validationSchema={singleValueSchema('AvUserSelect', required)}
  >
    <AvUserSelect
      name="AvUserSelect"
      label={label}
      parameters={{ organizationId: '123' }}
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
_AvUserSelect.args = {
  label: 'Select a User',
};
_AvUserSelect.storyName = 'AvUserSelect';
