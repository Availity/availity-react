---
title: useTimeout
---

Hook that returns `true` after a given delay in milliseconds.

## Usage

```jsx
import React from 'react';
import { useTimeout } from '@availity/hooks';

const Example = () => {
  const timeIsUp = useTimeout(5000);

  return <div>{timeIsUp ? 'Time is up' : 'Still waiting'}</div>;
};
```

## Parameters

### `milliseconds?: number`

The number of milliseconds to wait before returning `true`.

## Return Value

`boolean` — `false` initially, becomes `true` after the specified delay.
