---
title: useToggle
---

Returns a boolean that can easily be toggled. Useful for loaders, and toggle components.

### Example

```jsx
import React from 'react';
import { useToggle } from '@availity/hooks';

const Example = () => {
  const [isToggled, toggle] = useToggle();

  return <div onClick={toggle}>{isToggled ? 'Hello' : 'World'}</div>;
};
```

You can also pass the state you want to set the toggle to. If it hasn't changed, it will not perform a state update.

```jsx
import React from 'react';
import { useToggle } from '@availity/hooks';

// This component will never re-render because the toggle is already set to `true`
const Example = () => {
  const [isToggled, toggle] = useToggle(true);

  return (
    <div onClick={() => toggle(true)}>{isToggled ? 'Hello' : 'World'}</div>
  );
};
```

### Props

#### `initialState?: boolean`

The intital state of the toggle. **Default:** `false`
