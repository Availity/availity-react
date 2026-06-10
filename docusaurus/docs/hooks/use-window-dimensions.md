---
title: useWindowDimensions
---

Hook that returns the window's current dimensions. Updates on resize.

## Usage

```jsx
import React from 'react';
import { useWindowDimensions } from '@availity/hooks';

const Example = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div>
      Current Window Dimensions: height: {height}, width: {width}
    </div>
  );
};
```

## Parameters

None.

## Return Value

`{ height: number, width: number }` — The current window inner height and width in pixels.
