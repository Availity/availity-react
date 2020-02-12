---
title: <Phone />
summary: Availity Phone component using Formik and Yup
---

## Example

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import { Phone, validatePhone } from '@availity/phone';
import { Button } from 'reactstrap';

<Form
  initialValues={{
    phone: '',
    ext: '',
  }}
  onSubmit={values => alert(JSON.stringify(values))}
  validationSchema={yup.object({
    phone: yup
      .string()
      .validatePhone()
      .isRequired(true),
    ext: yup.string(),
  })}
>
  <Phone
    name="phone"
    label="Phone"
    country="US"
    showExtension={true}
    phoneColProps={{ xs: { size: 9 } }}
    extProps={{
      name: 'ext',
      label: 'Ext.',
      extColProps: {
        xs: { size: 3 },
      },
    }}
  />
  <Button type="submit" color="primary">
    Submit
  </Button>
</Form>;
```

## Props

### `name: string`

Identifies the field and matches the validation schema.

### `label?: string`

Displays a Reactstrap `<Label />` for the field.

### `country?: string`

Default country for parsing national numbers. This is the [two letter ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). If no code is provided, the default is `'US'`.

### `showExtension?: boolean`

Enable the phone extension field. This is `false` by default.

### `extProps?: object`

Used to pass props to the extension field when it is enabled.

```js
extProps: {
  name: '',
  label: '',
  extColProps: {},
}
```

### `phoneColProps?: object`

Used to control props on the `<Col />` for the phone field, if needed. The phone column defaults to `xs: { size: 12 }` when not rendering an extension field, and defaults to `xs: { size: 10 }` when rendering an extension field.

```js
phoneColProps: {
  xs: {
    size: 9;
  },

  sm: {
    size: 10;
  }
}
```

### `extColProps?: object`

Used to control props on `<Col />` for the extension field, if needed. The extension column has no default size value, so it's default will effectively be `size: { 12 - phoneColSize }` unless otherwise specified.

```js
extColProps: {
  xs: {
    size: 3;
  },

  sm: {
    size: 2;
  }
}
```

### `restPhoneProps` & `restExtProps`

These are respectively spread onto the corresponding `@availity/form` `<Field />` components, so props like `grid` can be used on the phone and extension fields.

## Lazy Loading and Suspense

Because `libphonenumber-js` has a relatively large package size, it is recommended that [lazy loading and suspense](https://reactjs.org/docs/code-splitting.html#reactlazy) are utilized with this component. This will give your app the benefit of Code-Splitting, and the bundle containing `libphonenumber-js` and the `<Phone />` component will be loaded automatically when the component is first rendered. While the component is being loaded, a `fallback` component will be rendered to show the user some placeholder content in the meantime.

```jsx
import React, { Suspense } from 'react';

const Phone = React.lazy(() => import('./Phone'));

function MyApp() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Phone />
      </Suspense>
    </div>
  );
}
```
