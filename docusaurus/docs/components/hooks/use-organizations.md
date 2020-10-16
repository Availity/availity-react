---
title: useOrganizations
---

Hook that returns organizations.

### Example

```jsx
import React from 'react';
import { useOrganizations } from '@availity/hooks';
// ...
const Component = () => {
  const { data, status, error } = useOrganizations();

  return (
    <div>
      {status === 'loading' ? 'Loading...' : data.data.organizations[0].name}
    </div>
  );
};
// ...
```
