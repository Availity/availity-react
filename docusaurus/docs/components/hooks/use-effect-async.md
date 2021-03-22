---
title: useEffectAsync
---

Hook that allows asynchronous functions to be called in the standard useEffect hook.

### Example

```jsx
import React, { useState } from 'react';
import { useEffectAsync } from '@availity/hooks';

const Example = ({ asyncFunction }) => {
  const [state, setState] = useState('Hello');

  useEffectAsync(async () => {
    const newState = await asyncFunction();

    setState(newState);
  }, []);

  return <div>{state}</div>;
};
```

### Props

#### `effect: React.useEffect`

The effect to call - just like the function given to `useEffect`.

#### `inputs: any[]`

The watch params for the effect - just like the second arg in `useEffect`.
