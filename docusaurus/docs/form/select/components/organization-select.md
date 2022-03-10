---
title: <AvOrganizationSelect />
---

A select list that automatically loads and pages through organizations when the user scrolls down.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { AvOrganizationSelect } from '@availity/select/resources';
import { Button } from 'reactstrap';
import * as yup from 'yup';
import '@availity/yup';

const Example = () => (
  <Form
    initialValues={{
      organizations: '',
    }}
    onSubmit={(values) => apiResource.submit(values)}
    validationSchema={yup.object().shape({
      organizations: yup.string().isRequired('This field is required.'),
    })}
  >
    <AvOrganizationSelect
      id="organizations"
      name="organizations"
      parameters={{
        regionId: 'FL',
        // permissionId can still be used here if
        // the additionalPostGetArgs logic is not being used
        permissionId: ['1111', '2222'],
      }}
      // permission 1111 OR 2222, with resource
      // 1234 OR 4321 is required for each organization
      permissionIds={['1111', '2222']}
      resourceIds={['1234', '4321']}
    />
    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### Live example: [Storybook](https://availity.github.io/availity-react/storybook/?path=/story/formik-select-resources--avorganizationselect)

### Props

Extends [ResourceSelect Props](/form/select/components/resource-select/#props).

#### `resourceIds?: string | string[]`

The `organizations` API from `sdk-js` accepts a `resourceIds` prop inside of `additionalPostGetArgs` that can be either a string or nested array of strings. When `AvOrganizationSelect` has a `resourceIds` prop, then the results of the `postGet` call to `organizations` will be filtered, containing only organizations that have the specified permissions and resources. This is useful when a payer space app is restricted to permission `A` and resource `B`, a user can pass `A` and `B` as `permissionIds` and `resourceIds` into `AvOrganizationSelect` and expect the dropdown to only contain authorized organizations for that user in that app, instead of all the organizations that user belongs to. AND logic is enforced by putting resources in an array together.

Example: resource `A` or `B` are required under permission `C` -> permissionIds: ['C'], resourcesIds: ['A', 'B']

#### `permissionIds: string | string[]`

The `organizations` API from `sdk-js` accepts a `permissionIds` prop inside of `additionalPostGetArgs` that can be either a string or nested array of strings. When used with `resourceIds`, the results of the `postGet` call to `organizations` will be filtered, containing only organizations that have the specified permissions and resources. If `additionalPostGetArgs.permissionsIds` exists, these values will be used over `parameters.permissionId`. This is useful when a payer space app is restricted to permission `A` and resource `B`, a user can pass `A` and `B` as `permissionIds` and `resourceIds` into `AvOrganizationSelect` and expect the dropdown to only contain authorized organizations for that user in that app, instead of all the organizations that user belongs to. AND logic is enforced by putting permissions in an array together.

Example: resource `A` under permission `C` AND resource `B` under permission `D` are required -> permissionIds: [ ['C', 'D'] ], resourceIds: [ ['A', 'B'] ]
