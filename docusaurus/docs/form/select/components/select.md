---
title: <Select />
---

Select dropdown without a Label or Feedback

### Additional Resources

- `SelectStyles(showError, styles, isInline)`
  - Extract styling of this component for cases when react-select is used directly.
  - Returns style and theme object to be spread on Select
  - Props
    - `showError?: boolean` if error styling should be applied
    - `styles?: css object` same as react-select styles prop
    - `isInline?: boolean` if inline styling should be applied, must be within a flexbox.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import Select, { SelectField } from '@availity/select';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';

const Example = () => (
  <Form
    initialValues={{
      justTheInput: undefined,
    }}
    onSubmit={(values) => window.alert(JSON.stringify(values))}
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
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-select--default)

### Props

See [react-select](https://github.com/JedWatson/react-select) and [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate) for additional props.

#### `name: string`

The name of the field. Will be the key of the selected option(s) that come through in the values of the `onSubmit` callback of the form.

### `options: object[]`

Array of options that populate the select menu. Grouped options are also supported, but must include the property `type: 'group'`.

```js
const groupedOptions = [
  {
    label: 'options',
    options: [
      { label: 'Option 1', value: 'value for option 1' },
      { label: 'Option 2', value: 'value for option 2' },
      { label: 'Option 3', value: 'value for option 3' },
      { label: 'Option 4', value: 'value for option 4' },
    ],
    type: 'group',
  },
];
```

### `raw?: boolean`

If `true`, the entire object of the selected value is returned as the value instead of the value for the `valueKey` within the object.

#### `valueKey?: string`

The key of the value to return when selected. **Default:** `"value"`

#### `labelKey?: string`

The key of the label to render in the dropdown for the user to see. **Default:** `"label"`

#### `helpMessage?: string`

Adds hidden help message to placeholder so it is read with `aria-describedby` (should match visible help message).

#### `feedback?: boolean`

Will add default `<Feedback />` id to `aria-errormessage`.

#### `required?: boolean`

Will add `aria-required` to input.

#### `maxLength?: number`

The maximum number of options that can be selected ( when `isMulti` is `true`)

#### `selectRef?: Ref`

Ref passed to `react-select-async-paginate` component if in async mode.

#### `createable?: boolean`

Allow new items to be created if not found. **Default:** `false`.

#### `allowSelectAll?: boolean`

Adds a `Select all` option ( when `isMulti` is `true`). Note: `allowSelectAll` is ignored when `loadOptions` is defined.

#### `clearButtonClassName?: string`

Class names to add to clear button (only available when `isMulti` or `isClearable`). **Default:** `btn btn-link link`

### `waitUntilFocused?: boolean`

When true, the network request is not made until the dropdown has been focused. Defaults to `false`.

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
