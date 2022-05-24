/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';
import { Field } from '@availity/form';

import Select from '../src';
// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';
import { singleValueSchema, multiValueSchema, options, SelectedOption } from './utils';

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
    min: 2,
    max: 3,
    raw: false,
    required: true,
  },
} as Meta;

export const Default: Story = ({ autofill, creatable, disabled, helpMessage, isMulti, max, min, raw, required }) => (
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
        <Select
          name="select"
          aria-label="stand-alone"
          autofill={autofill}
          creatable={creatable}
          helpMessage={helpMessage}
          isDisabled={disabled}
          isMulti={isMulti}
          maxLength={max}
          options={options}
          raw={raw}
        />
        {autofill ? (
          <>
            <Field name="autoFill1" type="text" label="Autofill Value 1" />
            <Field name="autoFill2" type="text" label="Autofill Value 2" />
          </>
        ) : null}
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
