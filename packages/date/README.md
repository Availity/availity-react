# @availity/date

> Wrapper for [react-dates](https://github.com/airbnb/react-dates) to work with [formik](https://github.com/jaredpalmer/formik)

## Installation

```bash
npm install @availity/date @availity/form formik react reactstrap --save
```

## Validation

See [yup](https://github.com/jquense/yup) and [@availity/yup](https://github.com/Availity/sdk-js/tree/master/packages/yup). Note to use this package with `@availity/yup` you will need to import the `moment` version as noted in the example below.

### FormikDate (Default Export)

Date picker without a `Label` or `Feedback`

#### FormikDate Usage

```javascript
import React from 'react';
import { Form } from '@availity/form';
import FormikDate from '@availity/date';
import * as yup from 'yup';
import '@availity/yup/moment';

// ...
const schema = yup.object().shape({
  dateOfService: yup
    .required()
    .date('This field is invalid.')
    .format('MM/DD/YYYY', true),
});

return (
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={values => apiResource.submit(values)}
    validationSchema={schema}
  >
    <FormikDate
      id="dateOfService"
      name="dateOfService"
      min={{ value: 7, units: 'day' }}
      max={{ value: 7, units: 'day' }}
    />

    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### FormikDate Props

See [react-dates](https://github.com/airbnb/react-dates#singledatepicker) for additional props

*   **`name`**: String. Required. The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback.
*   **`disabled`**: Boolean. Whether the `<FormikDate />` is disabled
*   **`className`**: Additional styles to be added to the `<FormikDate />`
*   **`min`**: limitPropType. Optional. See [limitPropType](./src/utils'). Used in conjunction with `max` to derive `isOutsideRange` prop from `react-dates`. Dates outside the allowed range will not be clickable in datepicker.
*   **`max`**: limitPropType. Optional. See [limitPropType](./src/utils'). Used in conjunction with `min` to derive `isOutsideRange` prop from `react-dates`. Dates outside the allowed range will not be clickable in datepicker.
*   **`calendarIcon`**: Node. Optional. Default: `<Icon name="calendar" />`. Override the default icon that appears
*   **`onChange`**: Function. Optional. Function to be run when date is chosen. Selected value is passed to function in format: `{ value }` 
*   **`onPickerFocusChange`**: Function. Optional. Function to be run when focus on the input changes. Value is passed to function in format `{ focused }`
*   **`innerRef`**: Function or Node. Optional. Ref passed to `<Input />` inside of `<FormikDate />`.
*   **`format`**: String. Optional. Default: `MM/DD/YYYY`. How to format date value in `onSubmit` callback. Must be a format recognized by [moment](https://momentjs.com/docs/#/displaying/format/)
*   **`data-testid`**: String. Optional. Useful for writing unit tests with [@testing-library/react](https://github.com/testing-library/react-testing-library)

### DateField

The same as `FormikDate` but with a `Label` that appears above input and a `Feedback` that appears below the input.

#### DateField Usage

```javascript
import React from 'react';
import { Form } from '@availity/form';
import { DateField } from '@availity/date';
import * as yup from 'yup';
import '@availity/yup';

// ...
const schema = yup.object().shape({
  dateOfService: yup
    .required()
    .date('This field is invalid.')
    .format('MM/DD/YYYY', true),
});

return (
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={values => apiResource.submit(values)}
    validationSchema={schema}
  >
    <DateField
      id="dateOfService"
      name="dateOfService"
      min={{ value: 7, units: 'day' }}
      max={{ value: 7, units: 'day' }}
    />

    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### DateField Props

Same as `FormikDate`, except for an additional `label` prop:

*   **`label`**: String. Optional. The text that renders inside the `Label` above the input.

### DateRange

A date range, consisting of 2 fields, a start date and an end date, without a `Label` or `Feedback`

#### DateRange Usage

```javascript
import React from 'react';
import { Form } from '@availity/form';
import { DateRange } from '@availity/date';
import * as yup from 'yup';
import '@availity/yup';

// ...
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
    .dateRange(
      { min: minDate, max: maxDate, format: dateFormat },
      `Date must be between ${minDate} and ${maxDate}`
    ),
});

return (
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={values => apiResource.submit(values)}
    validationSchema={schema}
  >
    <DateRange
      id="dateOfService"
      name="dateOfService"
      min={{ value: 7, units: 'day' }}
      max={{ value: 7, units: 'day' }}
    />

    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### DateRange Props

*   **`id`**: String. Required. The id of the field.
*   **`name`**: String. Required. The name of the field. Will be the key of the selected dates that come through in the values of the `onSubmit` callback.
*   **`min`**: limitPropType. Optional. See [limitPropType](./src/utils'). Used in conjunction with `max` to derive `isOutsideRange` prop from `react-dates`. Dates outside the allowed range will not be clickable in datepicker.
*   **`max`**: limitPropType. Optional. See [limitPropType](./src/utils'). Used in conjunction with `min` to derive `isOutsideRange` prop from `react-dates`. Dates outside the allowed range will not be clickable in datepicker.
*   **`className`**: Additional styles to be added to the `<DateRange />`
*   **`disabled`**: Boolean. Whether the `<DateRange />` is disabled
*   **`onChange`**: Function. Optional. Function to be run when date is chosen. Selected value is passed to function in format: `{ value }` 
*   **`onPickerFocusChange`**: Function. Optional. Function to be run when focus on the input changes. Value is passed to function in format `{ focusedInput }`
*   **`calendarIcon`**: Node. Optional. Default: `<Icon name="calendar" />`. Override the default icon that appears
*   **`innerRef`**: Function or Node. Optional. Ref passed to `<Input />` inside of `<FormikDate />`.
*   **`format`**: String. Optional. Default: `MM/DD/YYYY`. How to format date value in `onSubmit` callback. Must be a format recognized by [moment](https://momentjs.com/docs/#/displaying/format/)
*   **`data-testid`**: String. Optional. Useful for writing unit tests with [@testing-library/react](https://github.com/testing-library/react-testing-library)
*   **`startKey`**: String. Optional. Key to return start date as on form submit. Should match the yup schema `startKey`. Default `startDate`
*   **`endKey`**: String. Optional. Key to return end date as on form submit. Should match the yup schema `endKey`. Default `endDate`

### DateRangeField

The same as `DateRange` but with a `Label` that appears above the input and a `Feedback` that appears below the input.

#### DateRangeField Usage

```javascript
import React from 'react';
import { Form } from '@availity/form';
import { DateRangeField } from '@availity/date';
import * as yup from 'yup';
import '@availity/yup';

// ...
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
    .dateRange(
      { min: minDate, max: maxDate, format: dateFormat },
      `Date must be between ${minDate} and ${maxDate}`
    ),
});

return (
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={values => apiResource.submit(values)}
    validationSchema={schema}
  >
    <DateRangeField
      id="dateOfService"
      name="dateOfService"
      min={{ value: 7, units: 'day' }}
      max={{ value: 7, units: 'day' }}
    />

    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### DateRangeField Props

Same as `DateRange`, except for an additional `label` prop:

*   **`label`**: String. Optional. The text that renders inside the `Label` above the input.
