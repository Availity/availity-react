---
title: useOrganizations
summary: Hook that returns organizations.
---

## Example

```jsx
import React from 'react';
import { useCurrentUser, useOrganizations } from '@availity/hooks';

const Component = () => {
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

## Props

## `config: AxiosRequestConfig`

Config passed to the `getOrganizations` call from `@availity/api-axios`.

### `options?: QueryConfig

Options to be passed to the `useQuery` hook such as `enabled`, `retry`, and `onSuccess`.

> More information on the options can be found [here](https://react-query.tanstack.com/docs/api/#usequery)
