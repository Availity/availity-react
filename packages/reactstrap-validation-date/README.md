# @availity/reactstrap-validation-date

> Wrapper for react-date-range to work with availity-reactstrap-validation.

[![Version](https://img.shields.io/npm/v/@availity/reactstrap-validation-date.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/reactstrap-validation-date)
[![NPM Downloads](https://img.shields.io/npm/dt/@availity/reactstrap-validation-date.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/reactstrap-validation-date)
[![Dependecy Status](https://img.shields.io/librariesio/release/npm/@availity/reactstrap-validation-date?style=for-the-badge)](https://github.com/Availity/availity-react/blob/master/packages/reactstrap-validation-date/package.json)

## Installation

### NPM

```bash
npm install @availity/reactstrap-validation-date availity-reactstrap-validation reactstrap --save
```

### Yarn

```bash
yarn add @availity/reactstrap-validation-date availity-reactstrap-validation reactstrap
```

### Usage

```js
import React from 'react';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import AvDate, { AvDateField, AvDateRange, AvDateRangeField } from '@availity/reactstrap-validation-date';
import '@availity/reactstrap-validation-date/styles.scss';

const Example = () => (
  <AvForm>
    <AvGroup>
      <Label for="justTheDate">My Input Label</Label>
      <AvDate name="justTheDate" required />
      <AvFeedback>Some error message</AvFeedback>
    </AvGroup>

    <AvDateField name="fieldWithLabel" label="Label Made For Me" required />

    <AvGroup>
      <Label for="justTheDateRange">My Input Label</Label>
      <AvDateRange name="justTheDateRange" required ranges />
      <AvFeedback>Some error message</AvFeedback>
    </AvGroup>

    <AvDateField name="DateRangeWithLabel" label="Label Made For Me" required />
  </AvForm>
);
```

Note: the input callbacks (e.g. onChange) do not get called with an event like other reactstrap-validation component; just the value of the field. This is because the underlying date picker does not return the event in it's callbacks.

### AvDate (Default export)

This is the underlying date without the `AvGroup`, `Label` or `AvFeedback`

#### AvDate Props

See availity-reactstrap-validation for additional props, such as `name`, `validate`, `min`, `max`, and more.

- **`min`**: string. Optional. Minimum date to allow the datepicker and input to take. You can either pass the `min` here or in the `validate` object if you want a custom error message with it.
- **`max`**: string. Optional. Max date to allow the datepicker and input to take. You can either pass the `max` here or in the `validate` object if you want a custom error message with it.

#### AvDate Example usage

```js
import React from 'react';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import AvDate from '@availity/reactstrap-validation-date';

const Example = () => (
  <AvForm>
    <AvGroup>
      <Label for="justFieldAndPicker">My Input Label</Label>
      <AvDate name="justFieldAndPicker" required />
      <AvFeedback>Some error message</AvFeedback>
    </AvGroup>
  </AvForm>
);
```

### AvDateField

Like `AvField`, but for dates with a date picker

#### AvDateField Props

See availity-reactstrap-validation for additional props, such as `name`, `validate`, `min`, `max`, and more.

- **`min`**: string. Optional. Minimum date to allow the datepicker and input to take. You can either pass the `min` here or in the `validate` object if you want a custom error message with it.
- **`max`**: string. Optional. Max date to allow the datepicker and input to take. You can either pass the `max` here or in the `validate` object if you want a custom error message with it.

#### AvDateField Example usage

```js
import React from 'react';
import { AvDateField } from '@availity/reactstrap-validation-date';

const Example = () => (
  <AvForm>
    <AvDateField name="fieldWithLabel" label="Label Made For Me" required />
  </AvForm>
);
```

### AvDateRange

A date range, consists of 2 fields, a start date and an end date.
This is the underlying date-range without the `AvGroup`, `Label` or `AvFeedback`.

#### AvDateRange Props

See availity-reactstrap-validation for additional props, such as `name`, `validate`, `min`, `max`, and more.

- **`start`**: Object. Required. and object which will be spread on the start date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
- **`end`**: Object. Required. and object which will be spread on the end date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
- **`distance`**: Object. Optional. Object containing the `min` and `max` distance the start and end dates are allowed to be apart from each other. See example below.
- **`min`**: string. Optional. Minimum date to allow the datepicker and input to take. You can either pass the `min` here or in the `validate` object if you want a custom error message with it.
- **`max`**: string. Optional. Max date to allow the datepicker and input to take. You can either pass the `max` here or in the `validate` object if you want a custom error message with it.
- **`ranges`**: object, boolean, array. Optional. Renders list of ranges preset to the left of the calendar
  - boolean - `true` will render the [default ranges](./src/AvDateRange.js#L19-L45)
  - array<string> - Will pick only the selected date ranges by name. See above default ranges for list of names. ex. ["Today"]
  - object - list or object of ranges. structure is noted below
- **`autoSync`**: boolean. Optional. Toggle whether the other date should be automatically synced to the selected date when focus changes. Dates are only auto synced the first time the input is touched and if the date field to auto sync is empty

```js
{
    'Tomorrow': {
        startDate: now => now.add(1,'day'),
        endDate: now => now.add(1,'day')
    }
}
```

#### AvDateRange Example usage

```js
import React from 'react';
import AvApi from '@availity/api-axios';
import { AvResourceDate } from '@availity/reactstrap-validation-date';
import '@availity/reactstrap-validation-date/styles.scss';

const avCustomResource = new AvApi({ name: 'my-custom-resource' });

const Example = () => (
  <AvForm>
    <AvDateRange
      start={{ name: 'date.start' }}
      end={{ name: 'date.end' }}
      resource={avCustomResource}
      distance={{
        min: {
          value: 3,
          units: 'days',
        },
        max: {
          value: 1,
          units: 'month',
        },
      }}
      ranges={{
        'Last 10 Days': {
          startDate: (now) => now.add(-9, 'd'),
          endDate: (now) => now,
        },
        'Last 20 Days': {
          startDate: (now) => now.add(-19, 'd'),
          endDate: (now) => now,
        },
        Tomorrow: {
          startDate: (now) => now.add(1, 'd'),
          endDate: (now) => now.add(1, 'd'),
        },
      }}
      required
    />
  </AvForm>
);
```

### AvDateRangeField

Like `AvField`, but for a date range with a date range picker

#### AvDateRangeField Props

See availity-reactstrap-validation for additional props, such as `name`, `label`, `validate`, `min`, `max`, and more.

- **`start`**: Object. Required. and object which will be spread on the start date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
- **`end`**: Object. Required. and object which will be spread on the end date input. It must contain the `name` prop as required by availity-reactstrap-validation. It can contain additional validations as well.
- **`distance`**: Object. Optional. Object containing the `min` and `max` distance the start and end dates are allowed to be apart from each other. See example below. Note that these values are relative to today's date, not the min/max props.
- **`defaultValues`**: Object. Optional. Object containing the `start` and `end`, the prefilled start and end dates. See example below. Note that these values are relative to today's date, not the min/max props.
- **`min`**: string. Optional. Minimum date to allow the datepicker and input to take. You can either pass the `min` here or in the `validate` object if you want a custom error message with it.
- **`max`**: string. Optional. Max date to allow the datepicker and input to take. You can either pass the `max` here or in the `validate` object if you want a custom error message with it.
- **`autoSync`**: boolean. Optional. Toggle whether the other date should be automatically synced to the selected date when focus changes. Dates are only auto synced the first time the input is touched and if the date field to auto sync is empty

Make sure to import the SCSS as well!

#### AvDateRangeField Example usage

```js
import React from 'react';
import { AvDateRangeField } from '@availity/reactstrap-validation-date';
import { AvForm } from 'availity-reactstrap-validation';
import '@availity/reactstrap-validation-date/styles.scss';

const Example = () => (
  <AvForm>
    <AvDateRangeField
      name="dateRange" //required
      start={{ name: 'date.start' }}
      end={{ name: 'date.end' }}
      ranges
    />
  </AvForm>
);
```

#### AvDateRangeField Comprehensive Example

This example contains Min/Max dates, default values, and distance requirements for the selected dates.

```js
import React from 'react';
import moment from 'moment';
import { AvDateRangeField } from '@availity/reactstrap-validation-date';
import { AvForm } from 'availity-reactstrap-validation';
import '@availity/reactstrap-validation-date/styles.scss';

// set max date to 5 days before today
const maxDate = moment();
maxDate.dayOfYear(maxDate.dayOfYear() - 5);
const maxDateString = maxDate.format('YYYY-MM-DD');

const Example = () => (
  <AvForm>
    <AvDateRangeField
      name="dateRange" //required
      label="Dates of Service"
      min="2019-01-01"
      max={maxDateString}
      start={{ name: 'date.start' }}
      end={{ name: 'date.end' }}
      distance={{
        min: {
          value: 2,
          units: 'days',
        },
        max: {
          value: 1,
          units: 'month',
        },
      }}
      defaultValues={{
        start: {
          value: -14,
          units: 'days',
        },
        end: {
          value: -7,
          units: 'days',
        },
      }}
      required
    />
  </AvForm>
);
```
