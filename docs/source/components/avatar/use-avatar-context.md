---
title: useAvatarContext
---

If you are using a function component, you can subscribe to an avatar url by using this hook.

## Example

```jsx
import React from 'react';
import { useAvatarContext } from '@availity/Avatar';

const AvatarComponent = () => {
  const { avatar, loading } = useAvatarContext();
};
```
