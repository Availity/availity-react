---
title: <SelectField />
---

The same as `Select` but with a `Label` that appears above the input and a `Feedback` that appears below the input.

## Example

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import { SelectField } from '@availity/select';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';

<Form
  initialValues={{
    justTheInput: undefined,
  }}
  onSubmit={values => window.alert(JSON.stringify(values))}
  validationSchema={yup.object().shape({
    justTheInput: yup.string().required('This field is required.'),
  })}
>
  <SelectField
    label="Just The Input"
    name="justTheInput"
    isMulti={false}
    options={[
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 },
    ]}
  />

  <Button className="mt-3" color="primary" type="submit">
    Submit
  </Button>
</Form>
```

## Props

Extends [Select Props](/form/select/components/select/#props).

### `name: string`
The name of the field and name of the HTML Input. Without this, no input will be rendered. Will be the key of the selected option(s) that come through in the values of the `onSubmit` callback of the form.

### `label?: ReactNode`
The label to render above the `Select` input.

### `labelHidden?: boolean`
Whether the `label` should be hidden.

### `labelClass?: string`
Class names to pass to the `Label`.

### `feedbackClass?: string`
Class names to pass to the `Feedback`.

### `groupClass?: string`
Class names to pass to the `FormGroup`.

## 508 Compliance

`<SelectField />` will automatically associate the `FormGroup` and `Label` based on its `name` prop, not an `id` prop. Using an `id` prop that is the same as `name` on this component will result in an orphaned form label and break 508 compliance.
