---
title: <DateRangeField />
---

The same as `DateRange` but with a `Label` that appears above the input and a `Feedback` that appears below the input.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { DateRangeField } from '@availity/date';
import '@availity/date/styles.scss';
import { Button } from 'reactstrap';
import { dateRange } from '@availity/yup';
import moment from 'moment';
import * as yup from 'yup';

const Example = () => (
  <Form
    initialValues={{
      dateOfService: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      },
    }}
    onSubmit={(values) => console.log(values)}
    validationSchema={yup.object().shape({
      dateOfService: dateRange(
        {
          min: moment().subtract(7, 'day').format('MM/DD/YYYY'),
          max: moment().add(7, 'day').format('MM/DD/YYYY'),
          format: 'MM/DD/YYYY',
        },
        `Date must be between ${moment()
          .subtract(7, 'day')
          .format('MM/DD/YYYY')} and ${moment()
          .add(7, 'day')
          .format('MM/DD/YYYY')}`
      )
        .typeError('This field is invalid.')
        .required('This field is required.'),
    })}
  >
    <DateRangeField
      id="dateOfService"
      label="Date of Service"
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

[Storybook](https://availity.github.io/availity-react/storybook/?path=/docs/form-components-date--date-range-field)

### Props

Extends [DateRange Props](/form/date/components/date-range#props).

#### `name: string`

The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback.

#### `label?: string`

The text that renders inside the `Label` above the input.

#### `labelClass?: string`

The name of the class for the label. Will be passed to the `className` prop of the label in the field.

#### `labelHidden?: boolean`

Used to control if the label is displayed. When set to `true`, the label in the field won't be visible.

#### `labelAttrs?: React.HTMLAttributes<HTMLLabelElement>`

Pass additional attributes to the label

#### `helpId?: string`

Help topic id, adds `<FieldHelpIcon/>` next to the label (should not be within label for accessibility).

#### `required?: boolean`

Will add `<RequiredAsterisk />` to label.
