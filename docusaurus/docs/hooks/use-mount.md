---
title: useMount
---

Hook that runs a function on mount and optionally on unmount if a cleanup function is returned.

## Usage

```jsx
import React from 'react';
import { useMount } from '@availity/hooks';

const Example = () => {
  useMount(() => {
    doSomethingOnMount();

    return () => {
      doSomethingOnUnmount();
    };
  });

  return <div>Test Component</div>;
};
```

## Parameters

### `callback: () => void | (() => void)`

Function to run when the component mounts. If it returns a function, that function is called on unmount.
