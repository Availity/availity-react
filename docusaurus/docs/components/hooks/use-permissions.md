---
title: usePermissions
---

Hook that returns user permissions.

### Example

```jsx
import React from 'react';
import { usePermissions } from '@availity/hooks';

const Example = () => {
  const { data, isFetching } = usePermissions();

  return (
    <div>
      {isFetching
        ? 'Loading...'
        : data?.data?.permissions?.[0]?.description || '404'}
    </div>
  );
};
```

## Props

### `config: AxiosRequestConfig`

Config passed to the `getPermissions` call from `@availity/api-axios`.

> More information about this config can be found [here](https://availity.github.io/sdk-js/api/getting-started/#config-1)

### `options?: QueryConfig`

Options to be passed to the `useQuery` hook such as `enabled`, `retry`, and `onSuccess`.

> More information on the options can be found [here](https://react-query.tanstack.com/docs/api/#usequery)
