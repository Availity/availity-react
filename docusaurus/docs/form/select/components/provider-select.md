---
title: <AvProviderSelect />
---

A select list that automatically loads and pages through providers when the user scrolls down.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { AvProviderSelect } from '@availity/select';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';

const Example = () => (
  <Form
    initialValues={{
      providers: '',
    }}
    onSubmit={(values) => apiResource.submit(values)}
    validationSchema={yup.object().shape({
      providers: yup.string().isRequired('This field is required.'),
    })}
  >
    <AvProviderSelect
      id="providers"
      name="providers"
      parameters={{ atypical: false }}
      requiredParams={['customerId']}
      watchParams={['customerId']}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-select-resources--avProviderselect)

### Props

Extends [ResourceSelect Props](/form/select/components/resource-select/#props).

#### `searchAll?: boolean`

The `providers` API from `sdk-js` accepts a role parameter. By default, most applications will only want to return providers who are assigned to the office of the provider's organization, as opposed to the many third-party providers and organizations that they may do business with from time to time as billing or referring providers. If searchAll is true, we will remove this default behavior and return the full list of first and third-party affiliated providers.

#### `parameters: Record<string, unknown>`

This will either be passed directly to the underlying resourceSelect or modified as described above in the searchAll section.
