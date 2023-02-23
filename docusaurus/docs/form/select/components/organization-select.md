---
title: <AvOrganizationSelect />
---

A select list that automatically loads and pages through organizations when the user scrolls down.

### Example

```jsx
import React from 'react';
import { Form } from '@availity/form';
import { AvOrganizationSelect } from '@availity/select';
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

### Additional notes on production usage

Based on our experience using this component in production environments with high volume usage, we have a few additional suggestions for developers.

Consider that while the overwhelming majority of your users may only belong to a handful of organizations, in production you will also have users who belong to >100 organizations. This may make use of this component more difficult and result in subtle and difficult to diagnose behaviors. Consider that if users navigate to a page with an orgId pre-populated from the URL, that organization may not be in the first page of responses from the backend. If we are fetching one page at a time our response callback may not have access to the complete set of results.

There would typically be two ways to work around this limitation. Developers might be tempted to use the pageAll prop (see [ResourceSelect docs](/form/select/components/resource-select/#props)), but this will prevent passing in any api search parameters and leads to duplicating filtering logic that already exists on the backend. Additionally, developers should avoid this method if at all possible due to performance considerations of repeatedly fetching large numbers of user orgs up front as opposed to waiting for when that the information is needed.

Secondly, developers may decide to store a local copy of the http responses as they come in and use their own custom logic to perform any automated selection or matching after a complete set of responses has been received. This is likely the safest approach at this time, but comes with some obvious drawbacks of having to maintain additional state and duplicate some information in places.

If you run into similar problems with this or any other ResourceSelect component, PRs and suggestions are welcome. Work to improve and mitigate these limitations is currently underway.
