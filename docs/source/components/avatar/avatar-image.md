---
title: <AvatarImage />
---

## Example

```jsx
import React from 'react';
import Avatar, {
  AvatarImage,
} from '@availity/avatar';

<Avatar>
  <div className="w-100 d-flex flex-row justify-content-around align-items-center">
    <AvatarImage style={{width:100}}/>
  </div>
</Avatar>
```

## Props

### `skeletonProps?: object`

Dimensions passed to loader to show while the image is loading.
