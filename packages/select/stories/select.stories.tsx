/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import { Button, Col, Row } from 'reactstrap';
import { Field } from '@availity/form';

import Select from '../src';
// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';
import { singleValueSchema, multiValueSchema, options, SelectedOption, autofillOptions } from './utils';

export default {
  title: 'Form Components/Select',
  parameters: {
    docs: {
      // page: README,
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

Default.storyName = '<Select />';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Select</h5>
    <ArgsTable of={Select} />
  </>
);
