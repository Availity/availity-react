# @availity/reactstrap-validation-select

> Wrapper for react-select (with async pagination) to work with availity-reactstrap-validation.

[![Version](https://img.shields.io/npm/v/@availity/reactstrap-validation-select.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/reactstrap-validation-select)

## Installation

```bash
npx install-peerdeps @availity/reactstrap-validation-select --save
```

### Usage

```javascript
import React from 'react';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import AvSelect, { AvSelectField } from '@availity/reactstrap-validation-select';
import '@availity/reactstrap-validation-select/styles.scss';
// ...
const options = [
    {label: "Option 1", value: 1},
    {label: "Option 2", value: 2},
    {label: "Option 3", value: 3},
];
// ...
<AvForm>
    <AvGroup>
        <Label for="justTheInput">My Input Label</Label>
        <AvSelect
            name="justTheInput"
            options={options}
            required
        />
        <AvFeedback>Some error message</AvFeedback>
    </AvGroup>

    <AvSelectField
        name="fieldWithLabel"
        label="Label Made For Me"
        options={options}
        required
    />
</AvForm>;
```

Note: the input callbacks (e.g. onChange) do not get called with an event like other reactstrap-validation component; just the value of the field. This is because the underlying react-select does not return the event in it's callbacks.

### AvSelect (Default export)

This is the underlying select without the `AvGroup`, `Label` or `AvFeedback`

#### AvSelect Props

Please refer to [react-select with async pagination](https://github.com/TheSharpieOne/react-select/tree/npm/v2-async-pagination)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s input validation props. This component just combines those.

*   **`raw`**: Boolean. Optional. Default: `false`. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. Optional. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdown for the user to see. Default `label`
*   **`autofill`**: Boolean or Object. Optional. Default: `false`. If `true`, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the new value are auto-filled. In order for a field to be auto-filled, the `name` property on the field _must_ match the key inside the new value. 

For example, if the new value is `{ "payer": "Availity" }`, in order for the payer input in the form to be auto-filled to "Availity", the `name` prop on the input must be "payer". 

If `autofill` is an object, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the keys in the `autofill` prop will be auto-filled.

When `autofill` is an object, the values in the object can be a string or a function. When a string, the key in the `autofill` prop gets auto-filled to that path on the selected option. When a function, it gets called with the selected option, and the key in the `autofill` prop gets auto-filled to the return value of the function.

For example, if the new value is `{ "payer": { "name": "Availity", "id": "1" } }`, in order for the "payerName", "payerId", and "payerNameAndId" inputs to be auto-filled to "Availity", "1", and "1 - Availity" respectively, the `autofill` prop should be:

```js
{
  payerName: 'payer.name',
  payerId: 'payer.id',
  payerNameAndId: opt => `${opt.payer.id} - ${opt.payer.name}`,
}
```

#### AvSelect Example usage

```javascript
import React from 'react';
import { Label } from 'reactstrap';
import { AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import AvSelect from '@availity/reactstrap-validation-select';
import '@availity/reactstrap-validation-select/styles.scss';
// ...
const options = [
    {label: "Option 1", value: 1},
    {label: "Option 2", value: 2},
    {label: "Option 3", value: 3},
];
// ...
<AvForm>
    <AvGroup>
        <Label for="justTheInput">My Input Label</Label>
        <AvSelect
            name="justTheInput"
            options={options}
            required
        />
        <AvFeedback>Some error message</AvFeedback>
    </AvGroup>
</AvForm>;
```

### AvSelectField

Please refer to [react-select with async pagination](https://github.com/TheSharpieOne/react-select/tree/npm/v2-async-pagination)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s field validation props. This component just combines those.

#### AvSelectField Props

Please refer to [react-select with async pagination](https://github.com/TheSharpieOne/react-select/tree/npm/v2-async-pagination)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s input validation props. This component just combines those.

*   **`raw`**: Boolean. Optional. Default: `false`. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. Optional. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdown for the user to see. Default `label`
*   **`groupClass`**: String. Optional. ClassName to add to the wrapping AvGroup
*   **`labelClass`**: String. Optional. ClassName to add to the label
*   **`feedbackClass`**: String. Optional. ClassName to add to the AvFeedback
*   **`creatable`**: boolean. Optional. Whether or not to allow new items to be created if not found.
*   **`autofill`**: Boolean or Object. Optional. Default: `false`. If `true`, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the new value are auto-filled. In order for a field to be auto-filled, the `name` property on the field _must_ match the key inside the new value. 

For example, if the new value is `{ "payer": "Availity" }`, in order for the payer input in the form to be auto-filled to "Availity", the `name` prop on the input must be "payer". 

If `autofill` is an object, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the keys in the `autofill` prop will be auto-filled.

When `autofill` is an object, the values in the object can be a string or a function. When a string, the key in the `autofill` prop gets auto-filled to that path on the selected option. When a function, it gets called with the selected option, and the key in the `autofill` prop gets auto-filled to the return value of the function.

For example, if the new value is `{ "payer": { "name": "Availity", "id": "1" } }`, in order for the "payerName", "payerId", and "payerNameAndId" inputs to be auto-filled to "Availity", "1", and "1 - Availity" respectively, the `autofill` prop should be:

```js
{
  payerName: 'payer.name',
  payerId: 'payer.id',
  payerNameAndId: opt => `${opt.payer.id} - ${opt.payer.name}`,
}
```

#### AvSelectField Example usage

```javascript
import React from 'react';
import { AvSelectField } from '@availity/reactstrap-validation-select';
import '@availity/reactstrap-validation-select/styles.scss';
// ...
const options = [
    {label: "Option 1", value: 1},
    {label: "Option 2", value: 2},
    {label: "Option 3", value: 3},
];
// ...
<AvForm>
    <AvSelectField
        name="fieldWithLabel"
        label="Label Made For Me"
        options={options}
        required
    />
</AvForm>;
```

### AvResourceSelect

A select list which automatically loads and pages though a resource when the user scrolls down.

The search field will fire a request after the debounce timer (see `debounceTimeout` prop) using the given `resource` prop with the payload:

```js
{
   limit: "50", //limit quantity can be changed with `itemsPerPage` prop
   offset: "0",
   q: "user typed search text after debounce"
}
```

#### AvResourceSelect Props

Please refer to [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s input validation props. This component just combines those.

*   **`raw`**: Boolean. Optional. Default: `true`. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. Optional. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdown for the user to see. Default `label`
*   **`label`**: String. Optional. If provided, the rendered component will mimic `AvSelectField` instead of `AvSelect` (it will create a group with a label and feedback).
*   **`requestConfig`**: Object. Optional. Configuration object which will be used with the query method on the resource. Useful for defining headers to be sent with the request.
*   **`parameters`**: Object. Optional. Object which will be used to create querystring parameters in the request.
*   **`customerId`**: String. Optional. The value of the customer ID which will be sent in the parameters. Useful for restricting the loaded options to be related to the organization the user has in context.
*   **`requiredParams`**: Array of strings. Optional. If present, the network request will not be made until all of the required parameters specified in the array have a truthy value.
*   **`cacheUniq`**: Any. Optional. When this prop changes, all cache options are cleared. (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#cacheuniq))
*   **`watchParams`**: Array of strings. Optional. If present, the options will reset when any of the parameters specified in the array change value. This is useful for when a customerId changes and you need to load a new list of options for the user to choose from. Used to derive `cacheUniq` if `cacheUniq` prop is not provided.
*   **`resource`**: Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)). Required.
*   **`getResult`**: String or Function. Optional. When a function, the function will be called with the API response body/payload and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response ("simple" meaning not handling dot-notation for nested objects, if you need that provide a function.)
*   **`debounceTimeout`**: Number. default: 350. The amount of time (in milliseconds) to wait after the user has stopped typing before making the network request (debounced input).
*   **`delay`**: Number. default: 350. Set to `debounceTimeout` if `debounceTimeout` is not provided. (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#debouncetimeout))
*   **`itemsPerPage`**: Number. Optional. Default: `50`. The number of items to fetched be displayed per page when the usr scrolls down.
*   **`onPageChange`**: Function. Optional. A callback function to inform you that the user has scrolled to the bottom of the list and more items are loaded. The current input value and the page the user wants to go to will be provided as arguments to the callback function.
*   **`hasMore`**: Boolean or Function. Optional. If true, `AvResourceSelect` will attempt to retrieve the next page of results. `response.data` from axios response is passed as the only argument to `hasMore` when `hasMore` is a function. Defaults to: `({ totalCount, limit, offset }) => totalCount > offset + limit;` for non-GraphQL apis. Defaults to `(data) => data.data[${this.props.graphqlConfig.type}Pagination].pageInfo.hasNextPage` for GraphQL apis.
*   **`additional`**: Object. Optional. Additional properties to pass to `AsyncPaginate` (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#additional)).
*   **`graphqlConfig`**: Object{ type, query }. Optional. `type` String. is the type of asset returned. `query` String. is the GraphQL query to use in the request.
*   **`creatable`**: boolean. Optional. Whether or not to allow new items to be created if not found.
*   **`minCharsToSearch`**: Number. Optional. The minimum number of characters the user must input before `AvResourceSelect` makes the network request. If the user has not inputted any characters, the network request will still be made. Useful for relieving pressure on the api the `resource` is calling.
*   **`autofill`**: Boolean or Object. Optional. Default: `false`. If `true`, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the new value are auto-filled. In order for a field to be auto-filled, the `name` property on the field _must_ match the key inside the new value. 

For example, if the new value is `{ "payer": "Availity" }`, in order for the payer input in the form to be auto-filled to "Availity", the `name` prop on the input must be "payer". 

If `autofill` is an object, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the keys in the `autofill` prop will be auto-filled.

When `autofill` is an object, the values in the object can be a string or a function. When a string, the key in the `autofill` prop gets auto-filled to that path on the selected option. When a function, it gets called with the selected option, and the key in the `autofill` prop gets auto-filled to the return value of the function.

For example, if the new value is `{ "payer": { "name": "Availity", "id": "1" } }`, in order for the "payerName", "payerId", and "payerNameAndId" inputs to be auto-filled to "Availity", "1", and "1 - Availity" respectively, the `autofill` prop should be:

```js
{
  payerName: 'payer.name',
  payerId: 'payer.id',
  payerNameAndId: opt => `${opt.payer.id} - ${opt.payer.name}`,
}
```

#### AvResourceSelect Example usage

```javascript
import React from 'react';
import AvApi from '@availity/api-axios';
import { AvResourceSelect } from '@availity/reactstrap-validation-select';
import '@availity/reactstrap-validation-select/styles.scss';
// ...
const avCustomResource = new AvApi({ name: 'my-custom-resource' });
// ...
<AvForm>
    <AvResourceSelect
        name="fieldWithLabel"
        label="Label Made For Me"
        resource={avCustomResource}
        required
    />
</AvForm>;
```

#### Pre-made Resource Selects

The follow components exist and can be imported by name from `@availity/reactstrap-validation-select/resources`

* AvProviderSelect
* AvOrganizationSelect
* AvRegionSelect
* AvPermissionSelect
* AvNavigationSelect
* AvUserSelect

These components are `AvResourceSelect` with pre-configured `resource`, `valueKey`, and `labelKey` to make it easy to use. All of the props for `AvResourceSelect` can be provided to override the defaults of these pre-made components. For some of the component you will want to provide the `customerId` prop.

##### Pre-made Resource Selects Example Usage


```javascript
import React from 'react';
import AvApi from '@availity/api-axios';
import {
  AvProviderSelect,
  AvOrganizationSelect,
  AvRegionSelect,
  AvPermissionSelect,
  AvNavigationSelect,
  AvUserSelect,
  AvPatientSelect,
} from '@availity/reactstrap-validation-select/resources';
import '@availity/reactstrap-validation-select/styles.scss';
// ...
<AvForm>
    <AvRegionSelect
        name="region"
        label="Select a Region"
        required
    />
    <AvOrganizationSelect
        name="organization"
        label="Select a Organization"
        required
    />
    <AvProviderSelect
        name="provider"
        customerId="1234"
        requiredParams={['customerId']}
        watchParams={['customerId']}
        label="Select a provider"
        customerId={customerId}
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
    <AvUserSelect
        name="user"
        label="Select a User"
        customerId={customerId}
    />
    <AvPatientSelect
        name="patient"
        label="Select a Patient"
        parameters={{
          customerId,
        }}
    />
</AvForm>;
```
