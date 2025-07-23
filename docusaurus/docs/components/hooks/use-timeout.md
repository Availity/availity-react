---
title: useTimeout
---

Hook that returns true after the given amount of time in milliseconds.

### Example

```jsx
import React from 'react';
import { useTimeout } from '@availity/hooks';

const Example = () => {
  const timeIsUp = useTimeout(5000);

  return <div>{timeIsUp ? 'Time is up' : 'Still waiting'}</div>;
};
```

### Props

#### `milliseconds?: number`

The number of milliseconds to wait before returning true.
