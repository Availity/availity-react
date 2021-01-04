---
title: <Input />
---

Basic Input field that utilizes the Form validation

### Example

```jsx
import React from 'react';
import { Form, Input } from '@availity/form';
import { Button } from 'reacstrap';
import * as yup from 'yup';

const Example = () => (
  <Form
    initialValues={{
      hello: '',
    }}
    onSubmit={(values) => alert(JSON.stringify(values))}
    validationSchema={yup.object({
      hello: yup.string().required(),
    })}
    className="d-flex"
  >
    <Input name="hello" placeholder="Say Hello..." />
    <Button type="submit" className="ml-1" color="primary">
      Submit
    </Button>
  </Form>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/formik-form--input"> Storybook</a>

### Props

#### `name: string`

Identifies the field and matches the validation

#### `tag?: React.ComponentType | string`

The Node or tag to substitute as the input field. Default is reactstrap `Input` tag.
