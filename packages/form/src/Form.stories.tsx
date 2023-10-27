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
// import README from '../form/README.md';

import FormResults from '../../../story-utils/FormikResults';
import { InputProps } from './Input';
import { CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxProps } from './Checkbox';
import { Props as CurrencyInputProps } from './CurrencyInput';
import { Props as FormGroupProps } from './FormGroup';

export default {
  title: 'Form Components/Form',
  component: Form,
  parameters: {
    docs: {
      // page: README,
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

export const _Default: StoryObj<typeof Form> = {
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
export const _Input: StoryObj<typeof Form> = {
  render: ({ required }) => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Input field that utilizes the Form validation.',
      },
    },
  },
};

export const _FormGroup: StoryObj<typeof Form> = {
  render: ({ required }) => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wrapper for an Input field. Uses reactstrap FormGroup.',
      },
    },
  },
};

type FieldStoryProps = {
  helpMessage: string;
  helpId: string;
} & FormStoryProps;

export const _Field: StoryObj<typeof Form> = {
  render: ({ required, helpMessage, helpId }) => (
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
  ),
  args: {
    helpMessage: '',
    helpId: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field wrapped in additional features such as label, feedback, grid options, etc.',
      },
    },
  },
};

type CheckboxStoryProps = {
  helpId: string;
  labelClassName: string;
} & FormStoryProps;

export const _Checkbox: StoryObj<typeof Form> = {
  render: ({ required, helpId, labelClassName }) => (
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
        <Checkbox groupName="checkboxGroup" label={<>Check Four</>} value="cuatro" />
      </CheckboxGroup>
      <Button className="ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormResults>
  ),
  args: {
    helpId: '',
    labelClassName: 'label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inputs of type checkbox. Checkboxes should be wrapped in a CheckboxGroup.',
      },
    },
  },
};

type RadioStoryProps = CheckboxStoryProps;

export const _Radio: StoryObj<typeof Form> = {
  render: ({ required, helpId, labelClassName }) => (
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
  ),
  args: {
    helpId: '',
    labelClassName: 'label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inputs of type radio. Radios should be wrapped in a RadioGroup.',
      },
    },
  },
};

export const _CurrencyInput: StoryObj<typeof Form> = {
  render: ({ value }) => {
    const [newValue, setNewValue] = useState(value);

    return (
      <FormResults
        onSubmit={() => {
          console.log('submitted');
        }}
        initialValues={{
          paidAmount: value,
        }}
        validationSchema={yup.object().shape({
          paidAmount: yup.string().required('This field is required'),
        })}
      >
        <CurrencyInput
          name="paidAmount"
          value={newValue}
          id="paidAmount"
          onValueChanged={(value) => {
            setNewValue(value);
          }}
        />
      </FormResults>
    );
  },
  args: {
    value: '4.93',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field that utilizes the Form validation. Formats and displays the value as a currency ($USD).',
      },
    },
  },
};

export const hidden_Input = (props: InputProps) => <Input {...props} />;
export const hidden_Label = (props: LabelProps) => <Label {...props} />;
export const hidden_Field = (props: FieldProps) => <Field {...props} />;
export const hidden_Checkbox = (props: CheckboxProps) => <Checkbox {...props} />;
export const hidden_CheckboxGroup = (props: CheckboxGroupProps) => <CheckboxGroup {...props} />;
export const hidden_Radio = (props: RadioStoryProps) => <Radio {...props} />;
export const hidden_FormGroup = (props: FormGroupProps) => <FormGroup {...props} />;
export const hidden_CurrencyInput = (props: CurrencyInputProps) => <CurrencyInput {...props} />;
