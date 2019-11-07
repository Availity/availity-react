---
title: <SpacesLink />
---

## Example

```jsx
import React from 'react';
import Spaces, {
  SpacesLink
} from '@availity/spaces';

<Spaces
  spaceIds={['73162546201441126239486200007187']}
  payerIds={['PayerID']}
  clientId="my-client-id"
>
  <SpacesLink spaceId="73162546201441126239486200007187" body appIcon />
</Spaces>;
```

## Props

### `spaceId?: string`

Required if `payerId` is not provided. The payer spaces ID of the payer to render the image for. If no `spaceId` or `payerId` is provided, the first space in the `spaces` array is used. Note: This is only to be used when the Spaces provider should only ever contain a single space.

### `space?: SanitizedSpace`
You don't have to use this component wrapped in the `SpacesProvider`. You can directly pass your `Space` into this, however, if you are wanting to take advantage of the sso links you will additionally need to pass the `clientId` in.

### `clientId?: string`
Required if you are passing your own `Space` in.

### `tag?: React.ComponentType | string;`
Tag to overwrite the root component rendered.

### `bodyTag?: React.ComponentType | string;`
Tag to overwrite the body component that renders the title, description and date values. It defaults to `CardBody` or `div` depending on the value of the `linkStyle` prop.

### `linkStyle?: string`
When passed in, provides predefined styles for the component. Possible values are `card`, and `list`.

### `icon?: boolean`
When `true`, will render an `@availity/icon` next to the title if present on the space.

### `description?: boolean`
When `true`, will render the `Spaces` description beneath the title.

### `appIcon?: boolean`
When `true`, renders an app icon to the left of the title and formats depending on the space information given.

### `favorite?: boolean`.
When `true`, will render the `FavoriteHeart` component to the left of the Component. Note, this does require you to have wrapped your component somewhere in the `Favorites` Provider.

### `body?: boolean`
When `true`, will render the title, and allow for the description and date info to be added on. *Default:* `true`

### `showDate?: boolean`
When `true`, will render the `activeDate` of the space.

### `showNew?: boolean`
When `true`, will render a badge if the `activeDate` is less than 30 days old.

### `size?: string`
Adjusts the icon size of the `AppIcon` if enabled.

### `stacked?: boolean`
When `true`, will render the component vertically.

### `loading?: boolean`
Optionally pass in your own loading state for the component if you are managing the state yourself.

### `clientId?: string`
If you are managing the `space` prop yourself, this is `required` when there is a space link that requires use of the `@availity/native-form`.

### `maxDescriptionLength?: number`
Allows the description length to be truncated.

### `skeletonProps?: object`

Dimensions passed to loader to show while the image is loading.