---
title: <SpacesDisclaimer />
---

This component must be a descendent of the `<Spaces/>` provider. Display the disclaimer for a given space id received from the `<Spaces />` provider.

### Example

```jsx
import React from 'react';
import Spaces, { SpacesDisclaimer } from '@availity/spaces';

const Example = () => (
  <Spaces
    spaceIds={['73162546201441126239486200007187']}
    clientId="my-client-id"
  >
    <SpacesDisclaimer markdown styled />
  </Spaces>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-spaces--disclaimer"> Storybook</a>

### Props

#### `spaceId?: string`

The id of the space to render the disclaimer for. If no `spaceId` is provided, the first space in the `spaces` array is used. Note: This is only to be used when the Spaces provider should only ever contain a single space.

#### `markdown?: boolean`

Render the disclaimer as markdown.

#### `styled?: boolean`

When true, a vertical bar is displayed to the left of the disclaimer
