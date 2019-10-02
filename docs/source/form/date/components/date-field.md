---
title: <DateField />
---

The same as `FormikDate` but with a `Label` that appears above input and a `Feedback` that appears below the input.

## Example

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import FormikDate from '@availity/date';
import * as yup from 'yup';
import '@availity/yup/moment';

<div className="w-100 d-flex flex-row justify-content-around align-items-center">
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={values => console.log(values)}
    validationSchema={yup.object().shape({
      dateOfService: yup.date().required(),
    })}
  >
    <DateField
      label="Date of Service"
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

Extends [Date Props](/form/date/components/date/#props).

### `name: string`
The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback.

### `label?: string`
The text that renders inside the `Label` above the input.

### `labelClass?: string`
The name of the class for the label. Will be passed to the `className` prop of the label in the field.

### `labelHidden?: boolean`
Used to control if the label is displayed. When set to `true`, the label in the field won't be visible.

### `labelAttrs?: React.HTMLAttributes<HTMLLabelElement>`
Pass additonal attributes to the label