---
title: <Label />
---

Label that handles required indicator and field help icon. Uses Reactstrap Label.

### Additional Components

- `<RequiredAsterisk />`
- `<RequiredKey />`
  - Explains Asterisk Meaning - "Fields marked with an asterisk `<RequiredAsterisk />` are required."
  - Should be at top of form when using `<RequiredAsterisk />` indicators.

### Example

```jsx
import React from 'react';
import { Form, Input, Label } from '@availity/form';
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
    <RequiredKey />

    <Label for="hello" helpId="hello-help-id" required >
        Hello
    </Label>
    <Input name="hello" />
    <Button type="submit" className="ml-1" color="primary">
      Submit
    </Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-form--label)

### Props

Extends Reactstrap v8 Label Props (`for`, `tag`, `className`, `hidden`, etc)

#### `id?: string`

Id of the label element. Default is generated UUID.

#### `helpId?: string`

Help topic id, adds `<FieldHelpIcon/>` next to the label (should not be within label for accessibility).

#### `required?: boolean`

Will add `<RequiredAsterisk />` to label.