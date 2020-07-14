---
<<<<<<< HEAD
title: Feedback
=======
title: <Feedback />
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
