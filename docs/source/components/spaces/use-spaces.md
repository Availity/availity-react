---
title: useSpaces
---

This is a custom hook for grabbing spaces from the `Spaces` provider.

`useSpaces` accepts a single optional argument: `ids`. `useSpaces` returns a tuple containing the spaces for the `ids` passed in, in the order they are passed in. If there is no space in the `Spaces` provider for an id, it is returned as `undefined`.  If no `ids` are passed in, all spaces from the `Spaces` provider are returned.

## Example

```jsx
import React from 'react';
import { useSpaces } from '@availity/spaces';

const SpacesComponent = () => {
  // ids can be space ids or payer ids
  const [space1, space2, space3] = useSpaces(['1', '2', 3']);
};
```

