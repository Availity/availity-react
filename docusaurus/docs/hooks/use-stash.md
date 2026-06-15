---
title: useStash
---

Hook that retrieves data from the Availity Stash API by session ID.

## Usage

```jsx
import React from 'react';
import { useStash } from '@availity/hooks';

const Example = ({ sessionId }) => {
  const { data, isFetching } = useStash(sessionId);

  return <div>{isFetching ? 'Loading...' : JSON.stringify(data)}</div>;
};
```

## Parameters

#### `sessionId: string`

The stash session ID used to retrieve the stored data. The query will not execute until a valid `sessionId` is provided.

#### `options?: QueryConfig`

Options to be passed to the `useQuery` hook such as `enabled`, `retry`, and `onSuccess`.

> More information on the options can be found [here](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
