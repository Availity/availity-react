---
title: <Checkbox />
summary: Inputs of type checkbox. Checkboxes should be wrapped in a CheckboxGroup.
---

## Example

```jsx live=true viewCode=true
<Form
  initialValues={{
    hello: [],
  }}
  onSubmit={() => {}}
  validationSchema={yup.object().shape({
    hello: yup.array().required('At least one checkbox is required'),
  })}
>
  <CheckboxGroup name="hello" label="Checkbox Group">
    <Checkbox label="Check One" value="uno" />
    <Checkbox label="Check Two" value="dos" />
    <Checkbox label="Check Three" value="tres" />
  </CheckboxGroup>
  <Button type="submit" color="primary">Submit</Button>
</Form>
```

## Props

### `id?: string`
Should match `<CheckboxGroup />` name for validation.

### `label?: ReactNode`
Label for the checkbox.

### `value?: string`
Value of the checkbox.

### `disabled?: boolean`
Disables the checkbox.