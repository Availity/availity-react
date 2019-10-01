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

Override the default variables used in the slotmachine query.

### `spaces?: Array<Object>`

Array of spaces to be passed into the Spaces provider. Useful for if you already have the spaces in your app and don't want the spaces provider to have to fetch them again.

### `spaceIds?: Array<string>`

Array of spaceIds the Spaces provider should fetch the spaces for. Any `spaceIds` already included in `spaces` will not be fetched again.

### `payerIds?: Array<string>`

Array of payerIds the Spaces provider should fetch the spaces for. Any `payerIds` already included in `spaces` will not be fetched again.
