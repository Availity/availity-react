import React from 'react';
import { Meta } from '@storybook/react-vite';
import { Button } from 'reactstrap';

import {
  AvProviderSelect,
  AvOrganizationSelect,
  AvRegionSelect,
  AvPermissionSelect,
  AvNavigationSelect,
  AvUserSelect,
  AvCodeSelect,
} from '../resources';
// import README from '../README.md';

// eslint-disable-next-line import/no-relative-packages
import AvFormResults from '../../../story-utils/AvFormResults';

export default {
  title: 'Deprecated/AvSelect/resources',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    disabled: false,
    errorMessage: 'This field is invalid',
    isMulti: false,
    label: 'Select',
    max: 3,
    min: 2,
    required: true,
    requiredErrorMessage: 'This field is required',
  },
} as Meta;

export const _AvCodeSelect = {
  render: ({ disabled, errorMessage, isMulti, label, max, min, required, requiredErrorMessage }) => (
    <AvFormResults>
      <AvCodeSelect
        name="AvCodeSelect"
        label={label}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={errorMessage}
        parameters={{
          list: 'ALLCPTCODES',
        }}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
        isDisabled={disabled}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    label: 'Select a Code',
  },
  name: 'AvCodeSelect',
};

export const _AvNavigationSelect = {
  render: ({ disabled, errorMessage, isMulti, label, max, min, required, requiredErrorMessage }) => (
    <AvFormResults>
      <AvNavigationSelect
        name="AvNavigationSelect"
        label={label}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={errorMessage}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
        isDisabled={disabled}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    label: 'Select a Payer Space',
  },
  name: 'AvNavigationSelect',
};

export const _AvOrganizationSelect = {
  render: ({ disabled, errorMessage, isMulti, label, max, min, required, requiredErrorMessage }) => (
    <AvFormResults>
      <AvOrganizationSelect
        name="AvOrganizationSelect"
        label={label}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={errorMessage}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
        isDisabled={disabled}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    label: 'Select an Organization',
  },
  name: 'AvOrganizationSelect',
};

export const _AvPermissionSelect = {
  render: ({ disabled, errorMessage, isMulti, label, max, min, required, requiredErrorMessage }) => (
    <AvFormResults>
      <AvPermissionSelect
        name="AvPermissionSelect"
        label={label}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={errorMessage}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
        isDisabled={disabled}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    label: 'Select a Permission',
  },
  name: 'AvPermissionSelect',
};

export const _AvProviderSelect = {
  render: ({ customerId, disabled, errorMessage, isMulti, label, max, min, required, requiredErrorMessage }) => (
    <AvFormResults>
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
        errorMessage={errorMessage}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
        isDisabled={disabled}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    customerId: '1234',
    label: 'Select a Provider',
  },
  name: 'AvProviderSelect',
};

export const _AvRegionSelect = {
  render: ({ disabled, errorMessage, isMulti, label, max, min, required, requiredErrorMessage }) => (
    <AvFormResults>
      <AvRegionSelect
        name="AvRegionSelect"
        label={label}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={errorMessage}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
        isDisabled={disabled}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    label: 'Select a Region',
  },
  name: 'AvRegionSelect',
};

export const _AvUserSelect = {
  render: ({ disabled, errorMessage, isMulti, label, max, min, required, requiredErrorMessage }) => (
    <AvFormResults>
      <AvUserSelect
        name="AvUserSelect"
        label={label}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={errorMessage}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
        isDisabled={disabled}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    label: 'Select a User',
  },
  name: 'AvUserSelect',
};
