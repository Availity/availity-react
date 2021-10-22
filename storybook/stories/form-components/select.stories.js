import React from 'react';
import { Label, Button } from 'reactstrap';
import { number, text, boolean } from '@storybook/addon-knobs';
import AvApi from '@availity/api-axios';
import '@availity/yup';
import * as yup from 'yup';

import Select, { SelectField, ResourceSelect } from '@availity/select';
import { Feedback, FormGroup, Field } from '@availity/form';
import README from '@availity/select/README.md';
import '@availity/mock';

import FormikResults from '../mocks/FormikResults';
import { Preview } from '../util';

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

const singleValueSchema = (name, required) =>
  yup.object().shape({
    [name]: yup.string().isRequired(required, 'This field is required.').nullable(),
  });

const multiValueSchema = (name, required, min, max) =>
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
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const required = boolean('Required', false);
  const autofill = boolean('Autofill', false);
  return (
    <FormikResults
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
        autofill={autofill}
        isMulti={isMulti}
        creatable={boolean('Creatable', false)}
        options={autofill ? autofillOptions : options}
        minLength={min}
        maxLength={max}
        name="standAlone"
        aria-label="stand-alone"
        raw={boolean('Raw value', false)}
        isDisabled={boolean('Disabled', false)}
      />
      {autofill && <Field name="autoFill1" type="text" label="Autofill Value 1" />}

      {autofill && <Field name="autoFill2" type="text" label="Autofill Value 2" />}
      <Button className="mt-3" color="primary">
        Submit
      </Button>
    </FormikResults>
  );
};

Default.story = {
  name: 'default',
};

export const WithLabel = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const required = boolean('Required', false);
  const autofill = boolean('Autofill', false);

  return (
    <FormikResults
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
        <Label for="standAloneWithLabel">{text('Label', 'Select Label')}</Label>
        <Select
          autofill={autofill}
          minLength={min}
          maxLength={max}
          isMulti={isMulti}
          options={autofill ? autofillOptions : options}
          creatable={boolean('Creatable', false)}
          name="standAloneWithLabel"
          inputProps={{ 'aria-label': 'stand-alone with Label' }}
          required={required}
          raw={boolean('Raw value', false)}
          isDisabled={boolean('Disabled', false)}
        />
        <Feedback name="standAloneWithLabel">{text('Error Message', 'This field is invalid')}</Feedback>
      </FormGroup>

      {autofill && <Field name="autoFill1" type="text" label="Autofill Value 1" />}

      {autofill && <Field name="autoFill2" type="text" label="Autofill Value 2" />}
      <Button color="primary">Submit</Button>
    </FormikResults>
  );
};

WithLabel.story = {
  name: 'with label',
};

export const _SelectField = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const required = boolean('Required', false);
  const autofill = boolean('Autofill', false);
  const helpId = text('Field Help ID', '');

  return (
    <FormikResults
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
        autofill={autofill}
        label={text('Label', 'Field Label')}
        name="SelectField"
        minLength={min}
        maxLength={max}
        creatable={boolean('Creatable', false)}
        isMulti={isMulti}
        options={autofill ? autofillOptions : options}
        required={required}
        raw={boolean('Raw value', false)}
        isDisabled={boolean('Disabled', false)}
        helpId={helpId}
      />
      {autofill && <Field name="autoFill1" type="text" label="Autofill Value 1" />}

      {autofill && <Field name="autoFill2" type="text" label="Autofill Value 2" />}
      <Button color="primary">Submit</Button>
    </FormikResults>
  );
};

_SelectField.story = {
  name: 'SelectField',
};

export const _ResourceSelect = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const required = boolean('Required', false);

  return (
    <FormikResults
      initialValues={{
        ResourceSelect: null,
      }}
      validationSchema={
        isMulti ? multiValueSchema('SelectField', required, min, max) : singleValueSchema('SelectField', required)
      }
    >
      <ResourceSelect
        label={
          <>
            {text('Label', 'Custom Select')}
            <span className="text-primary">*</span>
          </>
        }
        name="ResourceSelect"
        labelKey="name"
        maxLength={max}
        isMulti={isMulti}
        required={required}
        creatable={boolean('Creatable', false)}
        isDisabled={boolean('Disabled', false)}
        resource={avCustomResource}
      />
      <Button color="primary">Submit</Button>
    </FormikResults>
  );
};

_ResourceSelect.story = {
  name: 'ResourceSelect',
};

export const GraphQlResourceSelect = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const required = boolean('Required', false);
  return (
    <FormikResults
      initialValues={{
        ResourceSelect: null,
      }}
      validationSchema={
        isMulti ? multiValueSchema('SelectField', required, min, max) : singleValueSchema('SelectField', required)
      }
    >
      <ResourceSelect
        label={
          <>
            {text('Label', 'Custom Select')}
            <span className="text-primary">*</span>
          </>
        }
        name="ResourceSelect"
        labelKey="value"
        valueKey="id"
        maxLength={max}
        isMulti={isMulti}
        required={required}
        resource={avGraphqlResource}
        creatable={boolean('Creatable', false)}
        isDisabled={boolean('Disabled', false)}
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
      <Button color="primary">Submit</Button>
    </FormikResults>
  );
};

GraphQlResourceSelect.story = {
  name: 'GraphQL ResourceSelect',
};
