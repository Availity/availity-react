---
title: useOrganizations
---

Hook that returns organizations.

## Usage

```jsx
import React from 'react';
import { useCurrentUser, useOrganizations } from '@availity/hooks';

const Example = () => {
  const { data: user } = useCurrentUser();
  const { data, isFetching } = useOrganizations(
    { params: { permissionId: ['5'], userId: user?.id } },
    { enabled: !!user?.id }
  );

  return (
    <div>
      {isFetching
        ? 'Loading...'
        : data?.data?.organizations?.[0]?.name || 'No organizations found'}
    </div>
  );
};
```

## Parameters

### `config: Record<string, unknown>`

Config object passed to the `getOrganizations` call from `@availity/api-axios`. Commonly includes `params` with `permissionId` and `userId`.

### `options?: QueryConfig`

Options passed to the `useQuery` hook such as `enabled` and `retry`. See [useQuery docs](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).

## Return Value

Returns a `UseQueryResult` object from `@tanstack/react-query`. Key properties:

- **`data`** — The organizations response object.
- **`isFetching`** — `boolean` indicating if the request is in flight.
- **`isError`** — `boolean` indicating if an error occurred.
