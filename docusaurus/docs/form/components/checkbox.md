---
title: <Checkbox />
---

Inputs of type checkbox. Checkboxes should be wrapped in a CheckboxGroup.

### Example

```jsx
import React from 'react';
import { Form, Checkbox, CheckboxGroup } from '@availity/form';
import { Button } from 'reactstrap';
import * as yup from 'yup';

const Example = () => (
  <Form
    initialValues={{
      hello: [],
    }}
    onSubmit={() => {}}
    validationSchema={yup.object().shape({
      hello: yup.array().required('At least one checkbox is required'),
    })}
  >
    <CheckboxGroup name="hello" label="Checkbox Group">
      <Checkbox groupName="checkboxGroup" label="Check One" value="uno" />
      <Checkbox groupName="checkboxGroup" label="Check Two" value="dos" />
      <Checkbox groupName="checkboxGroup" label="Check Three" value="tres" />
    </CheckboxGroup>
    <Button type="submit" color="primary">
      Submit
    </Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-form--checkbox)

### Props

#### `id?: string`

Id and name for the checkbox. **default:** generated uuid

#### `groupName?: string`

Should match `<CheckboxGroup />` name to accessibly link input to form feedback.

#### `label?: ReactNode`

Label for the checkbox.

#### `value?: string`

Value of the checkbox.

#### `disabled?: boolean`

Disables the checkbox.

#### `inline?: boolean`

Will render the checkbox inline with other checkboxes. **Default:** true.
