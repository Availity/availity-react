---
title: <Radio />
---

Inputs of type radio. Radios should be wrapped in a RadioGroup.

### Example

```jsx
import React from 'react';
import { Form, Radio, RadioGroup } from '@availity/form';
import { Button } from 'reactstrap';
import * as yup from 'yup';

const Example = () => (
  <Form
    initialValues={{
      hello: '',
    }}
    onSubmit={() => {}}
    validationSchema={yup.object().shape({
      hello: yup.string().required('This field is required'),
    })}
  >
    <RadioGroup name="hello" label="Radio Group">
      <Radio name="hello" label="Radio One" value="uno" />
      <Radio name="hello" label="Radio Two" value="dos" />
      <Radio name="hello" label="Radio Three" value="tres" />
    </RadioGroup>
    <Button type="submit">Submit</Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-form--radio)

### Props

#### `id?: string`

Id for the radio button. **default:** generated uuid

#### `name?: string`

Should match `<RadioGroup />` name for validation and accessibly linking button to form feedback.

#### `label?: ReactNode`

Label for the radio button.

#### `value?: string`

Value of the radio button.

#### `disabled?: boolean`

Disables the radio button.
