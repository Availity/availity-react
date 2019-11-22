---
title: <PaginationContent />
---

This is the container of all the items rendered to the DOM when the `Pagination` provider receives items. Must be /nested inside a `Pagination` component.

## Example

```jsx
import React from 'react';
import { PaginationContent } from '@availity/pagination';

<PaginationContent
  loadingMessage="loading"
  component={Component}
  itemkey="id"
/>;
```

## Props

### `component? React.ComponentType`
The component to render when iterating through the current page of items. The contents of the item will be spread on the props of the component when rendered.

### `itemKey: string`
The key of the object rendered in the component to be used during mapping.

### `loadingMessage?: string`
The message to render with the loading bar when in the loading state.

### `loader?: boolean`
If `true`, calls `BlockUI` to simulate a loading state if the provider is loading.

### `containerProps?: React.HTMLAttributes<HTMLDivElement>`
Props to be spread onto the `<BlockUI />` tag.

### `containerTag?: React.ComponentType | string`
The tag to render the `<BlockUI />` as. **Default:** `div`.

### `infiniteScroll?: boolean`
If `true`, renders pagination content inside an infinite scroll component

### `infiniteScrollProps?: InfiniteScrollProps`
Only used when `infiniteScroll` is true. See [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component#props)

### `children?: React.ReactNode | ({ items?: ReactNode }) => ReactNode`
Customize the contents of what gets rendered. Children can be a react child or a function that accepts the pagination items
