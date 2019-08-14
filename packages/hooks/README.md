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
const Component = ({ asyncFunction }) => {
  const [loading, toggleLoading] = useToggle(true);

  useEffectAsync(async () => {
    // ... do async things
    await asyncFunction();

    toggleLoading();
  }, []);

  return <div>{loading ? 'Hello' : 'World'}</div>;
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

    return <div onClick={toggle}>{isToggled ? 'Hello' : 'World'}</div>;
}
// ...
```

You can also pass the state you are looking to set the toggle to and if its already set it will not perform a state update.

```javascript
// This component will never re-render because the toggle is already set to `true`
const Component = () => {
    const [isToggled,toggle] = useToggle(true);

    return <div onClick={() => toggle(true)}>{isToggled ? 'Hello' : 'World'}</div>;
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
const Component = ({ asyncFunction }) => {
  const [state, setState] = useState('Hello');
  useEffectAsync(async () => {
    const newState = await asyncFunction();

    setState(newState);
  }, []);

  return <div>{state}</div>;
};
// ...
```

#### useTimeout

Hook that will return `true` after the given amount of time in milliseconds.

##### Arguments

- **`milliseconds`**: The number of milliseconds to wait before returning true.

##### useTimeout Usage

```javascript
import React, { useState } from 'react';
import { useTimeout } from '@availity/hooks';
// ...
const Component = () => {
  const timeIsUp = useTimeout(5000);

  return <div>{timeIsUp ? 'Time is up' : 'Still waiting'}</div>;
};
// ...
```

#### useMount

Hook that will run a function on mount and dismount if a function is returned.

##### Arguments

- **`callback`**: Required function which will run.

##### useMount Usage

```javascript
import React, { useState } from 'react';
import { useMount } from '@availity/hooks';
// ...
const Component = () => {
  useMount(() => {
    doSomethingOnMount();

    return () => {
      doSomethingOnDismount();
    };
  });

  return <div>Test Component</div>;
};
// ...
```


#### useCurrentRegion

Hook that will return the current user's region.


##### useCurrentRegion Usage

```jsx
import React, { useState } from 'react';
import { useCurrentRegion } from '@availity/hooks';
// ...
const Component = () => {
  const [region, loading] = useCurrentRegion();

  return <div>{loading ? 'Loading...' : region.value}</div>;
};
// ...
```


#### useCurrentUser

Hook that will return the current user.


##### useCurrentUser Usage

```jsx
import React, { useState } from 'react';
import { useCurrentUser } from '@availity/hooks';
// ...
const Component = () => {
  const [user = {}, loading] = useCurrentUser();

  return <div>{loading ? 'Loading...' : user.id}</div>;
};
// ...
```
