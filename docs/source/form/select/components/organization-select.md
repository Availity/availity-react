---
title: <AvOrganizationSelect />
summary: A select list that automatically loads and pages through organizations when the user scrolls down.
---

## Example

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import { AvOrganizationSelect } from '@availity/select/resources';
import * as yup from 'yup';
import '@availity/yup';

<Form
  initialValues={{
    organizations: '',
  }}
  onSubmit={values => apiResource.submit(values)}
  validationSchema={yup.object().shape({
    organizations: yup.string().isRequired('This field is required.'),
  })}
>
  <AvOrganizationSelect
    id="organizations"
    name="organizations"
    parameters={{
      permissionId: ['1111', '2222'],
      regionId: 'FL',
    }}
    additionalPostGetArgs={{
      resourceIds: ['1234', '4321'],
    }}
  />

  <Button color="primary" type="submit">
    Submit
  </Button>
</Form>;
```

## Props

Extends [ResourceSelect Props](/form/select/components/resource-select/#props).

### `additionalPostGetArgs?: object`

The `organizations` API resource accepts a `resourceIds` prop inside of `additionalPostGetArgs` that can be either a string or an array of strings. When `additionalPostGetArgs` contains `resourceIds`, and the `parameters` object contains one or many permissions in `permissionId`, then the results of the `postGet` call to `organizations` will contain only organizations that have the specified permissions and resources. For example, if a payer space app is restricted to permission `A` and resource `B`, a user can pass `A` and `B` as `permissionId` and `resourceIds` into `AvOrganizationSelect` and expect the dropdown to only contain authorized organizations for that user in that app, instead of all the organizations that user belongs to.
