---
title: usePermissions
summary: Hook that returns user permissions.
---

## Example

```jsx
import React from 'react';
import { usePermissions } from '@availity/hooks';
// ...
const Component = () => {
  const { data, status, error } = usePermissions();

  return (
    <div>
      {status === 'loading'
        ? 'Loading...'
        : data.data.permissions[0].description}
    </div>
  );
};
// ...
```
