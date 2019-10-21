---
title: useSpace
---

This is a custom hook for grabbing any Spaces data you may need from the `Spaces` provider.

## Example

```jsx
import React from 'react';
import { useSpace } from '@availity/spaces';

const SpacesComponent = () => {
  // id can be a space or a payer id
  const { space, isGhost, loading, error } = useSpace(id);
};
```
