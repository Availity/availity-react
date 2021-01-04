---
title: useFavorites
---

Hook that allows you to "hook" into the favorites logic and create a custom component with the same logic. Can only be used inside of a `<Favorites />` Provider.

### Arguments

- **`id`**: The id of the favorite you want to create/update.

### Example

```jsx
import React, { useState } from 'react';
import { useFavorites } from '@availity/favorites';

const Example = () => {
  const [isFavorite, toggleFavorite] = useFavorites('1234');

  return (
    <Icon
      name={isFavorite ? 'plus-circle' : 'minus-circle'}
      onClick={toggleFavorite}
    />
  );
};
```
