# @availity/reactstrap-validation-select

> Wrapper for react-select (with async pagination) to work with availity-reactstrap-validation.

## Installation

```bash
npm install @availity/reactstrap-validation-select availity-reactstrap-validation reactstrap react --save
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
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdrop for the user to see. Default `label`

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
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdrop for the user to see. Default `label`
*   **`groupClass`**: String. Optional. ClassName to add to the wrapping AvGroup
*   **`labelClass`**: String. Optional. ClassName to add to the label
*   **`feedbackClass`**: String. Optional. ClassName to add to the AvFeedback

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

#### AvResourceSelect Props

Please refer to [react-select with async pagination](https://github.com/TheSharpieOne/react-select/tree/npm/v2-async-pagination)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s input validation props. This component just combines those.

*   **`raw`**: Boolean. Optional. Default: `true`. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. Optional. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. Optional. The key for the label you want to appear in the dropdrop for the user to see. Default `label`
*   **`label`**: String. Optional. If provided, the rendered component will mimic `AvSelectField` instead of `AvSelect` (it will create a group with a label and feedback).
*   **`requestConfig`**: Object. Optional. Configuration object which will be used with the query method on the resource. Useful for defining headers to be sent with the request.
*   **`parameters`**: Object. Optional. Object which will be used to create querystring parameters in the request.
*   **`customerId`**: String. Optional. The value of the customer ID which will be sent in the parameters. Useful for restricting the loaded options to be related to the organization the user has in context.
*   **`requiredParams`**: Array of strings. Optional. If present, the network request will not be made until all of the required parameters specified in the array have a truthy value.
*   **`watchParams`**: Array of strings. Optional. If present, the options will reset when any of the parameters specified in the array change value. This is useful for when a customerId changes and you need to load a new list of options for the user to choose from.
*   **`resource`**: Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)). Required.
*   **`getResult`**: String or Function. Optional. When a function, the function will be called with the API response body/payload and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response ("simple" meaning not handling dot-notation for nested objects, if you need that provide a function.)
*   **`delay`**: Number. default: 350, The amount of time (in milliseconds) to wait after the user has stopped typing before making the network request (debounced input).
*   **`itemsPerPage`**: Number. Optional. Default: `50`. The number of items to fetched be displayed per page when the usr scrolls down.
*   **`onPageChange`**: Function. Optional. A callback function to inform you that the user has scrolled to the bottom of the list and more items are loaded. The current input value and the page the user wants to go to will be provided as arguments to the callback function.

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
</AvForm>;
```