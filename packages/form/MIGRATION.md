# Migrating from `availity-reactstrap-validation` to `@availity/form`

The primary difference in developing with `availity-reactstrap-validation` and `@availity/form` is validation. With `availity-reactstrap-validation`, we define validation schemas on the input components in the form with the `validate` prop, like so:

```jsx
import { AvInput, AvForm } from 'availity-reactstrap-validation';

// ...
<AvForm>
  <AvInput
    name="myInput"
    type="text"
    validate={{
      required: {
        value: true,
        errorMessage: 'This field is required.',
      },
    }}
  />
</AvForm>
// ...
```

Note: `availity-reactstrap-validation` also has a `required` prop that acts as a shorthand for required validation using the `validate` prop. The code snippet above is equivalent to:

```jsx
import { AvInput, AvForm } from 'availity-reactstrap-validation';

// ...
<AvForm>
  <AvInput
    name="myInput"
    type="text"
    required
  />
</AvForm>
// ...
```

With `@availity/form`, we use `yup` and `@availity/yup` to define the validation schema for all of the inputs in the form on the `<Form />` component with the `validationSchema` prop from [formik](https://jaredpalmer.com/formik/docs/guides/validation#validationschema), like so:

```jsx
import { Input, Form } from '@availity/form';

// ...
<Form
  initialValues={{ myInput: '' }}
  validationSchema={yup.object().shape({ myInput: yup.string().isRequired(true, 'This field is required.') })}
>
  <Input name="myInput" type="text" />
</Form>
// ...
```

Another key difference is we define the initial state of the inputs in the form with the `initialValues` prop from [formik](https://jaredpalmer.com/formik/docs/api/formik#initialvalues-values) on the `<Form />` component.

## Form with `availity-reactstrap-validation`

```jsx
import { AvField, AvForm } from 'availity-reactstrap-validation';
import '@availity/yup';
import * as yup from 'yup';

// ...
<AvForm onValidSubmit={() => {}}>
  <AvField
    name="memberId"
    type="text"
    label="Member ID"
    validate={{
      pattern: { value: '\d{8}', errorMessage: 'Member ID must be 8 digits' },
      required: {
        value: true,
        errorMessage: 'This Field is Required.',
      },
    }}
  />
  <AvField
    name="zipCode"
    type="text"
    label="Zip Code"
    validate={{
      pattern: {
        value: '^\d{5}(?:-\d{4})?$',
        errorMessage: 'Valid Zip Code Formats: 12345 or 12345-6789'
      },
      required: {
        value: true,
        errorMessage: 'This Field is Required.',
      },
    }}
  />
</AvForm>
// ...
```

## Equivalent Form with `@availity/form`

```jsx
import { Field, Form } from '@availity/form';
import '@availity/yup';
import * as yup from 'yup';

// ...
<Form
  onSubmit={() => {}}
  initialValues={{
    memberId: '',
    zipCode: '',
  }}
  validationSchema={yup.object().shape({
    memberId: yup
      .string()
      .isRequired(true, 'This Field is Required.')
      .matches(/^\d{8}$/, 'Member ID must be 8 digits.'),
    zipCode: yup
      .string()
      .isRequired(true, 'This Field is Required.')
      .matches(/^\d{5}(?:-\d{4})?$/, 'Valid Zip Code Formats: 12345 or 12345-6789'),
  })}
>
  <Field
    name="memberId"
    type="text"
    label="Member ID"
   }}
  />
  <Field
    name="zipCode"
    type="text"
    label="Zip Code"
  />
</Form>
// ...
```
