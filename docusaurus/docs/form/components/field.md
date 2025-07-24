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
    <Field name="hello" label="Greeting" required />
    <Button type="submit" color="primary">
      Submit
    </Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/docs/bootstrap-components-form-field--docs)

### Props

#### `name: string`

Identifies the field and matches the validation schema.

#### `tag?: React.ComponentType | string`

The Node or tag to substitute as the input field. Default is reactstrap `Input` tag.

#### `label?: React.ReactNode`

Contents of the field label. Renders within a Reactstrap `<Label />`.

#### `labelHidden? boolean`

Used to hide the label.

#### `required? boolean`

Will add `aria-required` to input, will add `<RequiredAsterisk />` to label.

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

#### `helpId?: string`

Help topic id, adds `<FieldHelpIcon/>` next to the label (should not be within label for accessibility).

#### `helpMessage?: React.ReactNode`

Display info text below the field

#### `labelAttrs?: React.HTMLAttributes<HTMLLabelElement>`

Pass additional attributes to the label

#### `groupAttrs?: FormGroupProps`

Pass additional attributes to [Form Group](/form/components/form-group/#props)

#### `grid?: object`

Object mapping number of columns to the label and input.

#### `children?: ({ input: React.ReactNode, feedback: React.ReactNode }) => React.ReactNode`

Optionally override the way the input is rendered with child render prop.

#### `append?: React.ReactNode | string`

Append an InputAddon to the end of the Input.

#### `prepend?: React.ReactNode | string`

Append an InputAddon to the start of the Input.

#### `isHelpVideoType?: boolean`

Allows the type of `<FieldHelpIcon/>` to be changed between help-icon and video-help
