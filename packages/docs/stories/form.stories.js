import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import {
  Field,
  Input,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  FormGroup,
} from '@availity/form';
import '@availity/yup';
import README from '@availity/form/README.md';
import FormResults from './mocks/FormikResults';

// eslint-disable-next-line no-undef
storiesOf('Formik|Form', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <FormResults
        initialValues={{
          hello: '',
        }}
        validationSchema={yup.object().shape({
          hello: yup.string().isRequired(boolean('Required',false),"This field is required."),
        })}
      >
        <Field name="hello" type="text" label="Hello" />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </FormResults>
    );
  })
  .add('Input', () => {
    const schema = yup.object().shape({
      hello: yup.string().required(),
    });

    return (
      <FormResults
        initialValues={{
          hello: '',
        }}
        validationSchema={schema}
      >
        <div className="d-flex">
          <Input name="hello" type="text" label="Hello" />
          <Button className="ml-1" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </FormResults>
    );
  })
  .add('Form Group', () => (
    <FormResults
      initialValues={{
        hello: '',
      }}
      validationSchema={yup.object().shape({
        hello: yup.string().isRequired(boolean('Required',false),"This field is required."),
      })}
    >
      <FormGroup name="hello" data-testid="hello-group">
        <Input name="hello" data-testid="hello-input" />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </FormResults>
  ))
  .add('Field', () => {
    const schema = yup.object().shape({
      hello: yup.string().isRequired(boolean('Required',false),"This field is required."),
    });

    return (
      <FormResults
        initialValues={{
          hello: '',
        }}
        validationSchema={schema}
      >
        <Field name="hello" type="text" label="Hello" />
        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </FormResults>
    );
  })
  .add('Checkbox', () => {
    const required = boolean("Required",false);
    const schema = yup.object().shape({
      checkboxGroup: yup.array().isRequired(required,'At least one checkbox is required'),
    });

    return (
      <FormResults
        initialValues={{
          checkboxGroup: [],
        }}
        validationSchema={schema}
      >
        <CheckboxGroup name="checkboxGroup" label="Checkbox Group">
          <Checkbox label="Check One" value="uno" />
          <Checkbox label="Check Two" value="dos" />
          <Checkbox label="Check Three" value="tres" />
        </CheckboxGroup>
        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </FormResults>
    );
  })
  .add('Radio', () => {
    const schema = yup.object().shape({
      hello: yup.string().isRequired(boolean('Required',false),"This field is required."),
    });

    return (
      <FormResults
        initialValues={{
          hello: '',
        }}
        validationSchema={schema}
      >
        <RadioGroup name="hello" label="Radio Group">
          <Radio label="Radio One" value="uno" />
          <Radio label="Radio Two" value="dos" />
          <Radio label="Radio Three" value="tres" />
        </RadioGroup>
        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </FormResults>
    );
  });
