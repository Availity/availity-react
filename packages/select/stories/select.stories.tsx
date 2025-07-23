/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';
import { Field } from '@availity/form';

import Select, { SelectField, SelectFieldProps } from '../src';
// import README from '../README.md';

// eslint-disable-next-line import/no-relative-packages
import FormikResults from '../../../story-utils/FormikResults';
import { singleValueSchema, multiValueSchema, options, SelectedOption, autofillOptions } from './utils';

export default {
  title: 'Bootstrap Components/Select',
  component: Select,
  args: {
    autofill: false,
    creatable: false,
    isDisabled: false,
    helpMessage: 'This is a message to provide guidance',
    isMulti: false,
    isClearable: false,
    minLength: 2,
    maxLength: 3,
    raw: false,
    required: true,
    clearButtonText: 'clear',
    clearButtonProps: {},
    label: 'Field Label',
  },
};

/**
 * Select dropdown without a Label or Feedback
 */
export const _Select: StoryObj<typeof Select> = {
  render: ({
    autofill,
    creatable,
    isDisabled,
    helpMessage,
    isMulti,
    isClearable,
    maxLength,
    minLength,
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
          ? multiValueSchema(
              'select',
              required || false,
              minLength || 0,
              maxLength || Number.MAX_SAFE_INTEGER,
              !autofill && !raw
            )
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
                isDisabled={isDisabled}
                isMulti={isMulti}
                isClearable={isClearable}
                maxLength={maxLength}
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
              isDisabled={isDisabled}
              isMulti={isMulti}
              isClearable={isClearable}
              maxLength={maxLength}
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
  ),
};

/**
 * Select with a Label and Feedback that appears below the input.
 */
export const _SelectField: StoryObj<typeof SelectField> = {
  render: ({
    autofill,
    creatable,
    isDisabled,
    helpId,
    helpMessage,
    isMulti,
    isClearable,
    label,
    maxLength,
    minLength,
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
          ? multiValueSchema(
              'select',
              required || false,
              minLength || 0,
              maxLength || Number.MAX_SAFE_INTEGER,
              !autofill && !raw
            )
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
                isDisabled={isDisabled}
                isMulti={isMulti}
                isClearable={isClearable}
                maxLength={maxLength}
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
              isDisabled={isDisabled}
              isMulti={isMulti}
              isClearable={isClearable}
              maxLength={maxLength}
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
  ),
};

export const hidden_SelectField = (props: SelectFieldProps<unknown, false>) => <SelectField {...props} />;
