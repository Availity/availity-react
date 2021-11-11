/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import AvApi from '@availity/api-axios';
import * as yup from 'yup';
import '@availity/yup';
import Select, { SelectField, ResourceSelect } from '@availity/select';
import { Feedback, FormGroup, Field, Label } from '@availity/form';
// import README from '@availity/select/README.md';

import '@availity/mock';
import FormikResults from '../util/FormikResults';

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
const singleValueSchema = (name: string, required: boolean) =>
  yup.object().shape({
    [name]: yup.string().isRequired(required, 'This field is required.').nullable(),
  });

const multiValueSchema = (name: string, required: boolean, min: number, max: number) =>
  yup.object().shape({
    [name]: yup
      .array()
      .of(yup.string())
      .min(min, `Must select at least ${min} option${min !== 1 && 's'}.`)
      .max(max, `Cannot select more than ${max} option${max !== 1 && 's'}.`)
      .isRequired(required, 'This field is required.'),
  });
const avCustomResource = new AvApi({ name: 'my-custom-resource' });
const avGraphqlResource = new AvApi({ name: 'my-graphql-resource' });

export default {
  title: 'Form Components/Select',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    creatable: false,
    disabled: false,
    isMulti: false,
    min: 2,
    max: 3,
    raw: false,
    required: true,
  },
} as Meta;

export const Default: Story = ({ autofill, creatable, disabled, isMulti, max, min, raw, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      standAlone: undefined,
      autoFill1: '',
      autoFill2: '',
    }}
    validationSchema={
      isMulti ? multiValueSchema('standAlone', required, min, max) : singleValueSchema('standAlone', required)
    }
  >
    <Select
      name="standAlone"
      autofill={autofill}
      isMulti={isMulti}
      creatable={creatable}
      options={autofill ? autofillOptions : options}
      minLength={min}
      maxLength={max}
      aria-label="stand-alone"
      raw={raw}
      isDisabled={disabled}
    />
    {autofill && <Field name="autoFill1" type="text" label="Autofill Value 1" />}
    {autofill && <Field name="autoFill2" type="text" label="Autofill Value 2" />}
    <Button className="mt-3" color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
Default.args = {
  autofill: false,
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
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      standAloneWithLabel: null,
      autoFill1: '',
      autoFill2: '',
    }}
    validationSchema={
      isMulti
        ? multiValueSchema('standAloneWithLabel', required, min, max)
        : singleValueSchema('standAloneWithLabel', required)
    }
  >
    <FormGroup for="standAloneWithLabel">
      <Label for="standAloneWithLabel" required={required} >{label}</Label>
      <Select
        name="standAloneWithLabel"
        autofill={autofill}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        options={autofill ? autofillOptions : options}
        creatable={creatable}
        inputProps={{ 'aria-label': 'stand-alone with Label' }}
        required={required}
        raw={raw}
        isDisabled={disabled}
      />
      <Feedback name="standAloneWithLabel">{errorMessage}</Feedback>
    </FormGroup>
    {autofill && <Field name="autoFill1" type="text" label="Autofill Value 1" />}
    {autofill && <Field name="autoFill2" type="text" label="Autofill Value 2" />}
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
WithLabel.args = {
  autofill: false,
  errorMessage: 'This field is invalid',
  label: 'Select Label',
};
WithLabel.storyName = 'with label';

export const _SelectField: Story = ({
  autofill,
  creatable,
  disabled,
  helpId,
  isMulti,
  label,
  max,
  min,
  raw,
  required,
}) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      SelectField: undefined,
      autoFill1: '',
      autoFill2: '',
    }}
    validationSchema={
      isMulti ? multiValueSchema('SelectField', required, min, max) : singleValueSchema('SelectField', required)
    }
  >
    <SelectField
      name="SelectField"
      autofill={autofill}
      label={label}
      minLength={min}
      maxLength={max}
      creatable={creatable}
      isMulti={isMulti}
      options={autofill ? autofillOptions : options}
      required={required}
      raw={raw}
      isDisabled={disabled}
      helpId={helpId}
    />
    {autofill && <Field name="autoFill1" type="text" label="Autofill Value 1" />}
    {autofill && <Field name="autoFill2" type="text" label="Autofill Value 2" />}
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
_SelectField.args = {
  autofill: false,
  helpId: '',
  label: 'Select Label',
};
_SelectField.storyName = 'SelectField';

export const _ResourceSelect: Story = ({ creatable, disabled, isMulti, label, max, min, raw, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      ResourceSelect: null,
    }}
    validationSchema={
      isMulti ? multiValueSchema('SelectField', required, min, max) : singleValueSchema('SelectField', required)
    }
  >
    <ResourceSelect
      label={label}
      name="ResourceSelect"
      labelKey="name"
      maxLength={max}
      isMulti={isMulti}
      raw={raw}
      required={required}
      creatable={creatable}
      isDisabled={disabled}
      resource={avCustomResource}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
_ResourceSelect.args = {
  label: 'Select Label',
};
_ResourceSelect.storyName = 'ResourceSelect';

export const GraphQlResourceSelect: Story = ({ creatable, disabled, isMulti, label, max, min, raw, required }) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      ResourceSelect: null,
    }}
    validationSchema={
      isMulti ? multiValueSchema('SelectField', required, min, max) : singleValueSchema('SelectField', required)
    }
  >
    <ResourceSelect
      label={label}
      name="ResourceSelect"
      labelKey="value"
      valueKey="id"
      maxLength={max}
      raw={raw}
      isMulti={isMulti}
      required={required}
      resource={avGraphqlResource}
      creatable={creatable}
      isDisabled={disabled}
      graphqlConfig={{
        type: 'region',
        query: `
   {
  regionPagination{
    count
    pageInfo{
      hasNextPage
    }
    items{
      id
      value
    }
  }
}
`,
      }}
      getResult={(data) => data.regionPagination.items}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
GraphQlResourceSelect.args = {
  label: 'Select Label',
};
GraphQlResourceSelect.storyName = 'GraphQL ResourceSelect';
