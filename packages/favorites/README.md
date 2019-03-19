# @availity/favorites

> Favorite Heart for favoriting items such as resources/applications etc.

## Installation

```bash
npm install @availity/favorites --save
```

### Usage

```javascript
import React from 'react';
import Favorites, { FavoriteHeart } from '@availity/favorites';
// Import the style
import '@availity/favorites/style.scss';
// ... 
<Favorites>
   <FavoriteHeart id="123456" />
</Favorites>
// ...
```

### Favorite
The Provider Component that stores all of the user's favorites for use in the favorite components.

#### Favorite Usage
```javascript
import Favorites from '@availity/favorites';

<Favorites>
// ... app
</Favorites>
```

### FavoriteHeart
The default Favorite Icon  that can be used to store a favorited item.

#### Props

- **`id`**: string. required. The unique id of the favorite item. Will be fetched from API.
- **`onChange`**: function. optional. Called once the favorite heart has been clicked and updated

#### FavoriteHeart Usage

```javascript
import React from 'react';
import Favorites, { FavoriteHeart } from '@availity/favorites';
// ... 
<Favorites>
    <FavoriteHeart id="123456" />
</Favorites>
// ...
```

#### useFavorites
Hook that will allow you to "hook" into the favorites logic and create a custom component with the same logic.

> Note you still need a `Favorites` provider above this component.

##### Arguments

- **`id`**: The id of the favorite you want to create/update.

##### useFavorites Usage

```javascript
import React, { useState } from 'react';
import { useFavorites } from '@availity/favorites';
// ...
const Component = () => {
    const [isFavorite,toggleFavorite]  = useFavorites('1234');

    return <Icon name={isFavorite?"plus-circle":"minus-circle"} onClick={toggleFavorite} />
};
// ...
```