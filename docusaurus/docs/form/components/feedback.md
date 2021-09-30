---
title: <Feedback />
---

Error message container for an input

### Example

```jsx
import React from 'react';
import { Form, Input, Feedback as FormFeedback } from '@availity/form';

const Example = () => (
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
      <Input name="hello" feedback="true" />
      <FormFeedback name="hello" />
    </FormGroup>
    <Button type="submit" color="primary">
      Submit
    </Button>
  </Form>
);
```

### Props

#### `name: string`

Name used to match the validation schema to the message.
