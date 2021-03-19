---
title: <FavoriteHeart />
---

The default Favorite Icon that can be used to store a favorited item. Can only be used inside of a `<Favorites />` Provider.

### Example

```jsx
import React from 'react';
import Favorites, { FavoriteHeart } from '@availity/favorites';
import '@availity/favorites/style.scss';

const Example = () => (
  <Favorites>
    <FavoriteHeart id="12345" />
  </Favorites>
);
```

### Props

#### `id: string`

The unique id of the favorite item to be fetched from API.

#### `onChange?: (isFavorited: boolean, event?: Event) => void`

Called once the favorite heart has been clicked and updated.
