import React from 'react';
import { storiesOf } from '@storybook/react';
import { Label, Button } from 'reactstrap';
import { number, text, boolean } from '@storybook/addon-knobs';
import AvApi from '@availity/api-axios';
import '@availity/yup';
import Select, { SelectField, ResourceSelect } from '@availity/select';

import {
  AvProviderSelect,
  AvOrganizationSelect,
  AvPatientSelect,
} from '@availity/select/resources';

import { Feedback, FormGroup, Field } from '@availity/form';
import * as yup from 'yup';
import README from '@availity/select/README.md';

import './mocks/providers';
import './mocks/organizations';
import './mocks/regions';

import FormikResults from './mocks/FormikResults';

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
    [name]: yup.string().isRequired(required, 'This field is required.'),
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

// eslint-disable-next-line no-undef
storiesOf('Formik|Select', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('default', () => {
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
          isMulti
            ? multiValueSchema('standAlone', required, min, max)
            : singleValueSchema('standAlone', required)
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
        {autofill && (
          <Field name="autoFill1" type="text" label="Autofill Value 1" />
        )}

        {autofill && (
          <Field name="autoFill2" type="text" label="Autofill Value 2" />
        )}
        <Button className="mt-3" color="primary">
          Submit
        </Button>
      </FormikResults>
    );
  })
  .add('with label', () => {
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
          <Label for="standAloneWithLabel">
            {text('Label', 'Select Label')}
          </Label>
          <Select
            autofill={autofill}
            minLength={min}
            maxLength={max}
            isMulti={isMulti}
            options={autofill ? autofillOptions : options}
            creatable={boolean('Creatable', false)}
            name="standAloneWithLabel"
            inputProps={{ 'aria-label': 'stand-alone with Label' }}
            required={boolean('Required', false)}
            raw={boolean('Raw value', false)}
            isDisabled={boolean('Disabled', false)}
          />
          <Feedback>{text('Error Message', 'This field is invalid')}</Feedback>
        </FormGroup>

        {autofill && (
          <Field name="autoFill1" type="text" label="Autofill Value 1" />
        )}

        {autofill && (
          <Field name="autoFill2" type="text" label="Autofill Value 2" />
        )}
        <Button color="primary">Submit</Button>
      </FormikResults>
    );
  })
  .add('SelectField', () => {
    const isMulti = boolean('Multiple', false);
    const min = (isMulti && number('Min Selection', 2)) || undefined;
    const max = (isMulti && number('Max Selection', 3)) || undefined;
    const required = boolean('Required', false);
    const autofill = boolean('Autofill', false);

    return (
      <FormikResults
        initialValues={{
          SelectField: undefined,
          autoFill1: '',
          autoFill2: '',
        }}
        validationSchema={
          isMulti
            ? multiValueSchema('SelectField', required, min, max)
            : singleValueSchema('SelectField', required)
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
        />
        {autofill && (
          <Field name="autoFill1" type="text" label="Autofill Value 1" />
        )}

        {autofill && (
          <Field name="autoFill2" type="text" label="Autofill Value 2" />
        )}
        <Button color="primary">Submit</Button>
      </FormikResults>
    );
  })
  .add('ResourceSelect', () => {
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
          isMulti
            ? multiValueSchema('SelectField', required, min, max)
            : singleValueSchema('SelectField', required)
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
          resource={avCustomResource}
          creatable={boolean('Creatable', false)}
          isDisabled={boolean('Disabled', false)}
        />
        <Button color="primary">Submit</Button>
      </FormikResults>
    );
  });

// eslint-disable-next-line no-undef
storiesOf('Formik|Select/resources', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('AvProviderSelect', () => {
    const isMulti = boolean('Multiple', false);
    const min = (isMulti && number('Min Selection', 2)) || undefined;
    const max = (isMulti && number('Max Selection', 3)) || undefined;
    const required = boolean('Required', false);
    return (
      <FormikResults
        initialValues={{
          AvProviderSelect: null,
        }}
        validationSchema={singleValueSchema('AvProviderSelect')}
      >
        <AvProviderSelect
          label={text('Label', 'Select Provider')}
          name="AvProviderSelect"
          customerId={text('Customer ID', '1234')}
          requiredParams={['customerId']}
          watchParams={['customerId']}
          minLength={min}
          maxLength={max}
          isMulti={isMulti}
          required={required}
          isDisabled={boolean('Disabled', false)}
        />
        <Button color="primary">Submit</Button>
      </FormikResults>
    );
  })
  .add('AvOrganizationSelect', () => {
    const isMulti = boolean('Multiple', false);
    const min = (isMulti && number('Min Selection', 2)) || undefined;
    const max = (isMulti && number('Max Selection', 3)) || undefined;
    const required = boolean('Required', false);
    return (
      <FormikResults
        initialValues={{
          AvOrganizationSelect: null,
        }}
        validationSchema={singleValueSchema('AvOrganizationSelect')}
      >
        <AvOrganizationSelect
          label={text('Label', 'Select Organization')}
          name="AvOrganizationSelect"
          minLength={min}
          maxLength={max}
          isMulti={isMulti}
          required={required}
          errorMessage={text('Generic Error Message', 'This field is invalid')}
          validate={{
            required: {
              value: required,
              errorMessage:
                required &&
                text('Required Error Message', 'This field is required'),
            },
          }}
          isDisabled={boolean('Disabled', false)}
        />
        <Button color="primary">Submit</Button>
      </FormikResults>
    );
  })
  .add('AvPatientSelect', () => {
    const isMulti = boolean('Multiple', false);
    const min = (isMulti && number('Min Selection', 2)) || undefined;
    const max = (isMulti && number('Max Selection', 3)) || undefined;
    const required = boolean('Required', false);
    const autofill = boolean('Autofill', false);
    return (
      <FormikResults
        initialValues={{
          AvPatientSelect: null,
          firstName: '',
          lastName: '',
        }}
        validationSchema={singleValueSchema('AvPatientSelect')}
      >
        <AvPatientSelect
          autofill={autofill}
          label={text('Label', 'Select Patient')}
          name="AvPatientSelect"
          creatable={boolean('Creatable', false)}
          minLength={min}
          maxLength={max}
          isMulti={isMulti}
          required={required}
          parameters={{ customerId: '1194' }}
          errorMessage={text('Generic Error Message', 'This field is invalid')}
          validate={{
            required: {
              value: required,
              errorMessage:
                required &&
                text('Required Error Message', 'This field is required'),
            },
          }}
          isDisabled={boolean('Disabled', false)}
        />
        {autofill && (
          <Field name="firstName" type="text" label="Patient First Name" />
        )}

        {autofill && (
          <Field name="lastName" type="text" label="Patient Last Name" />
        )}
        <Button type="submit" color="primary">
          Submit
        </Button>
      </FormikResults>
    );
  });
