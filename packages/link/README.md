# @availity/link

> Simple link component that renders an `<a>` tag with the `href` formatted to leverage loadApp so that when the link is opened in a new tab, it gets loaded inside the home page's iframe

## Installation

```bash
npm install @availity/link --save
```

### Usage

```javascript
import React from 'react';
import AvLink from '@availity/link';
// ...
<Container>
  <AvLink url="/public/apps/my-app" target="newBody">
    {/* ... */}
  </AvLink>
</Container>
// ...
```

#### Props

- **`url`**: String. Required. The url of the page the link goes to
- **`target`**: String. Optional. Where to open the linked document
- **`tag`**: React component. Optional. The tag to use in the link that gets rendered. Defaults to an `<a>` tag

