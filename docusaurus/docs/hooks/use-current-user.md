---
title: useCurrentUser
---

Hook that returns the current user.

## Usage

```jsx
import React from 'react';
import { useCurrentUser } from '@availity/hooks';

const Example = () => {
  const { data: user, isFetching } = useCurrentUser();

  return <div>{isFetching ? 'Loading...' : user?.id}</div>;
};
```

## Parameters

### `options?: QueryConfig`

Options passed to the `useQuery` hook such as `enabled` and `retry`. See [useQuery docs](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).

## Return Value

Returns a `UseQueryResult` object from `@tanstack/react-query`. Key properties:

- **`data`** — The current user object.
- **`isFetching`** — `boolean` indicating if the request is in flight.
- **`isError`** — `boolean` indicating if an error occurred.
