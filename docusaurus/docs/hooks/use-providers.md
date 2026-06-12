---
title: useProviders
---

Hook that returns providers.

## Usage

```jsx
import React from 'react';
import { useProviders } from '@availity/hooks';

const Example = () => {
  const { data, isFetching } = useProviders({ customerId: '01234' });

  return (
    <div>
      {isFetching
        ? 'Loading...'
        : data?.data?.providers?.[0]?.lastName || 'Dr. Availity'}
    </div>
  );
};
```

## Parameters

### `config: AvProvidersConfig`

Configuration object containing `customerId` (string) and any additional properties to pass to `getProviders` from `@availity/api-axios`.

### `options?: QueryConfig`

Options passed to the `useQuery` hook such as `enabled` and `retry`. See [useQuery docs](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).

## Return Value

Returns a `UseQueryResult` object from `@tanstack/react-query`. Key properties:

- **`data`** — The providers response object.
- **`isFetching`** — `boolean` indicating if the request is in flight.
- **`isError`** — `boolean` indicating if an error occurred.
