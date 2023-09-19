/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';
import { Field } from '@availity/form';

import Select, { SelectField, SelectFieldProps } from '../src';
// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';
import { singleValueSchema, multiValueSchema, options, SelectedOption, autofillOptions } from './utils';

export default {
  title: 'Form Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Select dropdown without a Label or Feedback',
      },
    },
  },
  args: {
    autofill: false,
    creatable: false,
    disabled: false,
    helpMessage: 'This is a message to provide guidance',
    isMulti: false,
    isClearable: false,
    min: 2,
    max: 3,
    raw: false,
    required: true,
    clearButtonText: 'clear',
    clearButtonProps: {},
  },
} as Meta;

export const Default: Story = ({
  autofill,
  creatable,
  disabled,
  helpMessage,
  isMulti,
  isClearable,
  max,
  min,
  raw,
  required,
  clearButtonText,
  clearButtonProps,
}) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      select: undefined,
      autoFill1: '',
      autoFill2: '',
    }}
    validationSchema={
      isMulti
        ? multiValueSchema('select', required, min, max, !autofill && !raw)
        : singleValueSchema('select', required, !autofill && !raw)
    }
  >
    <Row>
      <Col>
        {autofill ? (
          <>
            <Select
              name="select"
              aria-label="stand-alone"
              autofill
              creatable={creatable}
              helpMessage={helpMessage}
              isDisabled={disabled}
              isMulti={isMulti}
              isClearable={isClearable}
              maxLength={max}
              options={autofillOptions}
              raw={raw}
              required={required}
              clearButtonText={clearButtonText}
              clearButtonProps={clearButtonProps}
            />
            <Field name="autoFill1" type="text" label="Autofill Value 1" />
            <Field name="autoFill2" type="text" label="Autofill Value 2" />
          </>
        ) : (
          <Select
            name="select"
            aria-label="stand-alone"
            creatable={creatable}
            helpMessage={helpMessage}
            isDisabled={disabled}
            isMulti={isMulti}
            isClearable={isClearable}
            maxLength={max}
            options={options}
            raw={raw}
            required={required}
            clearButtonText={clearButtonText}
            clearButtonProps={clearButtonProps}
          />
        )}
        <Button className="mt-3" color="primary" type="submit">
          Submit
        </Button>
      </Col>
      <Col md="5">
        <SelectedOption field="select" />
      </Col>
    </Row>
  </FormikResults>
);

export const _SelectField: Story = ({
  autofill,
  creatable,
  disabled,
  helpId,
  helpMessage,
  isMulti,
  isClearable,
  label,
  max,
  min,
  raw,
  required,
  clearButtonText,
  clearButtonProps,
}) => (
  <FormikResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      select: undefined,
      autoFill1: '',
      autoFill2: '',
    }}
    validationSchema={
      isMulti
        ? multiValueSchema('select', required, min, max, !autofill && !raw)
        : singleValueSchema('select', required, !autofill && !raw)
    }
  >
    <Row>
      <Col>
        {autofill ? (
          <>
            <SelectField
              name="select"
              label={label}
              autofill
              creatable={creatable}
              helpId={helpId}
              helpMessage={helpMessage}
              isDisabled={disabled}
              isMulti={isMulti}
              isClearable={isClearable}
              maxLength={max}
              options={autofillOptions}
              raw={raw}
              required={required}
              clearButtonText={clearButtonText}
              clearButtonProps={clearButtonProps}
            />
            <Field name="autoFill1" type="text" label="Autofill Value 1" />
            <Field name="autoFill2" type="text" label="Autofill Value 2" />
          </>
        ) : (
          <SelectField
            name="select"
            label={label}
            creatable={creatable}
            helpId={helpId}
            helpMessage={helpMessage}
            isDisabled={disabled}
            isMulti={isMulti}
            isClearable={isClearable}
            maxLength={max}
            options={options}
            raw={raw}
            required={required}
            clearButtonText={clearButtonText}
            clearButtonProps={clearButtonProps}
          />
        )}
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Col>
      <Col md="5">
        <SelectedOption field="select" />
      </Col>
    </Row>
  </FormikResults>
);

_SelectField.storyName = '<SelectField />';

_SelectField.parameters = {
  docs: {
    description: {
      story: 'Select with a Label and Feedback that appears below the input.',
    },
  },
};

Default.storyName = '<Select />';

export const hidden_SelectField = (props: SelectFieldProps<unknown, false>) => <SelectField {...props} />;
