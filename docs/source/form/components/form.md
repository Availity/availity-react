---
title: Form
summary: Reactstrap Form component wrapped in Formik
---

## Example

```jsx live=true header=Form.js viewCode=true
import React from 'react';
import { Form, Field } from '@availity/form';

<Form
  initialValues={{
    hello: '',
  }}
  onSubmit={values => alert(JSON.stringify(values))}
  validationSchema={yup.object().shape({
    hello: yup.string().required(),
  })}
>
  <Field name="hello" type="text" label="Hello" />
</Form>
```

## Props

### `initialValues: Formik.Values`
Object of values to initialize the form components with by name.

### `onSubmit?: (values: Values, formikBag: FormikBag) => void`
Action to perform on submit.

### `...rest`

View full set of [Formik Form Props](https://jaredpalmer.com/formik/docs/api/formik#props)