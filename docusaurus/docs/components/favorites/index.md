---
title: Getting Started
---

Favorite Heart for favoriting items such as resources/applications etc.

[![Version](https://img.shields.io/npm/v/@availity/favorites.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/favorites)

### Installation

NPM

```bash
npm install @availity/favorites @availity/api-axios axios react-query
```

Yarn

```bash
yarn add @availity/favorites @availity/api-axios axios react-query
```

### Example

```jsx
import React from 'react';
import Favorites from '@availity/favorites';
import '@availity/favorites/style.scss';

const Example = () => (
  <Favorites>
    {({ default: FavoritesProvider, FavoriteHeart }) => (
      <FavoritesProvider>
        <FavoriteHeart id="12345" name="My App" />
      </FavoritesProvider>
    )}
  </Favorites>
);
```
