# @availity/hooks

> Re-usable hooks for components and apps.

[![Version](https://img.shields.io/npm/v/@availity/hooks.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/hooks)

## Installation

```bash
npm install @availity/hooks --save
```

### Usage

```javascript
import React from 'react';
import { useToggle, useEffectAsync } from '@availity/hooks';
// ...
const Component = ({asyncFunction}) => {
    const [loading,toggleLoading] = useToggle(true);

    useEffectAsync(async () => {
        // ... do async things
        await asyncFunction();

        toggleLoading();
    },[]);

    return <div>{loading ? "Hello" : "World"}</div>
};
// ...
```

#### useToggle
Simple hook that returns a boolean that can easily be toggled. Useful for loaders, and simple toggle components.

##### Arguments

- **`initialState`**: Boolean. Optional. The intital state of the toggle. Default: `false`.

##### useToggle Usage

```javascript
import React from 'react';
import { useToggle } from '@availity/hooks';
// ...
const Component = () => {
    const [isToggled,toggle] = useToggle();

    return <div onClick={toggle}>{isToggled ? 'Hello' : 'World'</div>;
}
// ...
```

You can also pass the state you are looking to set the toggle to and if its already set it will not perform a state update.
```javascript
// This component will never re-render because the toggle is already set to `true`
const Component = () => {
    const [isToggled,toggle] = useToggle(true);

    return <div onClick={() => toggle(true)}>{isToggled ? 'Hello' : 'World'</div>;
}
```

#### useEffectAsync
Hook that will allow asynchronous functions to be called in the standard `useEffect` React hook.

##### Arguments
- **`effect`**: The effect to be called just like the function given to `useEffect`.
- **`inputs`**: The watch params for the effect just like the second arg in `useEffect`.

##### useEffectAsync Usage

```javascript
import React, { useState } from 'react';
import { useEffectAsync } from '@availity/hooks';
// ...
const Component = ({asyncFunction}) => {
    const [state, setState] = useState('Hello');
    useEffectAsync(async () => {
        const newState = await asyncFunction();

        setState(newState);
    },[]);

    return <div>{state}</div>
};
// ...
```