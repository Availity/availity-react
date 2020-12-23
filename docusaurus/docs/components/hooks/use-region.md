---
title: useCurrentRegion
---

Hook that returns the user's current region.

### Example

```jsx
import React from 'react';
import { useCurrentRegion } from '@availity/hooks';

const Component = () => {
  const { data: region, isFetching } = useCurrentRegion();

  return <div>{isFetching ? 'Loading...' : region?.value || 'Nowhere'}</div>;
};
```

## Props

### `options?: QueryConfig

Options to be passed to the `useQuery` hook such as `enabled`, `retry`, and `onSuccess`.

> More information on the options can be found [here](https://react-query.tanstack.com/docs/api/#usequery)
