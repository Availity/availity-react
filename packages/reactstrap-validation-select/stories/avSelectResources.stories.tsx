import React from 'react';
import { Meta, Story } from '@storybook/react';
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

import AvFormResults from '../../../story-utils/AvFormResults';

export default {
  title: 'Legacy Form Components/AvSelect/resources',
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

export const _AvCodeSelect: Story = ({
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  required,
  requiredErrorMessage,
}) => (
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
);
_AvCodeSelect.args = {
  label: 'Select a Code',
};
_AvCodeSelect.storyName = 'AvCodeSelect';

export const _AvNavigationSelect: Story = ({
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  required,
  requiredErrorMessage,
}) => (
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
);
_AvNavigationSelect.args = {
  label: 'Select a Payer Space',
};
_AvNavigationSelect.storyName = 'AvNavigationSelect';

export const _AvOrganizationSelect: Story = ({
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  required,
  requiredErrorMessage,
}) => (
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
);
_AvOrganizationSelect.args = {
  label: 'Select an Organization',
};
_AvOrganizationSelect.storyName = 'AvOrganizationSelect';

export const _AvPermissionSelect: Story = ({
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  required,
  requiredErrorMessage,
}) => (
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
);
_AvPermissionSelect.args = {
  label: 'Select a Permission',
};
_AvPermissionSelect.storyName = 'AvPermissionSelect';

export const _AvProviderSelect: Story = ({
  customerId,
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  required,
  requiredErrorMessage,
}) => (
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
);
_AvProviderSelect.args = {
  customerId: '1234',
  label: 'Select a Provider',
};
_AvProviderSelect.storyName = 'AvProviderSelect';

export const _AvRegionSelect: Story = ({
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  required,
  requiredErrorMessage,
}) => (
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
);
_AvRegionSelect.args = {
  label: 'Select a Region',
};
_AvRegionSelect.storyName = 'AvRegionSelect';

export const _AvUserSelect: Story = ({
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  required,
  requiredErrorMessage,
}) => (
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
);
_AvUserSelect.args = {
  label: 'Select a User',
};
_AvUserSelect.storyName = 'AvUserSelect';
