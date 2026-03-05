import React from 'react';
import { Meta } from '@storybook/react';
import { Label, Button } from 'reactstrap';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';

import { AvDate, AvDateField, AvDateRange, AvDateRangeField } from '..';
// import README from '../README.md';
import '../styles.scss';

// eslint-disable-next-line import/no-relative-packages
import AvFormResults from '../../../story-utils/AvFormResults';
import { AvDateFieldProps } from '../types/AvDateField';

const types = ['text', 'date'];
export default {
  title: 'Legacy Form Components/AvDate',
  component: AvDate,
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default = {
  render: ({ datepicker, disabled, max, min, required, type }: AvDateFieldProps) => (
    <AvFormResults>
      <AvDate
        name="standAlone"
        datepicker={datepicker}
        disabled={disabled}
        max={max}
        min={min}
        required={required}
        type={type}
      />
      <Button className="mt-3" color="primary">
        Submit
      </Button>
    </AvFormResults>
  ),
  args: {
    datepicker: true,
    disabled: false,
    max: '',
    min: '',
    required: true,
    type: 'text',
  },
  argTypes: {
    type: {
      type: 'select',
      options: types,
    },
  },
  name: 'default',
};

export const WithLabel = {
  render: ({ datepicker, disabled, errorMessage, label, max, min, required, type }) => (
    <AvFormResults>
      <AvGroup>
        <Label for="standAloneWithLabel">{label}</Label>
        <AvDate
          name="standAlone"
          datepicker={datepicker}
          disabled={disabled}
          max={max}
          min={min}
          required={required}
          type={type}
        />
        <AvFeedback>{errorMessage}</AvFeedback>
      </AvGroup>
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    datepicker: true,
    disabled: false,
    errorMessage: 'This field is invalid',
    label: 'AvDate Label',
    max: '',
    min: '',
    required: true,
    type: 'text',
  },
  argTypes: {
    type: {
      type: 'select',
      options: types,
    },
  },
  name: 'with label',
};

export const _AvDateField = {
  render: ({ datepicker, disabled, errorMessage, label, max, min, required, requiredErrorMessage, type }) => (
    <AvFormResults>
      <AvDateField
        name="AvDateField"
        datepicker={datepicker}
        disabled={disabled}
        errorMessage={errorMessage}
        label={label}
        max={max}
        min={min}
        required={required}
        type={type}
        distance={{
          max: {
            value: 90,
            units: 'days',
          },
        }}
        validate={{
          required: {
            value: required,
            errorMessage: required && requiredErrorMessage,
          },
        }}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  ),
  args: {
    datepicker: true,
    disabled: false,
    errorMessage: 'This field is invalid',
    label: 'Field Label',
    max: '',
    min: '',
    required: true,
    requiredErrorMessage: 'This field is required',
    type: 'text',
  },
  argTypes: {
    type: {
      type: 'select',
      options: types,
    },
  },
  name: 'AvDateField',
};

const distanceUnits = ['day', 'month'];
export const _AvDateRange = {
  render: ({
    autoSync,
    datepicker,
    defaultEndDate,
    defaultStartDate,
    disabled,
    errorMessage,
    maxDistance,
    maxDistanceUnits,
    minDistance,
    minDistanceUnits,
    ranges,
    required,
    requiredErrorMessage,
    type,
  }) => {
    const min = minDistance &&
      minDistanceUnits && {
        value: minDistance,
        units: minDistanceUnits,
      };
    const max = maxDistance &&
      maxDistanceUnits && {
        value: maxDistance,
        units: maxDistanceUnits,
      };
    const distance = (min || max) && { min, max };
    const baseStart = {
      name: 'date.start',
      value: undefined,
    };
    const baseEnd = {
      name: 'date.end',
      value: undefined,
    };
    if (defaultStartDate) {
      baseStart.value = defaultStartDate;
    }
    if (defaultEndDate) {
      baseEnd.value = defaultEndDate;
    }
    return (
      <AvFormResults>
        <AvDateRange
          name="AvDateRange"
          type={type}
          start={baseStart}
          end={baseEnd}
          min={min}
          max={max}
          required={required}
          disabled={disabled}
          autoSync={autoSync}
          distance={distance}
          ranges={ranges}
          errorMessage={errorMessage}
          validate={{
            required: {
              value: required,
              errorMessage: required && requiredErrorMessage,
            },
          }}
          datepicker={datepicker}
        />
        <Button color="primary">Submit</Button>
      </AvFormResults>
    );
  },
  args: {
    autoSync: true,
    datepicker: true,
    defaultEndDate: '2019-12-31',
    defaultStartDate: '2019-01-01',
    disabled: false,
    errorMessage: 'This field is invalid',
    maxDistance: 0,
    maxDistanceUnits: distanceUnits[0],
    minDistance: 0,
    minDistanceUnits: distanceUnits[0],
    ranges: true,
    required: true,
    requiredErrorMessage: 'This field is required',
    type: 'text',
  },
  argTypes: {
    maxDistanceUnits: {
      type: 'select',
      options: distanceUnits,
    },
    minDistanceUnits: {
      type: 'select',
      options: distanceUnits,
    },
    type: {
      type: 'select',
      options: types,
    },
  },
  name: 'AvDateRange',
};

export const _AvDateRangeField = {
  render: ({
    autoSync,
    datepicker,
    defaultEndDate,
    defaultStartDate,
    disabled,
    errorMessage,
    label,
    maxDistance,
    maxDistanceUnits,
    minDistance,
    minDistanceUnits,
    ranges,
    required,
    requiredErrorMessage,
    type,
  }) => {
    const min = minDistance &&
      minDistanceUnits && {
        value: minDistance,
        units: minDistanceUnits,
      };
    const max = maxDistance &&
      maxDistanceUnits && {
        value: maxDistance,
        units: maxDistanceUnits,
      };
    const distance = (min || max) && { min, max };
    const baseStart = {
      name: 'date.start',
      value: undefined,
    };
    const baseEnd = {
      name: 'date.end',
      value: undefined,
    };

    if (defaultStartDate) {
      baseStart.value = defaultStartDate;
    }
    if (defaultEndDate) {
      baseEnd.value = defaultEndDate;
    }

    return (
      <AvFormResults>
        <AvDateRangeField
          name="AvDateRange"
          label={label}
          type={type}
          start={baseStart}
          end={baseEnd}
          min={min}
          max={max}
          distance={distance}
          ranges={ranges}
          required={required}
          disabled={disabled}
          autoSync={autoSync}
          errorMessage={errorMessage}
          validate={{
            required: {
              value: required,
              errorMessage: required && requiredErrorMessage,
            },
          }}
          datepicker={datepicker}
        />
        <Button color="primary">Submit</Button>
      </AvFormResults>
    );
  },
  args: {
    autoSync: true,
    datepicker: true,
    defaultEndDate: '2019-12-31',
    defaultStartDate: '2019-01-01',
    disabled: false,
    errorMessage: 'This field is invalid',
    label: 'Date Range',
    maxDistance: 0,
    maxDistanceUnits: distanceUnits[0],
    minDistance: 0,
    minDistanceUnits: distanceUnits[0],
    ranges: true,
    required: true,
    requiredErrorMessage: 'This field is required',
    type: 'text',
  },
  argTypes: {
    maxDistanceUnits: {
      type: 'select',
      options: distanceUnits,
    },
    minDistanceUnits: {
      type: 'select',
      options: distanceUnits,
    },
    type: {
      type: 'select',
      options: types,
    },
  },
  name: 'AvDateRangeField',
};
