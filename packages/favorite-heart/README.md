# @availity/favorite-heart

> Favorite Heart for favoriting items such as resources/applications etc.

## Installation

```bash
npm install @availity/favorite-heart --save
```

### Usage

```javascript
import React from 'react';
import FavoriteHeart from '@availity/favorite-heart';
// ... 
<FavoriteHeart id="123456" />
// ...
```

### FavoriteHeart
The main Favorite Component that can be used to store a favorited item.

#### Props

- **`id`**: string. required. The unique id of the favorite item. Will be fetched from API.

#### FavoriteHeart Usage

```javascript
import React from 'react';
import FavoriteHeart from '@availity/favorite-heart';
// ... 
<FavoriteHeart id="123456" />
// ...
```

#### useFavorites
Hook that will allow you to "hook" into the favorites logic and create a custom component with the same logic.

##### Arguments

- **`id`**: The id of the favorite you want to create/update

##### useFavorites Usage

```javascript
import React, { useState } from 'react';
import { useFavorites } from '@availity/favorite-heart';
// ...
const Component = () => {
    const [isFavorite,toggleFavorite]  = useFavorites('1234');

    return <Icon name={isFavorite?"plus-circle":"minus-circle"} onClick={toggleFavorite} />
};
// ...
```