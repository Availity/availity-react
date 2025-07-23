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
    <FavoriteHeart id="12345" name="My App" />
  </Favorites>
);
```

### Props

#### `id: string`

The unique id of the favorite item to be fetched from API.

#### `name: string`

Name of item to be favorited. _Used to generate unique name of control, needed for accessibility._

#### `onChange?: (isFavorited: boolean, event?: Event) => void`

Called once the favorite heart has been clicked and updated.
