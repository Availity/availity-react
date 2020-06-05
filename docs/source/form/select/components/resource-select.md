---
title: <ResourceSelect />
summary: A select list that automatically loads and pages through a resource when the user scrolls down.
---

## Example

```jsx live=true viewCode=true
import { Form } from '@availity/form';
import { ResourceSelect } from '@availity/select';
import * as yup from 'yup';
import '@availity/yup';

<Form
  initialValues={{
    resourceSelect: '',
  }}
  onSubmit={values => apiResource.submit(values)}
  validationSchema={yup.object().shape({
    resourceSelect: yup.string().required('This field is required.'),
  })}
>
  <ResourceSelect
    id="resourceSelect"
    name="resourceSelect"
    labelKey="name"
    label="Resource Select"
    resource={avCustomResource}
    isMulti={false}
  />

  <Button color="primary" type="submit">
    Submit
  </Button>
</Form>;
```

## Props

Extends [SelectField Props](/form/select/components/select-field/#props).

### `name: string`

The name of the field. Will be the key of the selected date that comes through in the values of the `onSubmit` callback.

### `requestConfig?: object`

Configuration object used in the query method on the resource. Useful for defining headers to be sent with the request.

### `parameters?: object | (params: any): any`

Object used to create querystring parameters in the request. If function, will return new object with params for request.

### `method?: string`

Override method to use `post` request on REST calls with `graphqlConfig`.

### `customerId?: string`

The value of the customer ID, which is sent in the parameters. Useful for restricting the loaded options to be related to the organization the user has in context.

### `requiredParams?: Array<string>`

If present, the network request is not made until all of the required parameters specified in the array have a truthy value.

### `cacheUniq?: any`

When this prop changes, all cached options are cleared. (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#cacheuniq))

### `watchParams?: Array<string>`

If present, the options reset when any of the parameters specified in the array change value. This is useful for when a customerId changes and you need to load a new list of options for the user to choose from. Used to derive `cacheUniq` if `cacheUniq` prop is not provided.

### `resource: AxiosResource`

Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)).

### `getResult?: (data: object) => Array<object>`

When a function, the function is called with the response body from the API call and is expected to return an array. When a string, the string is expected to be a simple key used to get the value from the response. ("simple" means dot notation is not supported for grabbing values from nested objects. If your result is deeply nested, provide a function.)

### `debounceTimeout?: number`

The amount of time (in milliseconds) to wait after the user has stopped typing before making the network request (debounced input). **Default**: `350`

### `delay?: number`

Set to `debounceTimeout` if `debounceTimeout` is not provided. (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#debouncetimeout))

### `itemsPerPage?: number`

the number of items to fetch at a time and display per page when the user scrolls down.

### `onPageChange?: (inputValue: string | object, page: number) => void`

A callback function to inform you that the user has scrolled to the bottom of the list and more items are loaded. The current input value and the page the user wants to go to are provided as arguments to the callback function.

### `hasMore?: boolean | (data: object) => boolean`

If true, `ResourceSelect` attempts to retrieve the next page of results. `response.data` from the axios response is passed as the only argument to `hasMore` when `hasMore` is a function. Defaults to: `({ totalCount, limit, offset }) => totalCount > offset + limit;` for non-GraphQL apis. Defaults to `(data) => data.data[${this.props.graphqlConfig.type}Pagination].pageInfo.hasNextPage` for GraphQL apis.

### `additional?: object`

Additional properties to pass to `AsyncPaginate` (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#additional))

### `graphqlConfig?: object`

Object containing `type` (String) and `query` (String) properties. `type` is the type of asset returned. `query` is the GraphQL query to use in the request.

### `minCharsToSearch?: number`

The minimum number of characters the user must input before `ResourceSelect` makes the network request. If the user has not inputted any characters, the network request will still be made. Useful for relieving pressure on the api the `resource` is calling.

### `waitUntilFocused?: boolean`

When true, the network request is not made until the dropdown has been focused.

### `defaultToOnlyOption?: boolean`

When true, if the `resource` only returns one result the first time it is called, the value is defaulted to the single result. Note: if `waitUntilFocused` is `true`, this prop is ignored.

### `shouldSearch?: boolean | (inputValue: string, prevOptions: OptionType, additional: any) => boolean`

When false or a function that returns false, the network request won't be made. Defaults to `true`.

### `pageAll: boolean`

When true, `resource.all()` is called to fetch all the results, and search strings will filter by the label values instead of making another network call. DebounceTimeout is set to zero in this case. **This should only be used for resources with a consistently small result set and no api search params**

Example: AvRegionsSelect has a limited number of results and no api search param

### `onError: (error: Error) => void`

Function that is called when the api call returned an error. The error is returned in the callback

### `additionalPostGetArgs?: object`

This object can be used to pass additional arguments to a resource's `postGet` call. These additional arguments are separate from the `parameters` that are supported by an API and may be used for filtering or other methods called inside a resource's `postGet` method. Example for the `organizations` resource that supports `additionalPostGetArgs`:

```jsx
async postGet(data, config, additionalPostGetArgs) {

    if (additionalPostGetArgs) {
      const { data: organizationsData } = await super.postGet(
        data,
        config
      );

      return this.getFilteredOrganizations(
        organizationsData,
        additionalPostGetArgs,
        data
      );
    }

    // Else return normal organizations call
    return super.postGet(data, config);
  }
```

## Pre-made Resource Selects

The following components can be imported by name from `@availity/select/resources`

- AvProviderSelect
- AvOrganizationSelect
- AvPermissionSelect
- AvNavigationSelect
- AvUserSelect
- AvCodeSelect

These components are `ResourceSelect` with pre-configured `resource`, `valueKey`, and `labelKey` to make it easy to use. All of the props for `ResourceSelect` can be provided to override the defaults of these pre-made components. For some of these components, you will want to provide the `customerId` prop.

### Example

```jsx
import React from 'react';
import AvApi from '@availity/api-axios';
import { Form } from '@availity/form';
import {
  AvProviderSelect,
  AvOrganizationSelect,
  AvPermissionSelect,
  AvNavigationSelect,
  AvUserSelect,
  AvCodeSelect,
} from '@availity/select/resources';

const schema = yup.object().shape({
  provider: yup.string().required('This field is required.'),
  organization: yup.string().required('This field is required.'),
  region: yup.string().required('This field is required.'),
  permissions: yup.string().required('This field is required.'),
  payerSpace: yup.string().required('This field is required.'),
  user: yup.string().required('This field is required.'),
  code: yup.string().required('This field is required.'),
  patient: yup.string().required('This field is required.'),
});

// ...
<Form
  initialValues={{
    provider: null,
    organization: null,
    region: null,
    permissions: null,
    payerSpace: null,
    user: null,
    code: null,
    patient: null,
  }}
  onSubmit={values => apiResource.submit(values)}
  validationSchema={schema}
>
  <AvProviderSelect
    name="provider"
    customerId="1234"
    requiredParams={['customerId']}
    watchParams={['customerId']}
    label="Select a provider"
    customerId={customerId}
    required
  />
  <AvOrganizationSelect
    name="organization"
    label="Select a Organization"
    required
  />
  <AvPermissionSelect
    name="permissions"
    label="Select a provider"
    customerId={customerId}
    isMulti
    required
  />
  <AvNavigationSelect
    name="payerSpace"
    label="Select a Payer Space"
    customerId={customerId}
    required
  />
  <AvUserSelect name="user" label="Select a User" customerId={customerId} />
  <AvCodeSelect name="code" label="Select a Code" />
</Form>;
```
