---
title: useCurrentUser
summary: Hook that returns the current user.
---

## Example

```jsx
import React, { useState } from 'react';
import { useCurrentUser } from '@availity/hooks';

const Component = () => {
  const { data: user, isFetching } = useCurrentUser();

  return <div>{isFetching ? 'Loading...' : user.id}</div>;
};
```

## Props

### `options?: QueryConfig

Options to be passed to the `useQuery` hook such as `enabled`, `retry`, and `onSuccess`.

> More information on the options can be found [here](https://react-query.tanstack.com/docs/api/#usequery)
