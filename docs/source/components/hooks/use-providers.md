---
title: useProviders
summary: Hook that returns providers.
---

## Example

```jsx
import React from 'react';
import { useProviders } from '@availity/hooks';

const Component = () => {
  const { data, isFetching } = useProviders({ customerId: 01234 });

  return (
    <div>
      {isFetching
        ? 'Loading...'
        : data?.data?.providers?.[0]?.lastName || 'Dr. Availity'}
    </div>
  );
};
```

## Props

### `config: {customerId: number} & AxiosRequestConfig`

The Customer ID to retrieve the providers and other config options that can be passed to `getProviders` from `@availity/api-axios`

### `options?: QueryConfig

Options to be passed to the `useQuery` hook such as `enabled`, `retry`, and `onSuccess`.

> More information on the options can be found [here](https://react-query.tanstack.com/docs/api/#usequery)
