---
title: <SpacesGhostText />
---

Display the ghost text for a given space. Renders `null` if the ghost text should not display.

### Example

```jsx
import React from 'react';
import Spaces, { SpacesGhostText } from '@availity/spaces';

const Example = () => (
  <Spaces
    spaceIds={['73162546201441126239486200007187']}
    clientId="my-client-id"
  >
    <SpacesGhostText />
  </Spaces>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/bootstrap-components-spaces--ghost-text"> Storybook</a>

### Props

#### `spaceId?: string`

The id of the space to render the ghost text for. If no `spaceId` is provided, the first space in the `spaces` array is used. Note: This is only to be used when the Spaces provider should only ever contain a single space. |
