---
title: useWindowDimensions
---

Hook that returns the window's current dimensions

### Example

```jsx
import React from 'react';
import { useWindowDimensions } from '@availity/hooks';

const Example = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div>
      {' '}
      Current Window Dimensions: height: {height}, width: {width}
    </div>
  );
};
```
