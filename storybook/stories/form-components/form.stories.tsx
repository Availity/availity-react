import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Field, Input, Checkbox, CheckboxGroup, RadioGroup, Radio, FormGroup } from '@availity/form';
import '@availity/yup';
// import README from '@availity/form/README.md';

import FormResults from '../util/FormikResults';

export default {
  title: 'Form Components/Form',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ required }) => (
  <FormResults
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required.'),
    })}
  >
    <Field name="hello" type="text" label="Hello" />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </FormResults>
);
Default.args = {
  required: false,
};
Default.storyName = 'default';

export const _Input: Story = () => (
  <FormResults
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().required(),
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

export const _FormGroup: Story = ({ required }) => (
  <FormResults
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required.'),
    })}
  >
    <FormGroup name="hello" data-testid="hello-group">
      <Input name="hello" data-testid="hello-input" />
    </FormGroup>
    <Button type="submit">Submit</Button>
  </FormResults>
);
_FormGroup.args = {
  required: false,
};
_FormGroup.storyName = 'Form Group';

export const _Field: Story = ({ required, helpMessage, helpTopicId }) => (
  <FormResults
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required.'),
    })}
  >
    <Field name="hello" type="text" label="Hello" helpMessage={helpMessage} helpId={helpTopicId} />
    <Button className="ml-1" color="primary" type="submit">
      Submit
    </Button>
  </FormResults>
);
_Field.args = {
  required: false,
  helpMessage: '',
  helpTopicId: '',
};
_Field.storyName = 'Field';

export const _Checkbox: Story = ({ required, helpId }) => (
  <FormResults
    initialValues={{
      checkboxGroup: [],
    }}
    validationSchema={yup.object().shape({
      checkboxGroup: yup.array().isRequired(required, 'At least one checkbox is required'),
    })}
  >
    <CheckboxGroup name="checkboxGroup" helpId={helpId} label="Checkbox Group">
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
  required: false,
  helpId: '',
};
_Checkbox.storyName = 'Checkbox';

export const _Radio: Story = ({ required, helpId }) => (
  <FormResults
    initialValues={{
      hello: '',
    }}
    validationSchema={yup.object().shape({
      hello: yup.string().isRequired(required, 'This field is required.'),
    })}
  >
    <RadioGroup name="hello" label="Radio Group" helpId={helpId}>
      <Radio name="hello" label="Radio One" value="uno" />
      <Radio name="hello" label="Radio Two" value="dos" />
      <Radio name="hello" label="Radio Three" value="tres" />
    </RadioGroup>
    <Button className="ml-1" color="primary" type="submit">
      Submit
    </Button>
  </FormResults>
);
_Radio.args = {
  required: false,
  helpId: '',
};
_Radio.storyName = 'Checkbox';
