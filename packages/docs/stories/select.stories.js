import React from 'react';
import { storiesOf } from '@storybook/react';
import { Label, Button } from 'reactstrap';
import { number, text, boolean } from '@storybook/addon-knobs';
import AvApi from '@availity/api-axios';

import Select, { SelectField } from '@availity/select';
import SelectResource, {
  AvProviderSelect,
  AvOrganizationSelect,
} from '@availity/select/resources';
import { Feedback, FormGroup } from '@availity/form';
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

const singleValueSchema = name =>
  yup.object().shape({
    [name]: yup.string().required('This field is required.'),
  });

const multiValueSchema = (name, required, min, max) =>
  yup.object().shape({
    [name]: yup
      .array()
      .of(yup.string())
      .min(min, `Must select at least ${min} option${min !== 1 && 's'}.`)
      .max(max, `Cannot select more than ${max} option${max !== 1 && 's'}.`)
      .required('This field is required.'),
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
    const isMulti = boolean('Multiple', true);
    const min = (isMulti && number('Min Selection', 2)) || undefined;
    const max = (isMulti && number('Max Selection', 3)) || undefined;
    const required = boolean('Required', false);
    return (
      <FormikResults
        initialValues={{
          standAlone: undefined,
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
        validationSchema={
          isMulti
            ? multiValueSchema('standAlone', required, min, max)
            : singleValueSchema('standAlone', required)
        }
      >
        <Select
          isMulti={isMulti}
          options={options}
          name="standAlone"
          aria-label="stand-alone"
          raw={boolean('Raw value', false)}
          isDisabled={boolean('Disabled', false)}
        />
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

    return (
      <FormikResults
        initialValues={{
          standAloneWithLabel: null,
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
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
            minLength={min}
            maxLength={max}
            isMulti={isMulti}
            options={options}
            name="standAloneWithLabel"
            inputProps={{ 'aria-label': 'stand-alone with Label' }}
            required={boolean('Required', false)}
            raw={boolean('Raw value', false)}
            isDisabled={boolean('Disabled', false)}
          />
          <Feedback>{text('Error Message', 'This field is invalid')}</Feedback>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </FormikResults>
    );
  })
  .add('SelectField', () => {
    const isMulti = boolean('Multiple', false);
    const min = (isMulti && number('Min Selection', 2)) || undefined;
    const max = (isMulti && number('Max Selection', 3)) || undefined;
    const required = boolean('Required', false);

    return (
      <FormikResults
        initialValues={{
          SelectField: undefined,
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
        validationSchema={
          isMulti
            ? multiValueSchema('SelectField', required, min, max)
            : singleValueSchema('SelectField', required)
        }
      >
        <SelectField
          label={text('Label', 'Field Label')}
          name="SelectField"
          maxLength={max}
          isMulti={isMulti}
          options={options}
          required={required}
          raw={boolean('Raw value', false)}
          isDisabled={boolean('Disabled', false)}
        />
        <Button color="primary">Submit</Button>
      </FormikResults>
    );
  })
  .add('SelectResource', () => {
    const isMulti = boolean('Multiple', false);
    const min = (isMulti && number('Min Selection', 2)) || undefined;
    const max = (isMulti && number('Max Selection', 3)) || undefined;
    const required = boolean('Required', false);
    return (
      <FormikResults
        initialValues={{
          SelectResource: null,
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
        validationSchema={
          isMulti
            ? multiValueSchema('SelectField', required, min, max)
            : singleValueSchema('SelectField', required)
        }
      >
        <SelectResource
          label={
            <>
              {text('Label', 'Custom Select')}
              <span className="text-primary">*</span>
            </>
          }
          name="SelectResource"
          maxLength={max}
          isMulti={isMulti}
          required={required}
          resource={avCustomResource}
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
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
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
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
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
  });
