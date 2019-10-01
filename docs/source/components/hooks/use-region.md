---
title: useCurrentRegion
summary: Hook that returns the user's current region.
---

## Example

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
