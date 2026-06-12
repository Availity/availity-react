---
title: useCurrentRegion
---

Hook that returns the user's current region.

## Usage

```jsx
import React from 'react';
import { useCurrentRegion } from '@availity/hooks';

const Example = () => {
  const { data: region, isFetching } = useCurrentRegion();

  return <div>{isFetching ? 'Loading...' : region?.value || 'Nowhere'}</div>;
};
```

## Parameters

### `options?: QueryConfig`

Options passed to the `useQuery` hook such as `enabled` and `retry`. See [useQuery docs](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).

## Return Value

Returns a `UseQueryResult` object from `@tanstack/react-query`. Key properties:

- **`data`** — The current region object (contains `value` property).
- **`isFetching`** — `boolean` indicating if the request is in flight.
- **`isError`** — `boolean` indicating if an error occurred.
