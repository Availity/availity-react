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
} from '@availity/reactstrap-validation-select/resources';
// import README from '@availity/reactstrap-validation-select/README.md';

import '@availity/mock';
import AvFormResults from '../util/AvFormResults';

export default {
  title: 'Legacy Form Components/AvSelect/resources',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

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
  disabled: false,
  errorMEssage: 'This field is invalid',
  isMulti: false,
  label: 'Select a Provider',
  max: 3,
  min: 2,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvProviderSelect.storyName = 'AvProviderSelect';

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
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select an Organization',
  max: 3,
  min: 2,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvOrganizationSelect.storyName = 'AvOrganizationSelect';

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
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select a Region',
  max: 3,
  min: 2,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvRegionSelect.storyName = 'AvRegionSelect';

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
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select a Permission',
  max: 3,
  min: 2,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvPermissionSelect.storyName = 'AvPermissionSelect';

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
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select a Payer Space',
  max: 3,
  min: 2,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvNavigationSelect.storyName = 'AvNavigationSelect';

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
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select a User',
  max: 3,
  min: 2,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvUserSelect.storyName = 'AvUserSelect';

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
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select a Code',
  max: 3,
  min: 2,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvCodeSelect.storyName = 'AvCodeSelect';
