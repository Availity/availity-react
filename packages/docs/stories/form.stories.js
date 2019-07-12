import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import {
  Form,
  Field,
  Input,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  FormGroup,
} from '@availity/form';
import README from '@availity/form/README.md';

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
    const schema = yup.object().shape({
      hello: yup.string().required(),
    });
    return (
      <Form
        initialValues={{
          hello: '',
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
        validationSchema={select('Validation', {
          required: schema,
          optional: yup.object().shape({
            hello: yup.string(),
          }),
        })}
      >
        <Field name="hello" type="text" label="Hello" />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  })
  .add('Input', () => {
    const schema = yup.object().shape({
      hello: yup.string().required(),
    });

    return (
      <Form
        initialValues={{
          hello: '',
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
        validationSchema={schema}
      >
        <div className="d-flex">
          <Input name="hello" type="text" label="Hello" />
          <Button className="ml-1" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  })
  .add('Form Group', () => (
    <Form
      initialValues={{
        hello: '',
      }}
      // eslint-disable-next-line no-undef
      onSubmit={values => alert(JSON.stringify(values))}
      validationSchema={yup.object().shape({
        hello: yup.string().optional(),
      })}
    >
      <FormGroup name="hello" data-testid="hello-group">
        <Input name="hello" data-testid="hello-input" />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  ))
  .add('Field', () => {
    const schema = yup.object().shape({
      hello: yup.string().required(),
    });

    return (
      <Form
        initialValues={{
          hello: '',
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
        validationSchema={schema}
      >
        <Field name="hello" type="text" label="Hello" />
        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  })
  .add('Checkbox', () => {
    const schema = yup.object().shape({
      checkboxGroup: yup.array().required('At least one checkbox is required'),
    });

    return (
      <Form
        initialValues={{
          checkboxGroup: [],
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
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
      </Form>
    );
  })
  .add('Radio', () => {
    const schema = yup.object().shape({
      hello: yup.string().required('This field is required'),
    });

    return (
      <Form
        initialValues={{
          hello: '',
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
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
      </Form>
    );
  });
