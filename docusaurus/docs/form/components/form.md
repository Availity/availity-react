---
title: <Form />
---

Reactstrap Form component wrapped in Formik

### Example

```jsx
import React from 'react';
import { Form, Field } from '@availity/form';

const Example = () => (
  <Form
    initialValues={{
      hello: '',
    }}
    onSubmit={(values) => alert(JSON.stringify(values))}
    validationSchema={yup.object().shape({
      hello: yup.string().required(),
    })}
  >
    <Field name="hello" type="text" label="Hello" />
  </Form>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/formik-form--default"> Storybook</a>

### Props

#### `initialValues: Formik.Values`

Object of values to initialize the form components with by name.

#### `onSubmit?: (values: Values, formikBag: FormikBag) => void`

Action to perform on submit.

#### `focusOnErrors: boolean`

Determines whether invalid submission focuses first invalid field for accessibility. **Default:** true

#### `...rest`

View full set of [Formik Form Props](https://jaredpalmer.com/formik/docs/api/formik#props)
