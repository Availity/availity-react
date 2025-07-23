---
title: <Space />
---

This is the provider component needed for `@availity/spaces` components to work. All `@availity/spaces` components must be children of a Spaces provider. The spaces provider is used to fetch a list of spaces for use within it's descendants.

### Props

#### `clientId?: string`

The Client ID obtained from APIConnect. Must be subscribed to the thanos API.

#### `query?: string`

Override the default thanos query

#### `variables?: object`

Override the default variables used in the thanos query. Default: `{ types: [PAYERSPACE] }`. If the spaces provider should contain configurations of a type other than `PAYERSPACE`, you _must_ override this prop.

#### `spaces?: object[]`

Array of spaces to be passed into the Spaces provider. Useful for if you already have the spaces in your app and don't want the spaces provider to have to fetch them again.

#### `spaceIds?: string[]`

Array of spaceIds the Spaces provider should fetch the spaces for. Any `spaceIds` already included in `spaces` will not be fetched again.

#### `payerIds?: string[]`

Array of payerIds the Spaces provider should fetch the spaces for. Any `payerIds` already included in `spaces` will not be fetched again.

> Note: If a payerId is associated with more than one payer space, the order in which they are returned should not be relied upon. If a specific payer space is required, you'll need to filter the list that is returned.

#### `children?: React.ReactNode | (spacesContext: SpacesContext) => ReactNode`

Children can be a react child or render prop.
