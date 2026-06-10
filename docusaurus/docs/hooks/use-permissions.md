---
title: usePermissions
---

Hook that returns user permissions.

## Usage

```jsx
import React from 'react';
import { usePermissions } from '@availity/hooks';

const Example = () => {
  const { data, isFetching } = usePermissions(['5', '10']);

  return (
    <div>
      {isFetching
        ? 'Loading...'
        : data?.data?.permissions?.[0]?.description || '404'}
    </div>
  );
};
```

## Parameters

### `config: string | string[]`

The permission ID or array of permission IDs to check.

### `options?: QueryConfig`

Options passed to the `useQuery` hook such as `enabled` and `retry`. See [useQuery docs](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).

## Return Value

Returns a `UseQueryResult` object from `@tanstack/react-query`. Key properties:

- **`data`** — The permissions response object.
- **`isFetching`** — `boolean` indicating if the request is in flight.
- **`isError`** — `boolean` indicating if an error occurred.
