---
title: useToggle
---

Hook that returns a boolean that can easily be toggled. Useful for loaders and toggle components.

## Usage

```jsx
import React from 'react';
import { useToggle } from '@availity/hooks';

const Example = () => {
  const [isToggled, toggle] = useToggle();

  return <div onClick={toggle}>{isToggled ? 'Hello' : 'World'}</div>;
};
```

You can also pass a specific state to `toggle`:

```jsx
const [isToggled, toggle] = useToggle(true);

// Force to true (no state update if already true)
toggle(true);
```

## Parameters

### `initialState?: boolean`

The initial state of the toggle. **Default:** `false`.

## Return Value

`[boolean, (nextState?: boolean) => void]` — A tuple of the current state and a toggle function. The toggle function accepts an optional boolean to set a specific state.
