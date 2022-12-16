/* eslint-disable no-console */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from 'reactstrap';
import { avDate, dateRange } from '@availity/yup';
import * as yup from 'yup';
import { unitOfTime } from 'moment';
import FormikDate from '../src/Date';
import DateField from '../src/DateField';
import DateRange from '../src/DateRange';
import { ArgsTable } from '@storybook/addon-docs';
import DateRangeField from '../src/DateRangeField';

// import README from '../README.md';

import FormikResults from '../../../story-utils/FormikResults';

type Units = unitOfTime.DurationConstructor;
const distanceUnits: Units[] = ['day', 'month'];

export default {
  title: 'Form Components/Date',
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
  },
} as Meta;

type DateStoryProps = {
  disabled: boolean;
  min: string;
  max: string;
  required: boolean;
};

export const DateInput: Story<DateStoryProps> = ({ disabled, max, min, required }) => (
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
    <FormikDate id="date" name="date" disabled={disabled} min={min} max={max} />
    <Button className="mt-3" color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
DateInput.storyName = 'date';

export const _DateField: Story<DateStoryProps & { label: string }> = ({ disabled, label, max, min, required }) => (
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
    <DateField id="date" name="date" label={label} required={required} disabled={disabled} min={min} max={max} />
    <Button className="ml-1" color="primary" type="submit">
      Submit
    </Button>
  </FormikResults>
);
_DateField.args = {
  label: 'Date Field',
};
_DateField.storyName = 'DateField';

type DateRangeStoryProps = {
  autoSync: boolean;
  maxDistance: number;
  maxDistanceUnits: Units;
  minDistance: number;
  minDistanceUnits: Units;
  ranges: boolean;
} & DateStoryProps;

export const _DateRange: Story<DateRangeStoryProps> = ({
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
);
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

export const _DateRangeField: Story<DateRangeStoryProps> = ({
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
);
_DateRangeField.args = {
  autoSync: false,
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

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Date Props</h5>
    <ArgsTable of={FormikDate} />
    <h4>Availity Props</h4>
    <h5>DateField Props</h5>
    <ArgsTable of={DateField} />
    <h4>Availity Props</h4>
    <h5>DateRange Props</h5>
    <ArgsTable of={DateRange} />
    <h4>Availity Props</h4>
    <h5>DateRangeField Props</h5>
    <ArgsTable of={DateRangeField} />
  </>
);
