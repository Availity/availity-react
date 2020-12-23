---
title: <Radio />
---

Inputs of type radio. Radios should be wrapped in a RadioGroup.

### Example

```jsx live=true viewCode=true
<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={() => {}}
  validationSchema={yup.object().shape({
    hello: yup.string().required('This field is required'),
  })}
>
  <RadioGroup name="hello" label="Radio Group">
    <Radio label="Radio One" value="uno" />
    <Radio label="Radio Two" value="dos" />
    <Radio label="Radio Three" value="tres" />
  </RadioGroup>
  <Button type="submit">Submit</Button>
</Form>
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/formik-form--radio"> Storybook</a>

### Props

#### `id?: string`

Should match `<RadioGroup />` name for validation.

#### `label?: ReactNode`

Label for the checkbox.

#### `value?: string`

Value of the checkbox.

#### `disabled?: boolean`

Disables the checkbox.

#### `inline?: boolean`

Will render the checkbox inline with other checkboxes.
