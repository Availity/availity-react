---
title: <SpacesLink />
---

The `<SpacesLink />` component is used to handle the complexities of configuration navigation. This includes standard links, legacy SSO links, and Magneto SSO links.

`<SpacesLink />` also includes some additional functionality. Top Apps can be updated on click. Configuration favoriting can be handled. A "New!" badge can be displayed based on the configuration's activeDate. Images and Icons can also be displayed.

> NOTE: Using `<SpacesLink />` depends on [`react-query`](https://react-query.tanstack.com/overview)

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

Required if `payerId` is not provided. If no `spaceId` or `payerId` is provided, the first space in the `spaces` array is used. Note: This is only to be used when the Spaces provider should only ever contain a single space.

### `space?: SanitizedSpace`

You don't have to use this component wrapped in the `SpacesProvider`. You can directly pass your `Space` into this, however, if you are wanting to take advantage of the sso links you will additionally need to pass the `clientId` in.
Use to directly pass a space to the component rather than have it fetched from the spaces API. This component does not have to be a child of a SpacesProvider." and move the note about clientId and sso links to the clientId prop

### `clientId?: string`

Required when space is not provided, or space is provided and space contains an sso link.

### `tag?: React.ComponentType | string;`

Tag to overwrite the root component rendered.

### `bodyTag?: React.ComponentType | string;`

Tag to overwrite the body component that renders the title, description and date values. It defaults to `CardBody` or `div` depending on the value of the `linkStyle` prop.

### `titleTag: React.ComponentType | string`

Tag to overwrite the title component. If `linkStyle` prop is set to `"card"`, defaults to `CardTitle`. If `linkStyle` is set to `"list"`, defaults to `ListGroupItemHeading`. Otherwise, defaults to `div`.

### `textTag: React.ComponentType | string`

Tag to overwrite the text component. If `linkStyle` prop is set to `"card"`, defaults to `CardText`. If `linkStyle` is set to `"list"`, defaults to `ListGroupItemText`. Otherwise, defaults to `div`.

### `linkStyle?: string`

When passed in, provides predefined styles for the component. Possible values are `card`, and `list`.

### `icon?: boolean`

When `true`, renders an `@availity/icon` next to the title if present on the space.

### `description?: boolean`

When `true`, renders the `Spaces` description beneath the title.

### `appIcon?: boolean`

When `true`, renders an app icon to the left of the title and formats depending on the space information given.

### `favorite?: boolean`

When `true`, renders the `FavoriteHeart` component to the left of the Component. Note, this does require you to have wrapped your component somewhere in the `Favorites` Provider. This also requires the peerDependency [`react-query`](https://react-query.tanstack.com/overview).

### `body?: boolean`

When `true`, renders the title, and allow for the description and date info to be added on. *Default:* `true`

### `showDate?: boolean`

When `true`, renders the `activeDate` of the space.

### `showNew?: boolean`

When `true`, renders a "New!" badge if the `activeDate` is less than 30 days old.

### `size?: string`

Adjusts the icon size of the `AppIcon` if enabled.

### `stacked?: boolean`

When `true`, renders the component vertically.

### `loading?: boolean`

Optionally pass in your own loading state for the component if you are managing the state yourself.

### `maxDescriptionLength?: number`

Allows the description length to be truncated.

### `skeletonProps?: object`

Dimensions passed to loader to show while the image is loading.

### `linkAttributes?: object`

Additional attributes you may want to tack onto the `native-form` when submitting a SAML sso. i.e. `spaceId` or `sourceApplicationId`

#### `children?: React.ReactNode | (spacesContext: SpacesContext) => ReactNode`

Children can be a react child or render prop.

### `card: boolean`

When `true`, utilizes the reactstrap `Card` component for styling.

### `role: string`

Allows the role oof the root component to be overwritten. If `linkStyle` prop is set to `"list"`, defaults to "listitem".

### `analytics: object`

When Analytics props are passed inside the analytics props, they will be passed down to the click item. For more information on Analytics props see: [Autotrack Logged Events](https://availity.github.io/sdk-js/resources/analytics#autotrack-logged-events)