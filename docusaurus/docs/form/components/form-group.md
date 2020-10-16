---
title: <FormGroup />
---Wrapper for an Input field. Uses reactstrap FormGroup.

### Example

```jsx live=true viewCode=true
<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={() => ({})}
  validationSchema={yup.object().shape({
    hello: yup.string().required(),
  })}
>
  <FormGroup for="hello">
    <Label for="hello">Hello Field</Label>
    <Input name="hello" />
  </FormGroup>
</Form>
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/formik-form--form-group"> Storybook</a>

### Props

#### `for: string`

Used to match the wrapped input. Must be the same name given to the input field.
