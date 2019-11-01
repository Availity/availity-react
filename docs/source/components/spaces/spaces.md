---
title: <Space /> ( Default Export )
---

This is the provider component needed for `@availity/spaces` components to work. All `@availity/spaces` components must be children of a Spaces provider.

## Props

### `clientId?: string`

The Client ID obtained from APIConnect. Must be subscribed to the slotmachine API.

### `query?: string`

Override the default slotmachine query

### `variables?: object`

Override the default variables used in the slotmachine query. Default: `{ types: ['space'] }`. If the spaces provider should contain spaces of a type other than `space`, you _must_ override this prop.

### `spaces?: Array<Object>`

Array of spaces to be passed into the Spaces provider. Useful for if you already have the spaces in your app and don't want the spaces provider to have to fetch them again.

### `spaceIds?: Array<string>`

Array of spaceIds the Spaces provider should fetch the spaces for. Any `spaceIds` already included in `spaces` will not be fetched again.

### `payerIds?: Array<string>`

Array of payerIds the Spaces provider should fetch the spaces for. Any `payerIds` already included in `spaces` will not be fetched again.

### `children?: React.ReactNode | (spacesContext: SpacesContext) => ReactNode`

Children can be a react child or render prop.

### `legacy?: boolean`

Legacy flag for rendering links on old spaces. This is temporary and should be used with caution. Unless you know what you are doing, don't use this.