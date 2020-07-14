---
title: useCurrentUser
summary: Hook that returns the current user.
---

## Example

```jsx
import React, { useState } from 'react';
import { useCurrentUser } from '@availity/hooks';
// ...
const Component = () => {
<<<<<<< HEAD
  const [user = {}, loading] = useCurrentUser();

  return <div>{loading ? 'Loading...' : user.id}</div>;
=======
  const { data: user, status, error } = useCurrentUser();

  return <div>{status === 'loading' ? 'Loading...' : user.id}</div>;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
};
// ...
```
