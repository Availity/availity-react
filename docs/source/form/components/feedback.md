---
title: <Feedback />
summary: Error message container for an input
---

## Example

```jsx live=true viewCode=true
import { Form, Input, Feedback as FormFeedback } from '@availity/form';

<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={() => ({})}
  validationSchema={yup.object().shape({
    hello: yup.string().required('Oops'),
  })}
>
  <FormGroup>
    <Label>Hello Field</Label>
    <Input name="hello" />
    <FormFeedback name="hello" />
  </FormGroup>
  <Button type="submit" color="primary">
    Submit
  </Button>
</Form>
```

## Props

### `name: string`

Name used to match the validation schema to the message.
