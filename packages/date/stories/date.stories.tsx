/* eslint-disable no-console */
import React from 'react';
import { StoryObj } from '@storybook/react';
import '../styles.scss';
import { Button } from 'reactstrap';
import { avDate, dateRange } from '@availity/yup';
import * as yup from 'yup';
import { unitOfTime } from 'moment';
import FormikDate from '../src/Date';
import DateField, { DateFieldProps } from '../src/DateField';
import DateRange, { DateRangeProps } from '../src/DateRange';
import DateRangeField, { DateRangeFieldProps } from '../src/DateRangeField';

// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';

type Units = unitOfTime.DurationConstructor;
const distanceUnits: Units[] = ['day', 'month'];

export default {
  title: 'Form Components/Date',
  component: FormikDate,
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    disabled: false,
    max: '',
    min: '',
    required: true,
    placeholder: 'mm/dd/yyyy',
  },
};

type DateStoryProps = {
  disabled: boolean;
  min: string;
  max: string;
  required: boolean;
  placeholder: string;
};

export const DateInput: StoryObj<typeof FormikDate> = {
  render: ({ disabled, max, min, required, placeholder }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        date: '',
      }}
      validationSchema={yup.object().shape({
        date: avDate()
          .min(min && !max ? min : '')
          .max(!min && max ? max : '')
          .between(min, max)
          .isRequired(required),
      })}
    >
      <FormikDate id="date" name="date" disabled={disabled} min={min} max={max} placeholder={placeholder} />
      <Button className="mt-3" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  ),
};

export const _DateField: StoryObj<typeof FormikDate> = {
  render: ({ disabled, label, max, min, required, placeholder }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        date: '',
      }}
      validationSchema={yup.object().shape({
        date: avDate()
          .min(min && !max ? min : '')
          .max(!min && max ? max : '')
          .between(min, max)
          .isRequired(required, label && `${label} is required.`),
      })}
    >
      <DateField
        id="date"
        name="date"
        label={label}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        placeholder={placeholder}
      />
      <Button className="ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  ),
  args: {
    label: 'Date Field',
  },
};

type DateRangeStoryProps = {
  autoSync: boolean;
  maxDistance: number;
  maxDistanceUnits: Units;
  minDistance: number;
  minDistanceUnits: Units;
  ranges: boolean;
} & DateStoryProps;

export const _DateRange: StoryObj<typeof FormikDate> = {
  render: ({
    autoSync,
    disabled,
    max,
    maxDistance,
    maxDistanceUnits,
    min,
    minDistance,
    minDistanceUnits,
    ranges,
    required,
  }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        dateRange: '',
      }}
      validationSchema={yup.object().shape({
        dateRange: dateRange({
          startKey: 'startDate',
          endKey: 'endDate',
        })
          .min(min && !max ? min : '')
          .max(!min && max ? max : '')
          .between(min, max)
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
        id="dateRange"
        name="dateRange"
        disabled={disabled}
        autoSync={autoSync}
        ranges={ranges}
        min={min}
        max={max}
      />
      <Button className="mt-1 ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  ),
  args: {
    autoSync: false,
    maxDistance: 0,
    maxDistanceUnits: distanceUnits[0],
    minDistance: 0,
    minDistanceUnits: distanceUnits[0],
    ranges: false,
  },
  argTypes: {
    maxDistanceUnits: {
      options: distanceUnits,
    },
    minDistanceUnits: {
      options: distanceUnits,
    },
  },
};

export const _DateRangeField: StoryObj<typeof FormikDate> = {
  render: ({
    autoSync,
    disabled,
    max,
    maxDistance,
    maxDistanceUnits,
    min,
    minDistance,
    minDistanceUnits,
    ranges,
    required,
  }) => (
    <FormikResults
      onSubmit={() => {
        console.log('submitted');
      }}
      initialValues={{
        dateRange: {
          startDate: '',
          endDate: '',
        },
      }}
      validationSchema={yup.object().shape({
        dateRange: dateRange()
          .min(min && !max ? min : '')
          .max(!min && max ? max : '')
          .between(min, max)
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
        id="dateRange"
        name="dateRange"
        label="Date of Service"
        disabled={disabled}
        required={required}
        autoSync={autoSync}
        ranges={ranges}
        min={min}
        max={max}
      />
      <Button className="mt-1 ml-1" color="primary" type="submit">
        Submit
      </Button>
    </FormikResults>
  ),
  args: {
    autoSync: false,
    maxDistance: 0,
    maxDistanceUnits: distanceUnits[0],
    minDistance: 0,
    minDistanceUnits: distanceUnits[0],
    ranges: false,
  },
  argTypes: {
    maxDistanceUnits: {
      options: distanceUnits,
    },
    minDistanceUnits: {
      options: distanceUnits,
    },
  },
};

export const hidden_DateField = (props: DateFieldProps) => <DateField {...props} />;
export const hidden_DateRange = (props: DateRangeProps) => <DateRange {...props} />;
export const hidden_DateRangeField = (props: DateRangeFieldProps) => <DateRangeField {...props} />;
