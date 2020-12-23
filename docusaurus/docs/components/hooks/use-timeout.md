---
title: useTimeout
---

Hook that returns true after the given amount of time in milliseconds.

### Example

```jsx
import React, { useState } from 'react';
import { useTimeout } from '@availity/hooks';
// ...
const Component = () => {
  const timeIsUp = useTimeout(5000);

  return <div>{timeIsUp ? 'Time is up' : 'Still waiting'}</div>;
};
// ...
```

### Props

#### `milliseconds?: number`

The number of milliseconds to wait before returning true.
