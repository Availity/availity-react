---
title: <Field />
---

Input field wrapped in additional features such as label, feedback, grid options, etc

### Example

```jsx
import React from 'react';
import { Form, Field } from '@availity/form';
import { Button } from 'reactstrap';
import * as yup from 'yup';

const Example = () => (
  <Form
    initialValues={{
      hello: '',
    }}
    onSubmit={(values) => alert(JSON.stringify(values))}
    validationSchema={yup.object({
      hello: yup.string().isRequired(true),
    })}
  >
    <Field name="hello" label="Greeting" />
    <Button type="submit" color="primary">
      Submit
    </Button>
  </Form>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/formik-form--field"> Storybook</a>

### Props

#### `name: string`

Identifies the field and matches the validation schema.

#### `tag?: React.ComponentType | string`

The Node or tag to substitute as the input field. Default is reactstrap `Input` tag.

#### `label?: React.ReactNode`

Displays a Reactstrap `<Label />` for the field

#### `labelHidden? boolean`

Used to hide the label.

#### `disabled? boolean`

Disable the `<Field />`.

#### `readOnly? boolean`

Mark the field as read only.

#### `size? string`

Size of the input field. Potential values: `"lg"`, `"sm"`

#### `inputClass?: string`

Class names passed to the input tag.

#### `labelClass?: string`

Class names passed to the label tag.

#### `helpMessage?: React.ReactNode`

Display info text below the field

#### `labelAttrs?: React.HTMLAttributes<HTMLLabelElement>`

Pass additonal attributes to the label

#### `groupAttrs?: FormGroupProps`

Pass additonal attributes to [Form Group](/form/components/form-group/#props)

#### `grid?: object`

Object mapping number of columns to the label and input.

#### `children?: ({ input: React.ReactNode, feedback: React.ReactNode }) => React.ReactNode`

Optionally override the way the input is rendered with child render prop.

#### `append?: React.ReactNode | string`

Append an InputAddon to the end of the Input.

#### `prepend?: React.ReactNode | string`

Append an InputAddon to the start of the Input.
