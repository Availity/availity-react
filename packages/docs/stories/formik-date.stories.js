import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import FormikDate, {
  DateField,
  DateRange,
  DateRangeField,
} from '@availity/formik-date';
import '@availity/formik-date/styles.scss';
import '@availity/yup'
import README from '@availity/formik-date/README.md';
import moment from 'moment';
import FormikResults from './mocks/FormikResults';

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
        // .format('MM/DD/YYYY', true),
    });

    return (
      <FormikResults
        initialValues={{
          dateOfService: '',
        }}
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
      </FormikResults>
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
      const required = boolean('Required',false);

    const schema = yup.object().shape({
      dateOfService: yup
        .date({
          format: dateFormat
        })
        .typeError('This field is invalid.')
        // .isRequired(required,'This field is required.')
        // .between(
        //   {
        //     min: minDate,
        //     max: maxDate,
        //     format: 'MM/DD/YYYY',
        //   },
        //   `Date must be between ${minDate} and ${maxDate}`
        // ),
    });

    return (
      <FormikResults
        initialValues={{
          dateOfService: '',
        }}
        validationSchema={schema}
      >
        <DateField
          id="dateOfService"
          name="dateOfService"
          label="Date of Service"
          format={dateFormat}
          min={{ value: 7, units: 'days' }}
          max={{ value: 7, units: 'days' }}
        />

        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </FormikResults>
    );
  })
  // .add('DateRange', () => {
  //   const dateFormat = 'MM/DD/YYYY';
  //   const minDate = moment()
  //     .subtract(7, 'day')
  //     .format(dateFormat);
  //   const maxDate = moment()
  //     .add(7, 'day')
  //     .format(dateFormat);

  //   const schema = yup.object().shape({
  //     dateOfService: yup
  //       .string()
  //       .typeError('This field is invalid.')
  //       .required('This field is required.')
  //       .dateRange(
  //         { min: minDate, max: maxDate, format: dateFormat },
  //         `Date must be between ${minDate} and ${maxDate}`
  //       ),
  //   });

  //   return (
  //     <FormikResults
  //       initialValues={{
  //         dateOfService: '',
  //       }}
  //       validationSchema={schema}
  //     >
  //       <DateRange
  //         id="dateOfService"
  //         name="dateOfService"
  //         min={{ value: 7, units: 'days' }}
  //         max={{ value: 7, units: 'days' }}
  //       />

  //       <Button className="mt-1 ml-1" color="primary" type="submit">
  //         Submit
  //       </Button>
  //     </FormikResults>
  //   );
  // })
  // .add('DateRangeField', () => {
  //   const dateFormat = 'MM/DD/YYYY';
  //   const minDate = moment()
  //     .subtract(7, 'day')
  //     .format(dateFormat);
  //   const maxDate = moment()
  //     .add(7, 'day')
  //     .format(dateFormat);

  //   const schema = yup.object().shape({
  //     dateOfService: yup
  //       .dateRange({
  //         startKey: 'startDate',
  //         endKey:'endDate'
  //       }).between(minDate,maxDate)
  //   });

  //   return (
  //     <FormikResults
  //       initialValues={{
  //         dateOfService: {
  //           startDate: '',
  //           endDate: ''
  //         },
  //       }}
  //       validationSchema={schema}
  //     >
  //       <DateRangeField
  //         id="dateOfService"
  //         name="dateOfService"
  //         label="Date of Service"
  //         min={{ value: 7, units: 'days' }}
  //         max={{ value: 7, units: 'days' }}
  //       />
  //       <Button className="mt-1 ml-1" color="primary" type="submit">
  //         Submit
  //       </Button>
  //     </FormikResults>
  //   );
  // });
