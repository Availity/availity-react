# Currency Input

This input is an enhancement to @availity/form available fields to provide the necessary formatting required for currency. It also displays the appropriate field level validation errors when applicable.

For Example, while typing in the input `54` into a CurrencyInput, it will auto format to display as `$54.00`.

## How to use

```jsx
import React from 'react';
import { CurrencyInput } from '@p3/react-common';

const MyComponent = () => {
    const [myValue, setMyValue] = useState('');

    return (
       <CurrencyInput
        id='search-currency'
        name='myCurrencyField'
        placeholder='Enter a value...'
        value={myValue}
        onValueChanged={async (value) => {
            setMyValue(value);
        }}
    />;
    )
}

```

## Props

The currency input will inherit any properties for the `HTMLInputType`.

Here are some additional parameters:

### `name: string`

The API name of the property on the form.

### `value: string`

The value that displays in the textbox and is applied to the Form Values.

### `onValueChange: (value: string) => void`

The callback function that is called whenever a function is changed.
