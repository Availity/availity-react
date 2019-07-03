import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import { Date as FormikDate } from '@availity/formik-date';
import { Form } from '@availity/form';
import README from '@availity/formik-date/README.md';

// eslint-disable-next-line no-undef
storiesOf('Formik|Date', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('Date', () => {
    const schema = yup.object().shape({
      dateOfService: yup.string().required('This field is required'),
    });

    return (
      <Form
        initialValues={{
          dateOfService: '',
        }}
        // eslint-disable-next-line no-undef
        onSubmit={values => alert(JSON.stringify(values))}
        validationSchema={schema}
      >
        <FormikDate
          id="dateOfService"
          name="dateOfService"
          min={{ value: 7, units: 'days' }}
          max={{ value: 7, units: 'days' }}
        />

        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  });
