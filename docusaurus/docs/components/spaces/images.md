---
title: <SpacesImage />
---

### Example

```jsx
import React from 'react';
import Spaces, {
  SpacesLogo,
  SpacesBillboard,
  SpacesTile,
  SpacesImage,
} from '@availity/spaces';

const Example = () => (
  <Spaces
    spaceIds={['73162546201441126239486200007187']}
    payerIds={['PayerID']}
    clientId="my-client-id"
  >
    <SpacesLogo spaceId="73162546201441126239486200007187" />
    <SpacesBillboard payerId="PayerID" />
    <SpacesTile payerId="PayerID" />
    <SpacesImage payerId="PayerID" />
  </Spaces>
);
```

#### Live example: <a href="https://availity.github.io/availity-react/storybook/?path=/story/components-spaces--images"> Storybook</a>

### Props

#### `spaceId?: string`

Required if `payerId` is not provided. The payer spaces ID of the payer to render the image for. If no `spaceId` or `payerId` is provided, the first space in the `spaces` array is used. Note: This is only to be used when the Spaces provider should only ever contain a single space.

#### `payerId?: string`

Required if `spaceId` is not provided. The payer ID of the payer to render the image for. If no `spaceId` or `payerId` is provided, the first space in the `spaces` array is used. Note: This is only to be used when the Spaces provider should only ever contain a single space.

> Note: If the payerId is associated with more than one payer space, the order in which they are returned should not be relied upon. If a specific payer space is required, you'll need to filter the list that is returned.

#### `skeletonProps?: object`

Dimensions passed to loader to show while the image is loading.

#### `fallback?: string`

The fallback image url to render if the url for the spaces image is not valid or not found

#### `imageType?: string`

The path on the space containing the image reference. Defaults to: `"url"`.
