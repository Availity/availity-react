---
title: <Select /> ( Default Export )
summary: Select dropdown without a Label or Feedback
---

## Example

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import Select, { SelectField } from '@availity/select';
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
  <Select
    id="justTheInput"
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
</Form>;
```

## Props

See [react-select](https://github.com/JedWatson/react-select) and [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate) for additional props.

### `name: string`

The name of the field. Will be the key of the selected option(s) that come through in the values of the `onSubmit` callback of the form.

### `raw?: boolean`

If `true`, the entire object of the selected value is returned as the value instead of the value for the `valueKey` within the object.

### `valueKey?: string`

The key of the value to return when selected. **Default:** `"value"`

### `labelKey?: string`

The key of the label to render in the dropdown for the user to see. **Default:** `"label"`

### `maxLength?: number`

The maximum number of options that can be selected ( when `isMulti` is `true`)

### `selectRef?: Ref`

Ref passed to `react-select-async-paginate` component if in async mode.

### `createable?: boolean`

Allow new items to be created if not found. **Default:** `false`.

### `allowSelectAll?: boolean`

Adds a `Select all` option ( when `isMulti` is `true`).

### `autofill?: boolean | AutoFillType`

If `true`, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the new value are auto-filled. In order for a field to be auto-filled, the `name` property on the field _must_ match the key inside the new value.

For example, if the new value is `{ "payer": "Availity" }`, in order for the payer input in the form to be auto-filled to "Availity", the `name` prop on the input must be "payer".

If `autofill` is an object, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the keys in the `autofill` prop will be auto-filled.

When `autofill` is an object, the values in the object can be a string or a function. When a string, the key in the `autofill` prop gets auto-filled to that path on the selected option. When a function, it gets called with the selected option, and the key in the `autofill` prop gets auto-filled to the return value of the function.

For example, if the new value is `{ "payer": { "name": "Availity", "id": "1" } }`, in order for the "payerName", "payerId", and "payerNameAndId" inputs to be auto-filled to "Availity", "1", and "1 - Availity" respectively, the `autofill` prop should be:

```js
{
  payerName: 'payer.name',
  payerId: 'payer.id',
  payerNameAndId: opt => `${opt.payer.id} - ${opt.payer.name}`,
}
```
