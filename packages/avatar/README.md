# @availity/avatar

> Availity user avatar component

[![Version](https://img.shields.io/npm/v/@availity/avatar.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/avatar)

## Installation

```bash
npm install @availity/avatar --save
```

### Usage

```javascript
import React from 'react';
import Avatar from '@availity/avatar';
// ...
<Container>
  <Avatar />
</Container>
// ...
```

#### Props

- **`skeletonProps`**: Object. Optional, dimensions passed to loader to show while the avatar is loading.
- **`fallback`**: String. Optional. Default: '/public/apps/my-profile/images/Avatars-00.png'. If the url for the avatar is not not found, this fallback image url will be rendered.
