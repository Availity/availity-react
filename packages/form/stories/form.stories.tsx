/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { avDate } from '@availity/yup';
import { Phone } from '@availity/phone';
import { DateField } from '@availity/date';
import { SelectField } from '@availity/select';

import { Field, Input, Checkbox, CheckboxGroup, Label, RadioGroup, Radio, FormGroup, RequiredKey } from '..';
// import README from '../form/README.md';

import FormResults from '../../../story-utils/FormikResults';

export default {
  title: 'Form Components/Form',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    required: false,
  },
} as Meta;

export const Default: Story = ({ required }) => {
  const schema = yup.object().shape({
    field: yup.string().isRequired(required, 'This field is required.'),
    phone: yup.string().validatePhone(undefined, false, 'US').isRequired(required, 'This field is required.'),
    ext: yup.string(),
    dateField: avDate({
      format: 'MM/DD/YYYY',
    })
      .isRequired(required, 'This field is required.')
      .min('')
      .max('')
      .between('', ''),
    checkboxGroup: yup.array().isRequired(required, 'At least one checkbox is required'),
    radioGroup: yup.string().isRequired(required, 'A selection is required'),
    radioGroupLabelStyling: yup.string().isRequired(required, 'A selection is required'),
    SelectField: yup.string().isRequired(required, 'This field is required.').nullable(),
    disabledField: yup.string(),
    disabledDateField: avDate({
      format: 'MM/DD/YYYY',
    })
      .min('')
      .max('')
      .between('', ''),
    disabledSelectField: yup.string().nullable(),
  });
  const options = [
    { label: 'Option 1', value: 'value for option 1' },
    { label: 'Option 2', value: 'value for option 2' },
    { label: 'Option 3', value: 'value for option 3' },
    { label: 'Option 4', value: 'value for option 4' },
  ];

  return (
    <FormResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        field: '',
        phone: '',
        ext: '',
        dateField: '',
        checkboxGroup: [],
        radioGroup: '',
        radioGroupLabelStyling: '',
        SelectField: undefined,
        disabledField: '',
        disabledDateField: '01/01/2021',
        disabledSelectField: [],
      }}
      validationSchema={schema}
    >
      <h2>Form</h2>
      <RequiredKey />
      <br />
      <Field name="field" type="text" label="Field" required={required} />
      <Phone
        name="phone"
        label="Phone"
        showExtension
        required={required}
        extProps={{
          name: 'ext',
          label: 'Ext.',
        }}
      />
      <DateField id="dateField" name="dateField" label="Date Field" required={required} datepicker={false} />
      <CheckboxGroup name="checkboxGroup" label="Checkbox Group" helpId="checkboxGroup" required={required}>
        <Checkbox groupName="checkboxGroup" label="Check One" value="uno" helpId="option1" />
        <Checkbox groupName="checkboxGroup" label="Check Two" value="dos" />
        <Checkbox groupName="checkboxGroup" label="Check Three" value="tres" helpId="option3" />
      </CheckboxGroup>
      <RadioGroup name="radioGroup" label="Radio Group" required={required}>
        <Radio name="radioGroup" label="Radio One" value="uno" />
        <Radio name="radioGroup" label="Radio Two" value="dos" />
        <Radio name="radioGroup" label="Radio Three" value="tres" />
      </RadioGroup>
      <RadioGroup
        name="radioGroupLabelStyling"
        label="Radio Group with Legend styled like Label"
        labelClassName="label"
        helpId="radioGroup"
        required={required}
      >
        <Radio name="radioGroupLabelStyling" label="Radio One" value="uno" />
        <Radio name="radioGroupLabelStyling" label="Radio Two" value="dos" />
        <Radio name="radioGroupLabelStyling" label="Radio Three" value="tres" />
      </RadioGroup>
      <SelectField label="Select Field" name="SelectField" options={options} required={required} />
      <Field name="disabledField" type="text" label="Disabled Field" disabled />
      <DateField
        id="disabledDateField"
        name="disabledDateField"
        label="Disabled Date Field"
        datepicker={false}
        disabled
      />
      <SelectField label="Disabled Select Field" name="disabledSelectField" options={options} isDisabled />
      <Button color="primary" type="submit">
        Submit
      </Button>
    </FormResults>
  );
};
Default.storyName = 'default';

export const _Input: Story = ({ required }) => (
  <FormResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required'),
    })}
  >
    <div className="d-flex">
      <Input name="hello" type="text" label="Hello" />
      <Button className="ml-1" color="primary" type="submit">
        Submit
      </Button>
    </div>
  </FormResults>
);
_Input.storyName = 'Input';

export const _Label: Story = ({ required, helpId, className, children }) => (
  <Label required={required} helpId={helpId} className={className}>
    {children}
  </Label>
);
_Label.args = {
  helpId: '',
  className: '',
  children: 'Label Text',
};
_Label.storyName = 'Label';

export const _FormGroup: Story = ({ required }) => (
  <FormResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required.'),
    })}
  >
    <FormGroup for="hello" data-testid="hello-group">
      <Input name="hello" data-testid="hello-input" />
    </FormGroup>
    <Button type="submit">Submit</Button>
  </FormResults>
);
_FormGroup.storyName = 'Form Group';

export const _Field: Story = ({ required, helpMessage, helpId }) => (
  <FormResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required.'),
    })}
  >
    <Field name="hello" type="text" label="Hello" helpMessage={helpMessage} helpId={helpId} required={required} />
    <Button className="ml-1" color="primary" type="submit">
      Submit
    </Button>
  </FormResults>
);
_Field.args = {
  helpMessage: '',
  helpId: '',
};
_Field.storyName = 'Field';

export const _Checkbox: Story = ({ required, helpId, labelClassName }) => (
  <FormResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      checkboxGroup: [],
    }}
    validationSchema={yup.object().shape({
      checkboxGroup: yup.array().isRequired(required, 'At least one checkbox is required'),
    })}
  >
    <CheckboxGroup
      name="checkboxGroup"
      helpId={helpId}
      label="Checkbox Group"
      required={required}
      labelClassName={labelClassName}
    >
      <Checkbox groupName="checkboxGroup" label="Check One" value="uno" />
      <Checkbox groupName="checkboxGroup" label="Check Two" value="dos" />
      <Checkbox groupName="checkboxGroup" label="Check Three" value="tres" />
    </CheckboxGroup>
    <Button className="ml-1" color="primary" type="submit">
      Submit
    </Button>
  </FormResults>
);
_Checkbox.args = {
  helpId: '',
  labelClassName: 'label',
};
_Checkbox.storyName = 'Checkbox';

export const _Radio: Story = ({ required, helpId, labelClassName }) => (
  <FormResults
    onSubmit={() => {
      console.log('submitted');
    }}
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required.'),
    })}
  >
    <RadioGroup name="hello" label="Radio Group" helpId={helpId} required={required} labelClassName={labelClassName}>
      <Radio name="hello" label="Radio One" value="uno" />
      <Radio name="hello" label="Radio Two" value="dos" helpId="radioTwoHelp" />
      <Radio name="hello" label="Radio Three" value="tres" />
    </RadioGroup>
    <Button className="ml-1" color="primary" type="submit">
      Submit
    </Button>
  </FormResults>
);
_Radio.args = {
  helpId: '',
  labelClassName: 'label',
};
_Radio.storyName = 'Radio';
