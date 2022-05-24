/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';
import { Field } from '@availity/form';

import { SelectField } from '../src';
// import README from '../README.md';

import { singleValueSchema, multiValueSchema, options, SelectedOption } from './utils';
import FormikResults from '../../../story-utils/FormikResults';

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
    helpId: '',
    helpMessage: 'This is a message to provide guidance',
    isMulti: false,
    label: 'Select Field Label',
    min: 2,
    max: 3,
    raw: false,
    required: true,
  },
} as Meta;

export const SelectFieldStory: Story = ({
  autofill,
  creatable,
  disabled,
  helpId,
  helpMessage,
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
      select: undefined,
      autoFill1: '',
      autoFill2: '',
    }}
    validationSchema={isMulti ? multiValueSchema('select', required, min, max) : singleValueSchema('select', required)}
  >
    <Row>
      <Col>
        <SelectField
          name="select"
          autofill={autofill}
          creatable={creatable}
          helpId={helpId}
          helpMessage={helpMessage}
          isDisabled={disabled}
          isMulti={isMulti}
          label={label}
          maxLength={max}
          options={options}
          raw={raw}
          required={required}
        />
        {autofill ? (
          <>
            <Field name="autoFill1" type="text" label="Autofill Value 1" />
            <Field name="autoFill2" type="text" label="Autofill Value 2" />
          </>
        ) : null}
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

SelectFieldStory.storyName = '<SelectField />';
