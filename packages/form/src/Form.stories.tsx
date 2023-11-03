/* eslint-disable no-console */
import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { avDate } from '@availity/yup';
import { Phone } from '@availity/phone';
import { DateField } from '@availity/date';
import { SelectField } from '@availity/select';
import '@availity/date/styles.scss';

import FormResults from '../../../story-utils/FormikResults';
import { FormProps } from './Form';
import { InputProps } from './Input';
import { CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxProps } from './Checkbox';
import { RadioGroupProps } from './RadioGroup';
import { RadioProps } from './Radio';
import { Props as CurrencyInputProps } from './CurrencyInput';
import { Props as FormGroupProps } from './FormGroup';
import {
  Field,
  Input,
  CurrencyInput,
  Checkbox,
  CheckboxGroup,
  Label,
  RadioGroup,
  Radio,
  FormGroup,
  RequiredKey,
  LabelProps,
  Form,
  FieldProps,
} from '.';

export default {
  title: 'Form Components/Form',
  parameters: {
    docs: {
      description: {
        component: 'Availity form components that are wired to be hooked up to formik.',
      },
    },
  },
  args: {
    required: false,
  },
};

type FormStoryProps = { required: boolean };

export const _Default: StoryObj<FormStoryProps> = {
  render: ({ required }) => {
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
        validationSchema={yup.object().shape({
          field: yup.string().isRequired(required, 'This field is required.'),
          phone: yup.string().validatePhone(undefined, false, 'US').isRequired(required, 'This field is required.'),
          ext: yup.string(),
          dateField: avDate().isRequired(required, 'This field is required.'),
          checkboxGroup: yup.array().isRequired(required, 'At least one checkbox is required'),
          radioGroup: yup.string().isRequired(required, 'A selection is required'),
          radioGroupLabelStyling: yup.string().isRequired(required, 'A selection is required'),
          SelectField: yup.string().isRequired(required, 'This field is required.').nullable(),
          disabledField: yup.string(),
          disabledDateField: avDate(),
          disabledSelectField: yup.string().nullable(),
        })}
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
        <DateField id="dateField" name="dateField" label="Date Field" required={required} />
        <CheckboxGroup name="checkboxGroup" label="Checkbox Group" helpId="checkboxGroup" required={required}>
          <Checkbox groupName="checkboxGroup" label="Check One" value="uno" helpId="option1" />
          <Checkbox groupName="checkboxGroup" label="Check Two" value="dos" />
          <Checkbox groupName="checkboxGroup" label="Check Three" value="tres" helpId="option3" />
          <Checkbox groupName="checkboxGroup" label={<>Check Four</>} value="cuatro" />
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
        <DateField id="disabledDateField" name="disabledDateField" label="Disabled Date Field" disabled />
        <SelectField label="Disabled Select Field" name="disabledSelectField" options={options} isDisabled />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </FormResults>
    );
  },
};

export const hidden_Form = (props: FormProps<unknown>) => <Form {...props} />;
export const hidden_Input = (props: InputProps) => <Input {...props} />;
export const hidden_Label = (props: LabelProps) => <Label {...props} />;
export const hidden_Field = (props: FieldProps) => <Field {...props} />;
export const hidden_Checkbox = (props: CheckboxProps) => <Checkbox {...props} />;
export const hidden_CheckboxGroup = (props: CheckboxGroupProps) => <CheckboxGroup {...props} />;
export const hidden_Radio = (props: RadioProps) => <Radio {...props} />;
export const hidden_RadioGroup = (props: RadioGroupProps) => <RadioGroup {...props} />;
export const hidden_FormGroup = (props: FormGroupProps) => <FormGroup {...props} />;
export const hidden_CurrencyInput = (props: CurrencyInputProps) => <CurrencyInput {...props} />;
