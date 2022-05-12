---
title: <AvRegionSelect />
---

A select list that automatically loads and pages through regions when the user scrolls down.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { AvRegionSelect } from '@availity/select';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';

const Example = () => (
  <Form
    initialValues={{
      region: '',
    }}
    onSubmit={(values) => apiResource.submit(values)}
    validationSchema={yup.object().shape({
      region: yup.string().isRequired('This field is required.'),
    })}
  >
    <AvRegionSelect id="region" name="region" defaultToCurrentRegion />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/components-avselect-resources--avregionselect)

### Props

Extends [ResourceSelect Props](/form/select/components/resource-select/#props).

#### `defaultToCurrentRegion: boolean`

When `true`, the input will be defaulted to the user's currently selected region. Defaults to `false`
