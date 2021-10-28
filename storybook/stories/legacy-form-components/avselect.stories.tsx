import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Label, Button } from 'reactstrap';
import AvApi from '@availity/api-axios';
import { AvGroup, AvFeedback, AvField } from 'availity-reactstrap-validation';
import AvSelect, { AvSelectField } from '@availity/reactstrap-validation-select';
import AvSelectResource from '@availity/reactstrap-validation-select/resources';
// import README from '@availity/reactstrap-validation-select/README.md';

import '@availity/mock';
import AvFormResults from '../util/AvFormResults';

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

const autofillOptions = [
  {
    label: 'Option 1',
    value: {
      autoFill1: 'option 1 autofill value 1',
      autoFill2: 'option 1 autofill value 2',
    },
  },
  {
    label: 'Option 2',
    value: {
      autoFill1: 'option 2 autofill value 1',
      autoFill2: 'option 2 autofill value 2',
    },
  },
  {
    label: 'Option 3',
    value: {
      autoFill1: 'option 3 autofill value 1',
      autoFill2: 'option 3 autofill value 2',
    },
  },
  {
    label: 'Option 4',
    value: {
      autoFill1: 'option 4 autofill value 1',
      autoFill2: 'option 4 autofill value 2',
    },
  },
];

const avCustomResource = new AvApi({ name: 'my-custom-resource' });

export default {
  title: 'Legacy Form Components/AvSelect',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ autofill, creatable, disabled, isMulti, max, min, raw, required }) => (
  <AvFormResults>
    <AvSelect
      name="standAlone"
      minLength={min}
      maxLength={max}
      isMulti={isMulti}
      options={autofill ? autofillOptions : options}
      aria-label="stand-alone"
      required={required}
      raw={raw}
      isDisabled={disabled}
      creatable={creatable}
      autofill={autofill}
    />
    {autofill && <AvField name="autoFill1" type="text" label="Autofill Value 1" />}
    {autofill && <AvField name="autoFill2" type="text" label="Autofill Value 2" />}
    <Button className="mt-3" color="primary">
      Submit
    </Button>
  </AvFormResults>
);
Default.args = {
  autofill: false,
  creatable: false,
  disabled: false,
  isMulti: false,
  min: 2,
  max: 3,
  raw: false,
  required: true,
};
Default.storyName = 'default';

export const WithLabel: Story = ({
  autofill,
  creatable,
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  raw,
  required,
}) => (
  <AvFormResults>
    <AvGroup>
      <Label for="standAloneWithLabel">{label}</Label>
      <AvSelect
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        options={autofill ? autofillOptions : options}
        name="standAloneWithLabel"
        inputProps={{ 'aria-label': 'stand-alone with Label' }}
        required={required}
        raw={raw}
        autofill={autofill}
        isDisabled={disabled}
        creatable={creatable}
      />
      {autofill && <AvField name="autoFill1" type="text" label="Autofill Value 1" />}
      {autofill && <AvField name="autoFill2" type="text" label="Autofill Value 2" />}
      <AvFeedback>{errorMessage}</AvFeedback>
    </AvGroup>
    <Button color="primary">Submit</Button>
  </AvFormResults>
);
WithLabel.args = {
  autofill: false,
  creatable: false,
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'AvSelect Label',
  min: 2,
  max: 3,
  raw: false,
  required: true,
};
WithLabel.storyName = 'with label';

export const _AvSelectField: Story = ({
  autofill,
  creatable,
  disabled,
  errorMessage,
  isMulti,
  label,
  max,
  min,
  raw,
  required,
  requiredErrorMessage,
}) => (
  <AvFormResults>
    <AvSelectField
      name="AvSelectField"
      label={label}
      minLength={min}
      maxLength={max}
      isMulti={isMulti}
      options={autofill ? autofillOptions : options}
      required={required}
      errorMessage={errorMessage}
      validate={{
        required: {
          value: required,
          errorMessage: required && requiredErrorMessage,
        },
      }}
      raw={raw}
      isDisabled={disabled}
      creatable={creatable}
      autofill={autofill}
    />
    {autofill && <AvField name="autoFill1" type="text" label="Autofill Value 1" />}
    {autofill && <AvField name="autoFill2" type="text" label="Autofill Value 2" />}
    <Button color="primary">Submit</Button>
  </AvFormResults>
);
_AvSelectField.args = {
  autofill: false,
  creatable: false,
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Select',
  max: 3,
  min: 2,
  raw: false,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvSelectField.storyName = 'AvSelectField';

export const _AvSelectResource: Story = ({
  creatable,
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
    <AvSelectResource
      label={
        <>
          {label}
          {required ? <span className="text-danger">*</span> : null}
        </>
      }
      name="AvSelectResource"
      minLength={min}
      maxLength={max}
      isMulti={isMulti}
      required={required}
      resource={avCustomResource}
      labelKey="name"
      creatable={creatable}
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
_AvSelectResource.args = {
  autofill: false,
  creatable: false,
  disabled: false,
  errorMessage: 'This field is invalid',
  isMulti: false,
  label: 'Custom Select',
  min: 2,
  max: 3,
  raw: false,
  required: true,
  requiredErrorMessage: 'This field is required',
};
_AvSelectResource.storyName = 'AvSelectResource';
