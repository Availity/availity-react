---
<<<<<<< HEAD
title: FormGroup
=======
title: <FormGroup />
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
summary: Wrapper for an Input field. Uses reactstrap FormGroup.
---

## Example

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
    <Label for='hello'>Hello Field</Label>
    <Input name="hello" />
  </FormGroup>
</Form>
```

## Props

### `for: string`
Used to match the wrapped input. Must be the same name given to the input field.