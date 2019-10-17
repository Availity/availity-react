import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs/react';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import FormikDate, {
  DateField,
  DateRange,
  DateRangeField,
} from '@availity/date';
import '@availity/date/styles.scss';
import '@availity/yup/moment';
import README from '@availity/date/README.md';
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
    const dateFormat = 'MM/DD/YYYY';
    const min = text('Min Date (yyyy-mm-dd)');
    const max = text('Max Date (yyyy-mm-dd)');
    const minDate = moment(min).format(dateFormat);
    const maxDate = moment(max).format(dateFormat);

    const required = boolean('Required', false);

    const schema = yup.object().shape({
      dateOfService: yup
        .date({
          format: dateFormat,
        })
        .isRequired(required, 'This field is required.')
        .min(min && !max && minDate)
        .max(!min && max && maxDate)
        .between(min && max && minDate, maxDate),
    });

    return (
      <FormikResults
        initialValues={{
          dateOfService: '',
        }}
        validationSchema={schema}
      >
        <FormikDate
          id="dateOfService"
          name="dateOfService"
          disabled={boolean('Disabled', false)}
          datepicker={boolean('Has datepicker', true)}
          min={min && minDate}
          max={max && maxDate}
        />

        <Button className="mt-3" color="primary" type="submit">
          Submit
        </Button>
      </FormikResults>
    );
  })
  .add('DateField', () => {
    const dateFormat = 'MM/DD/YYYY';
    const min = text('Min Date (yyyy-mm-dd)');
    const max = text('Max Date (yyyy-mm-dd)');
    const minDate = moment(min).format(dateFormat);
    const maxDate = moment(max).format(dateFormat);

    const required = boolean('Required', false);

    const schema = yup.object().shape({
      dateOfService: yup
        .date({
          format: dateFormat,
        })
        .isRequired(required, 'This field is required.')
        .min(min && !max && minDate)
        .max(!min && max && maxDate)
        .between(min && max && minDate, maxDate),
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
          label={text('Label', 'Date of Service')}
          disabled={boolean('Disabled', false)}
          datepicker={boolean('Has datepicker', true)}
          min={min && minDate}
          max={max && maxDate}
        />

        <Button className="ml-1" color="primary" type="submit">
          Submit
        </Button>
      </FormikResults>
    );
  })
  .add('DateRange', () => {
    const dateFormat = 'MM/DD/YYYY';
    const min = text('Min Date (yyyy-mm-dd)');
    const max = text('Max Date (yyyy-mm-dd)');
    const minDate = moment(min).format(dateFormat);
    const maxDate = moment(max).format(dateFormat);

    const required = boolean('Required', false);

    const minDistance = number('Min Distance', undefined);
    const maxDistance = number('Max Distance', undefined);

    const distanceUnits = ['day', 'month'];

    let minDistanceUnits = 'day';
    let maxDistanceUnits = 'day';
    if (minDistance) {
      minDistanceUnits = select('Min Distance Units', distanceUnits, 'day');
    }
    if (maxDistance) {
      maxDistanceUnits = select('Max Distance Units', distanceUnits, 'day');
    }

    const schema = yup.object().shape({
      dateOfService: yup
        .dateRange({
          startKey: 'startDate',
          endKey: 'endDate',
          format: dateFormat,
        })
        .min(min && !max && minDate)
        .max(!min && max && maxDate)
        .between(min && max && minDate, maxDate)
        .distance({
          min: {
            value: minDistance,
            units: minDistanceUnits,
          },
          max: {
            value: maxDistance,
            units: maxDistanceUnits,
          },
        })
        .isRequired(required, 'This field is required.'),
    });

    return (
      <FormikResults
        initialValues={{
          dateOfService: '',
        }}
        validationSchema={schema}
      >
        <DateRange
          id="dateOfService"
          name="dateOfService"
          disabled={boolean('Disabled', false)}
          datepicker={boolean('Has datepicker', true)}
          ranges={boolean('ranges', false)}
          min={min && minDate}
          max={max && maxDate}
        />

        <Button className="mt-1 ml-1" color="primary" type="submit">
          Submit
        </Button>
      </FormikResults>
    );
  })
  .add('DateRangeField', () => {
    const dateFormat = 'YYYY-MM-DD';
    const min = text('Min Date (yyyy-mm-dd)');
    const max = text('Max Date (yyyy-mm-dd)');
    const minDate = moment(min).format(dateFormat);
    const maxDate = moment(max).format(dateFormat);

    const required = boolean('Required', false);

    const minDistance = number('Min Distance');
    const maxDistance = number('Max Distance');

    const distanceUnits = ['day', 'month'];

    let minDistanceUnits = 'day';
    let maxDistanceUnits = 'day';
    if (minDistance) {
      minDistanceUnits = select('Min Distance Units', distanceUnits, 'day');
    }
    if (maxDistance) {
      maxDistanceUnits = select('Max Distance Units', distanceUnits, 'day');
    }

    const schema = yup.object().shape({
      dateOfService: yup
        .dateRange({
          format: dateFormat,
        })
        // .typeError()
        .min(min && !max && minDate)
        .max(!min && max && maxDate)
        .between(min && max && minDate, maxDate)
        .isRequired(required, 'This field is required.')
        .distance({
          min: {
            value: minDistance,
            units: minDistanceUnits,
          },
          max: {
            value: maxDistance,
            units: maxDistanceUnits,
          },
        }),
    });

    return (
      <FormikResults
        initialValues={{
          dateOfService: {
            startDate: '',
            endDate: '',
          },
        }}
        validationSchema={schema}
      >
        <DateRangeField
          id="dateOfService"
          name="dateOfService"
          label="Date of Service"
          disabled={boolean('Disabled', false)}
          datepicker={boolean('Has datepicker', true)}
          ranges={boolean('ranges', false)}
          format={dateFormat}
          min={min && minDate}
          max={max && maxDate}
        />
        <Button className="mt-1 ml-1" color="primary" type="submit">
          Submit
        </Button>
      </FormikResults>
    );
  });
