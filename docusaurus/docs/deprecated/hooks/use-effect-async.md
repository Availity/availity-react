---
title: useEffectAsync (Deprecated)
---

:::caution Deprecated
`useEffectAsync` is deprecated because it is an anti-pattern. Use `useEffect` with an IIFE or extract async logic into a separate function instead.
:::

Hook that allows asynchronous functions to be called in the standard useEffect hook.

## Migration

Instead of using `useEffectAsync`, call your async function inside `useEffect` directly:

```jsx
import React, { useState, useEffect } from 'react';

const Example = ({ asyncFunction }) => {
  const [state, setState] = useState('Hello');

  useEffect(() => {
    const fetchData = async () => {
      const newState = await asyncFunction();
      setState(newState);
    };
    fetchData();
  }, []);

  return <div>{state}</div>;
};
```
