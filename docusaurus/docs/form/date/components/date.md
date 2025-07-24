---
title: <Date />
---

Date picker without a `Label` or `Feedback`

If `initialValues` need to be specified for a Date or DateRange, they should be in the format `"YYYY-MM-DD"` or `moment().format("YYYY-MM-DD")`, even though dates are displayed to the user as `MM/DD/YYYY`

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { avDate } from '@availity/yup';
import { Button } from 'reactstrap';
import Date from '@availity/date';
import '@availity/date/styles.scss';
import moment from 'moment';
import * as yup from 'yup';

const Example = () => (
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={(values) => console.log(values)}
    validationSchema={yup.object().shape({
      dateOfService: avDate().required(),
    })}
  >
    <Date
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

#### Live example

[Storybook](https://availity.github.io/availity-react/storybook/?path=/docs/bootstrap-components-date--date-input)

### Props

See [react-dates](https://github.com/airbnb/react-dates#singledatepicker) for additional props

#### `name: string`

The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback.

#### `disabled?: boolean`

Whether the date is disabled.

#### `min?: string | LimitType`

Used in conjunction with `max` to derive `isOutsideRange` prop from `react-dates` and selectable year options in datepicker. Dates outside the allowed range will not be clickable in datepicker.

```json hideCopy=true
{
  // LimitType
  "value": "12",
  "units": "day"
}
```

#### `max?: string | LimitType`

Used in conjunction with `min` to derive `isOutsideRange` prop from `react-dates` and selectable year options in datepicker. Dates outside the allowed range will not be clickable in datepicker.

```json hideCopy=true
{
  // LimitType
  "value": "12",
  "units": "day"
}
```

#### `onPickerFocusChange?: ({ focused: boolean }) => void`

Function to be run when focus on the input changes.

#### `format?: string`

How to format date value in `onSubmit` callback. Must be a format recognized by [moment](https://momentjs.com/docs/#/displaying/format/). **Default: `MM/DD/YYYY`**

#### `datePickerProps?: SingleDatePickerShape`

Props to be spread onto the datepicker component from [react-dates](https://github.com/airbnb/react-dates#singledatepicker).

#### `openDirection?: string`

Set which direction the date picker renders. Possible values are `up` and `down`. Default: `down`

### Yup Validation

:::info
When the existence of `Date` component's field value is used with something like `yup.when()` to help validate another field in the schema, you cannot depend on the truthiness of that field value alone. A `Date` field that has had a value erased does not return to its `initialValue`, instead it is now a `moment` object that will pass a truthy check. Your conditional validation should take this into account.
:::
