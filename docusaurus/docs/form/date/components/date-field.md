---
title: <DateField />
---

The same as `Date` but with a `Label` that appears above input and a `Feedback` that appears below the input.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { DateField } from '@availity/date';
import '@availity/date/styles.scss';
import { avDate } from '@availity/yup';
import { Button } from 'reactstrap';
import * as yup from 'yup';

const Example = () => (
  <Form
    initialValues={{
      dateOfService: '',
    }}
    onSubmit={(values) => console.log(values)}
    validationSchema={yup.object().shape({
      dateOfService: avDate().required(),
    })}
  >
    <DateField
      label="Date of Service"
      id="dateOfService"
      name="dateOfService"
      min={{ value: 7, units: 'day' }}
      max={{ value: 7, units: 'day' }}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/formik-date--datefield"> Storybook</a>

### Props

Extends [Date Props](/form/date/components/date/#props).

#### `name: string`

The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback.

#### `label?: string`

The text that renders inside the `Label` above the input.

#### `labelClass?: string`

The name of the class for the label. Will be passed to the `className` prop of the label in the field.

#### `labelHidden?: boolean`

Used to control if the label is displayed. When set to `true`, the label in the field won't be visible.

#### `labelAttrs?: React.HTMLAttributes<HTMLLabelElement>`

Pass additional attributes to the label

#### `helpId?: string`

Help topic id, adds `<FieldHelpIcon/>` next to the label (should not be within label for accessibility).

#### `required?: boolean`

Will add `<RequiredAsterisk />` to label.
