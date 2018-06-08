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

Please refer to [react-select with async pagination](https://github.com/TheSharpieOne/react-select/tree/feature/async-pagination)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s input validation props. This component just combines those.

*   **`raw`**: Boolean. Optional. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. The key for the label you want to appear in the dropdrop for the user to see. Default `label`

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

Please refer to [react-select with async pagination](https://github.com/TheSharpieOne/react-select/tree/feature/async-pagination)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s field validation props. This component just combines those.

#### AvSelectField Props

Please refer to [react-select with async pagination](https://github.com/TheSharpieOne/react-select/tree/feature/async-pagination)'s props and [availity-reactstrap-validation](https://github.com/Availity/availity-reactstrap-validation)'s input validation props. This component just combines those.

*   **`raw`**: Boolean. Optional. If `true`, the entire object of the selected value will be returned as the value instead of the value for the `valueKey` within the object.
*   **`valueKey`**: String. The key of the value you want returned when selected. Default: `value`
*   **`labelKey`**: String. The key for the label you want to appear in the dropdrop for the user to see. Default `label`

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

