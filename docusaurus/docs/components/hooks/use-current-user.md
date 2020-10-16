---
title: useCurrentUser
---

Hook that returns the current user.

### Example

```jsx
import React, { useState } from 'react';
import { useCurrentUser } from '@availity/hooks';
// ...
const Component = () => {
  const { data: user, status, error } = useCurrentUser();

  return <div>{status === 'loading' ? 'Loading...' : user.id}</div>;
};
// ...
```
