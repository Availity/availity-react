---
title: useMount
---

Hook that runs a function on mount and dismount if a function is returned.

### Example

```jsx
import React from 'react';
import { useMount } from '@availity/hooks';

const Example = () => {
  useMount(() => {
    doSomethingOnMount();

    return () => {
      doSomethingOnDismount();
    };
  });

  return <div>Test Component</div>;
};
```

### Props

#### `callback: () => void`

Function to run when the component mounts.
