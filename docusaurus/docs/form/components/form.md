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

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-form--default)

### Props

#### `initialValues: Formik.Values`

Object of values to initialize the form components with by name.

#### `onSubmit?: (values: Values, formikBag: FormikBag) => void`

Action to perform on submit.

#### `focusInvalidField: boolean`

Determines whether invalid submission focuses first invalid field. **Default:** true

#### `invalidInputSelectors: string`

CSS selectors used to find first invalid field within form for focus. **Default:** 'input[aria-invalid="true"], div.is-invalid input:first-of-type:not([hidden]):not([style*="display:none"]):not([style*="display: none"])'

#### `...rest`

View full set of [Formik Form Props](https://jaredpalmer.com/formik/docs/api/formik#props)
