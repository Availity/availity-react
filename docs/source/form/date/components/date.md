---
title: <Date /> ( Default Export )
---

Date picker without a `Label` or `Feedback`

## Example

import '@availity/date/styles.scss';

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import { Button } from 'reactstrap';
import Date from '@availity/date';

import * as yup from 'yup';
import '@availity/yup';
import '@availity/yup/moment';
import moment from 'moment';

<div className="w-100 d-flex flex-row justify-content-around align-items-center">
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={values => console.log(values)}
    validationSchema={yup.object().shape({
      dateOfService: yup.avDate().required(),
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
</div>;
```

## Props

See [react-dates](https://github.com/airbnb/react-dates#singledatepicker) for additional props

### `name: string`

The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback.

### `disabled?: boolean`

Whether the date is disabled.

### `min?: string | LimitType`

Used in conjunction with `max` to derive `isOutsideRange` prop from `react-dates`. Dates outside the allowed range will not be clickable in datepicker.

```json hideCopy=true
{
  // LimitType
  "value": "12",
  "units": "day"
}
```

### `max?: string | LimitType`

Used in conjunction with `min` to derive `isOutsideRange` prop from `react-dates`. Dates outside the allowed range will not be clickable in datepicker.

```json hideCopy=true
{
  // LimitType
  "value": "12",
  "units": "day"
}
```

### `calendarIcon?: ReactNode`

Override the default icon that appears. Default: `<Icon name="calendar" />

### `onPickerFocusChange?: ({ focused: boolean }) => void`

Function to be run when focus on the input changes.

### `format?: string`

How to format date value in `onSubmit` callback. Must be a format recognized by [moment](https://momentjs.com/docs/#/displaying/format/). **Default: `MM/DD/YYYY`**

### `datepicker?: boolean`

Toggle whether the calendar is shown.

### `datePickerProps?: SingleDatePickerShape`

Props to be spread onto the datepicker component from [react-dates](https://github.com/airbnb/react-dates#singledatepicker).
