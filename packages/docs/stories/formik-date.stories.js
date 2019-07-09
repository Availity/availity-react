import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import FormikDate, { DateField } from '@availity/formik-date';
import { Form } from '@availity/form';
import README from '@availity/formik-date/README.md';
import moment from 'moment';

// Validates another date field is after this date field
yup.addMethod(yup.string, 'format', function format(
  format = 'MM/DD/YYYY',
  msg
) {
  // Can't use arrow function because we rely on 'this' referencing yup's internals
  return this.test({
    name: 'format',
    exclusive: true, // Validation errors don't stack
    // NOTE: Intentional use of single quotes - yup will handle the string interpolation
    message: msg || 'This field is invalid.',
    test(value) {
      const date = moment(
        value,
        ['MM/DD/YYYY', format, 'MMDDYYYY', 'YYYYMMDD'],
        true
      );
      return date.isValid();
    },
  });
});

// Validates another date field is after this date field
yup.addMethod(yup.string, 'between', function format(
  { min, max, format = 'MM/DD/YYYY' },
  msg
) {
  // Can't use arrow function because we rely on 'this' referencing yup's internals
  return this.test({
    name: 'between',
    exclusive: true, // Validation errors don't stack
    // NOTE: Intentional use of single quotes - yup will handle the string interpolation
    message: msg || 'This field is invalid.',
    test(value) {
      const date = moment(
        value,
        ['MM/DD/YYYY', format, 'MMDDYYYY', 'YYYYMMDD'],
        true
      );

      return date.isBetween(min, max);
    },
  });
});

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
      dateOfService: yup
        .date('This field is invalid.')
        .format('MM/DD/YYYY', true),
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
        <div className="d-flex">
          <FormikDate
            id="dateOfService"
            name="dateOfService"
            min={{ value: 7, units: 'days' }}
            max={{ value: 7, units: 'days' }}
          />

          <Button className="ml-1" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  })
  .add('DateField', () => {
    const dateFormat = 'MM/DD/YYYY';
    const minDate = moment()
      .subtract(7, 'day')
      .format(dateFormat);
    const maxDate = moment()
      .add(7, 'day')
      .format(dateFormat);

    const schema = yup.object().shape({
      dateOfService: yup
        .string()
        .typeError('This field is invalid.')
        .required('This field is required.')
        .format(dateFormat)
        .between(
          {
            min: minDate,
            max: maxDate,
            format: 'MM/DD/YYYY',
          },
          `Date must be between ${minDate} and ${maxDate}`
        ),
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
        <DateField
          id="dateOfService"
          name="dateOfService"
          label="Date of Service"
          dateFormat={dateFormat}
          min={{ value: 7, units: 'days' }}
          max={{ value: 7, units: 'days' }}
        />

        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  });
  