---
title: Getting Started
summary: Favorite Heart for favoriting items such as resources/applications etc.
---

## Installation

```bash
npx install-peerdeps @availity/favorites --save
```

## Example

```jsx
import Favorites from '@availity/favorites';
import '@availity/favorites/style.scss';

<div className="w-100 d-flex flex-row justify-content-around align-items-center">
  <Favorites>
    {({ default: FavoritesProvider, FavoriteHeart }) => (
      <FavoritesProvider>
        <FavoriteHeart id="12345" />
      </FavoritesProvider>
    )}
  </Favorites>
</div>;
```
