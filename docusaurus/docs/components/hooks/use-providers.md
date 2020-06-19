---
title: useProviders
summary: Hook that returns providers.
---

## Example

```jsx
import React from 'react';
import { useProviders } from '@availity/hooks';
// ...
const Component = () => {
  const { data, status, error } = usePermissions({ customerId: 01234 });

  return (
    <div>
      {status === 'loading' ? 'Loading...' : data.data.providers[0].lastName}
    </div>
  );
};
// ...
```

## Props

### `config: {customerId: number}`

The customer id to retrieve the providers.
