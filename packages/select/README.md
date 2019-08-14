# @availity/select

> Wrapper for [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate) to work with [formik](https://github.com/jaredpalmer/formik)

## Installation

```bash
npm install @availity/select @availity/api-axios @availity/api-core @availity/form formik react reactstrap --save
```

## Validation

See [yup](https://github.com/jquense/yup) and [@availity/yup](https://github.com/Availity/sdk-js/tree/master/packages/yup)

### Select (Default Export)

Select dropdown without a `Label` or `Feedback`

#### Select Usage

```javascript
import React from 'react';
import { Form } from '@availity/form';
import Select from '@availity/select';
import * as yup from 'yup';
import '@availity/yup';

// ...
const schema = yup.object().shape({
  justTheInput: yup.string().required('This field is required.'),
});

const options = [
  {label: "Option 1", value: 1},
  {label: "Option 2", value: 2},
  {label: "Option 3", value: 3},
];

return (
  <Form
    initialValues={{
      justTheInput: undefined,
    }}
    onSubmit={values => apiResource.submit(values)}
    validationSchema={schema}
  >
    <Select
      id="justTheInput"
      name="justTheInput"
      isMulti={false}
      options={options}
    />

    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### Select Props

See [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate) for additional props

*   **`name`**: String. Required. The name of the field. Will be the key of the selected option(s) that come through in the values of the `onSubmit` callback.
*   **`raw`**: Boolean. Optional. Default: `false`. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. Optional. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdown for the user to see. Default `label`
*   **`maxLength`**: Number. Optional. The maximum number of options that can be selected (when `isMulti` is true)
*   **`selectRef`**: Function or Node. Optional. Ref passed to `react-select-async-paginate` component
*   **`className`**: Additional styles to be added to the `<Select />`
*   **`creatable`**: boolean. Optional. Whether or not to allow new items to be created if not found.
*   **`autofill`**: Boolean or Object. Optional. Default: `false`. If `true`, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the new value will be auto-filled. In order for a field to be auto-filled, the `name` property on the field _must_ match the key inside the new value. For example, if the new value is `{ "payer": "Availity" }`, in order for the payer input in the form to be auto-filled to "Availity", the `name` prop on the input must be "payer". If `autofill` is an object, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the keys in the `autofill` prop will be auto-filled. For example, if the new value is `{ "payer": { "name": "Availity", "id": "1" } }`, in order for the "payerName" and "payerId" inputs to be auto-filled to "Availity" and "1" respectively, the `autofill` prop should be `{ payerName: 'payer.name', payerId: 'payer.id' }`.

### SelectField

The same as `Select` but with a `Label` that appears above the input and a `Feedback` that appears below the input.

#### SelectField Usage

```javascript
import React from 'react';
import { Form } from '@availity/form';
import { SelectField } from '@availity/select';
import * as yup from 'yup';
import '@availity/yup';

// ...
const schema = yup.object().shape({
  justTheInput: yup
    .array()
    .of(yup.string())
    .min(min, 'Must select at least 2 options')
    .max(max, 'Cannot select more than 4 options')
    .required('This field is required.'),
});

const options = [
  {label: "Option 1", value: 1},
  {label: "Option 2", value: 2},
  {label: "Option 3", value: 3},
];

return (
  <Form
    initialValues={{
      selectWithLabel: undefined,
    }}
    onSubmit={values => apiResource.submit(values)}
    validationSchema={schema}
  >
    <SelectField
      label="Select a value"
      id="selectWithLabel"
      name="selectWithLabel"
      isMulti
      options={options}
    />

    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### SelectField Props

Same as `Select`, with the following additional props:

*   **`label`**: Node. Optional. The label to render above the `Select` input
*   **`labelHidden`**: Boolean. Optional. Whether the `label` should be hidden
*   **`labelClass`**: String. Optional. classNames to pass to the `Label`
*   **`feedbackClass`**: String. Optional. classNames to pass to the `Feedback`
*   **`groupClass`**: String. Optional. classNames to pass to the `FormGroup`.
*   **`creatable`**: boolean. Optional. Whether or not to allow new items to be created if not found.
*   **`autofill`**: Boolean or Object. Optional. Default: `false`. If `true`, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the new value will be auto-filled. In order for a field to be auto-filled, the `name` property on the field _must_ match the key inside the new value. For example, if the new value is `{ "payer": "Availity" }`, in order for the payer input in the form to be auto-filled to "Availity", the `name` prop on the input must be "payer". If `autofill` is an object, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the keys in the `autofill` prop will be auto-filled. For example, if the new value is `{ "payer": { "name": "Availity", "id": "1" } }`, in order for the "payerName" and "payerId" inputs to be auto-filled to "Availity" and "1" respectively, the `autofill` prop should be `{ payerName: 'payer.name', payerId: 'payer.id' }`.

### ResourceSelect

A select list which automatically loads and pages through a resource when the user scrolls down.

#### ResourceSelect Usage

```javascript
import React from 'react';
import { Form } from '@availity/form';
import { ResourceSelect } from '@availity/select';
import * as yup from 'yup';
import '@availity/yup';

// ...
const schema = yup.object().shape({
  resourceSelect: yup.string().required('This field is required.'),
});

const avCustomResource = new AvApi({ name: 'my-custom-resource' });

return (
  <Form
    initialValues={{
      resourceSelect: '',
    }}
    onSubmit={values => apiResource.submit(values)}
    validationSchema={schema}
  >
    <ResourceSelect
      id="resourceSelect"
      name="resourceSelect"
      resource={avCustomResource}
      isMulti={false}
    />

    <Button color="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

#### ResourceSelect Props

See [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate) for additional props

*   **`raw`**: Boolean. Optional. Default: `true`. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. Optional. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdown for the user to see. Default `label`
*   **`label`**: String. Optional. If provided, the rendered component will mimic `SelectField` instead of `Select` (it will create a group with a label and feedback).
*   **`creatable`**: boolean. Optional. Whether or not to allow new items to be created if not found.
*   **`requestConfig`**: Object. Optional. Configuration object which will be used with the query method on the resource. Useful for defining headers to be sent with the request.
*   **`parameters`**: Object. Optional. Object which will be used to create querystring parameters in the request.
*   **`customerId`**: String. Optional. The value of the customer ID which will be sent in the parameters. Useful for restricting the loaded options to be related to the organization the user has in context.
*   **`requiredParams`**: Array of strings. Optional. If present, the network request will not be made until all of the required parameters specified in the array have a truthy value.
*   **`cacheUniq`**: Any. Optional. When this prop changes, all cache options are cleared. (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#cacheuniq))
*   **`watchParams`**: Array of strings. Optional. If present, the options will reset when any of the parameters specified in the array change value. This is useful for when a customerId changes and you need to load a new list of options for the user to choose from. Used to derive `cacheUniq` if `cacheUniq` prop is not provided.
*   **`resource`**: Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)). Required.
*   **`getResult`**: String or Function. Optional. When a function, the function will be called with the API response body/payload and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response ("simple" meaning not handling dot-notation for nested objects, if you need that provide a function.)
*   **`debounceTimeout`**: Number. default: 350. The amount of time (in milliseconds) to wait after the user has stopped typing before making the network request (debounced input).
*   **`delay`**: Number. Default: `350`. Set to `debounceTimeout` if `debounceTimeout` is not provided. (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#debouncetimeout))
*   **`itemsPerPage`**: Number. Optional. Default: `50`. The number of items to fetched be displayed per page when the usr scrolls down.
*   **`onPageChange`**: Function. Optional. A callback function to inform you that the user has scrolled to the bottom of the list and more items are loaded. The current input value and the page the user wants to go to will be provided as arguments to the callback function.
*   **`hasMore`**: Boolean or Function. Optional. If true, `ResourceSelect` will attempt to retrieve the next page of results. `response.data` from axios response is passed as the only argument to `hasMore` when `hasMore` is a function. Defaults to: `({ totalCount, limit, offset }) => totalCount > offset + limit;` for non-GraphQL apis. Defaults to `(data) => data.data[${this.props.graphqlConfig.type}Pagination].pageInfo.hasNextPage` for GraphQL apis.
*   **`additional`**: Object. Optional. Additional properties to pass to `AsyncPaginate` (see [react-select-async-paginate](https://github.com/vtaits/react-select-async-paginate#additional)).
*   **`graphqlConfig`**: Object{ type, query }. Optional. `type` String. is the type of asset returned. `query` String. is the GraphQL query to use in the request.
*   **`autofill`**: Boolean or Object. Optional. Default: `false`. If `true`, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the new value will be auto-filled. In order for a field to be auto-filled, the `name` property on the field _must_ match the key inside the new value. For example, if the new value is `{ "payer": "Availity" }`, in order for the payer input in the form to be auto-filled to "Availity", the `name` prop on the input must be "payer". If `autofill` is an object, when the value of the dropdown changes, if the `isMulti` prop is `false` _and_ the new value of the dropdown is an object, all fields on the form corresponding to the keys in the `autofill` prop will be auto-filled. For example, if the new value is `{ "payer": { "name": "Availity", "id": "1" } }`, in order for the "payerName" and "payerId" inputs to be auto-filled to "Availity" and "1" respectively, the `autofill` prop should be `{ payerName: 'payer.name', payerId: 'payer.id' }`.
*   **`minCharsToSearch`**: Number. Optional. The minimum number of characters the user must input before `ResourceSelect` makes the network request. If the user has not inputted any characters, the network request will still be made. Useful for relieving pressure on the api the `resource` is calling.

#### Pre-made Resource Selects

The follow components exist and can be imported by name from `@availity/select/resources`

* AvProviderSelect
* AvOrganizationSelect
* AvRegionSelect
* AvPermissionSelect
* AvNavigationSelect
* AvUserSelect
* AvPatientSelect

These components are `ResourceSelect` with pre-configured `resource`, `valueKey`, and `labelKey` to make it easy to use. All of the props for `ResourceSelect` can be provided to override the defaults of these pre-made components. For some of the components you will want to provide the `customerId` prop.

##### Pre-made Resource Selects Example Usage

```javascript
import React from 'react';
import AvApi from '@availity/api-axios';
import { Form } from '@availity/form';
import {
  AvProviderSelect,
  AvOrganizationSelect,
  AvRegionSelect,
  AvPermissionSelect,
  AvNavigationSelect,
  AvUserSelect,
  AvPatientSelect,
} from '@availity/select/resources';

const schema = yup.object().shape({
  AvProviderSelect: yup.string().required('This field is required.'),
  AvOrganizationSelect: yup.string().required('This field is required.'),
  AvRegionSelect: yup.string().required('This field is required.'),
  AvPermissionSelect: yup.string().required('This field is required.'),
  AvNavigationSelect: yup.string().required('This field is required.'),
  AvUserSelect: yup.string().required('This field is required.'),
  AvPatientSelect: yup.string().required('This field is required.'),
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
    <AvRegionSelect
        name="region"
        label="Select a Region"
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
</Form>;
```
