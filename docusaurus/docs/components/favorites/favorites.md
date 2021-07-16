---
title: <Favorites />
---

The Provider Component that stores all of the user's favorites for use in the favorite components.

### Example

```jsx
import React from 'react';
import Favorites, { FavoriteHeart } from '@availity/favorites';
import '@availity/favorites/style.scss';

const Example = () => (
  <Favorites>
    <FavoriteHeart id="12345" name="My App" />
  </Favorites>
);
```
