/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import { avDate, dateRange } from '@availity/yup';
import * as yup from 'yup';
import moment from 'moment';

import FormikDate from '../src/Date';
import DateField from '../src/DateField';
import DateRange from '../src/DateRange';
import DateRangeField from '../src/DateRangeField';

import '../styles.scss';
// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';

const distanceUnits = ['day', 'month'];

export default {
  title: 'Form Components/Date',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    datepicker: true,
    disabled: false,
    max: '',
    min: '',
    required: true,
  },
} as Meta;

export const DateInput: Story = ({ datepicker, disabled, max, min, required }) => {
  const dateFormat = 'MM/DD/YYYY';
  const minDate = moment(min).format(dateFormat);
  const maxDate = moment(max).format(dateFormat);

  return (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        dateOfService: '',
      }}
      validationSchema={yup.object().shape({
        dateOfService: avDate({
          format: dateFormat,
        })
          .isRequired(required, 'This field is required.')
          .min(min && !max && minDate)
          .max(!min && max && maxDate)
          .between(min && max && minDate, maxDate),
      })}
    >
      <FormikDate
        id="dateOfService"
        name="dateOfService"
        disabled={disabled}
        datepicker={datepicker}
        min={min && minDate}
        max={max && maxDate}
      />

      <Button className="mt-3" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  );
};
DateInput.storyName = 'date';

export const _DateField: Story = ({ datepicker, disabled, helpId, label, max, min, required }) => {
  const dateFormat = 'MM/DD/YYYY';
  const minDate = moment(min).format(dateFormat);
  const maxDate = moment(max).format(dateFormat);
  const schema = yup.object().shape({
    dateOfService: avDate({
      format: dateFormat,
    })
      .isRequired(required, 'This field is required.')
      .min(min && !max && minDate)
      .max(!min && max && maxDate)
      .between(min && max && minDate, maxDate),
  });

  return (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        dateOfService: '',
      }}
      validationSchema={schema}
    >
      <DateField
        id="dateOfService"
        name="dateOfService"
        label={label}
        required={required}
        helpId={helpId}
        disabled={disabled}
        datepicker={datepicker}
        min={min && minDate}
        max={max && maxDate}
      />

      <Button className="ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  );
};
_DateField.args = {
  label: 'Date Field',
  helpId: '',
};
_DateField.storyName = 'DateField';

export const _DateRange: Story = ({
  autoSync,
  datepicker,
  disabled,
  max,
  maxDistance,
  maxDistanceUnits,
  min,
  minDistance,
  minDistanceUnits,
  ranges,
  required,
}) => {
  const dateFormat = 'MM/DD/YYYY';
  const minDate = moment(min).format(dateFormat);
  const maxDate = moment(max).format(dateFormat);

  return (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        dateOfService: '',
      }}
      validationSchema={yup.object().shape({
        dateOfService: dateRange({
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
      })}
    >
      <DateRange
        id="dateOfService"
        name="dateOfService"
        disabled={disabled}
        datepicker={datepicker}
        autoSync={autoSync}
        ranges={ranges}
        min={min && minDate}
        max={max && maxDate}
      />

      <Button className="mt-1 ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  );
};
_DateRange.args = {
  autoSync: false,
  maxDistance: 0,
  maxDistanceUnits: distanceUnits[0],
  minDistance: 0,
  minDistanceUnits: distanceUnits[0],
  ranges: false,
};
_DateRange.argTypes = {
  maxDistanceUnits: {
    options: distanceUnits,
  },
  minDistanceUnits: {
    options: distanceUnits,
  },
};
_DateRange.storyName = 'DateRange';

export const _DateRangeField: Story = ({
  autoSync,
  datepicker,
  disabled,
  helpId,
  max,
  maxDistance,
  maxDistanceUnits,
  min,
  minDistance,
  minDistanceUnits,
  ranges,
  required,
}) => {
  const dateFormat = 'YYYY-MM-DD';
  const minDate = moment(min).format(dateFormat);
  const maxDate = moment(max).format(dateFormat);

  return (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        dateOfService: {
          startDate: '',
          endDate: '',
        },
      }}
      validationSchema={yup.object().shape({
        dateOfService: dateRange({
          format: dateFormat,
        })
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
      })}
    >
      <DateRangeField
        id="dateOfService"
        name="dateOfService"
        label="Date of Service"
        disabled={disabled}
        required={required}
        helpId={helpId}
        datepicker={datepicker}
        autoSync={autoSync}
        ranges={ranges}
        format={dateFormat}
        min={min && minDate}
        max={max && maxDate}
      />
      <Button className="mt-1 ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  );
};
_DateRangeField.args = {
  autoSync: false,
  helpId: '',
  maxDistance: 0,
  maxDistanceUnits: distanceUnits[0],
  minDistance: 0,
  minDistanceUnits: distanceUnits[0],
  ranges: false,
};
_DateRangeField.argTypes = {
  maxDistanceUnits: {
    options: distanceUnits,
  },
  minDistanceUnits: {
    options: distanceUnits,
  },
};
_DateRangeField.storyName = 'DateRangeField';
