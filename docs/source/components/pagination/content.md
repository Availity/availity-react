---
title: Default Export
---

This is the container of all the items rendered to the DOM when the `Pagination` provider receives items. Must be /nested inside a `Pagination` component.



## Implementation

### Installation

```bash
npm install @availity/pagination --save
```

### Example

```jsx live=true viewCode=true
import Pagination from '@availity/pagination';

<div>
  <ul class="pagination">
    <li class="page-item disabled"><a class="page-link" href="#">&laquo; Prev</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item"><a class="page-link" href="#">Next &raquo;</a></li>
  </ul>
</div>
```

### Props

#### `component? React.ComponentType`
The component to render when iterating through the current page of items. The contents of the item will be spread on the props of the component when rendered.

#### `itemKey: string`
The key of the object rendered in the component to be used during mapping.

#### `loadingMessage?: string`
The message to render with the loading bar when in the loading state.

#### `loader?: boolean`
If `true`, calls `BlockUI` to simulate a loading state if the provider is loading.

#### `containerProps?: React.HTMLAttributes<HTMLDivElement>`
Props to be spread onto the `<BlockUI />` tag.

#### `containerTag?: React.ComponentType | string`
The tag to render the `<BlockUI />` as. **Default:** `div`.

#### `infiniteScroll?: boolean`
If `true`, renders pagination content inside an infinite scroll component

#### `infiniteScrollProps?: InfiniteScrollProps`
Only used when `infiniteScroll` is true. See [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component#props)

#### `children?: React.ReactNode | ({ items?: ReactNode }) => ReactNode`
Customize the contents of what gets rendered. Children can be a react child or a function that accepts the pagination items


## Usage and Behavior

### Styled and Unstyled pagination

Pagination can be leveraged using two different stylistic approaches. When pagination is meant to be obvious and a primary driver of the user's activty use the styled versions of this component. When pagination is less important to the user's interaction or there is a need to downplay the affordance of pagination use the unstyled version of this component.

<div class="disclaimer">
  Do not ovveride or make custom pagination solutions. At this time we are not supporting infinite scroll. 
</div>

```jsx live=true viewCode=false
import Pagination from '@availity/pagination';

<div>
  <ul class="pagination">
    <li class="page-item disabled"><a class="page-link" href="#">&laquo; Prev</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item"><a class="page-link" href="#">Next &raquo;</a></li>
  </ul>

  <ul class="pagination pagination-unstyled">
    <li class="page-item disabled"><a class="page-link" href="#">&laquo; Prev</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item"><a class="page-link" href="#">Next &raquo;</a></li>
  </ul>
</div>
```

### Pagination using a batch selector

Pagination can additionally leverage a batch selection component. This allows users to change the amount of results they see per search. Only use this component when the user experience is impoved by a greater list of results; keep performance in mind. When defining a list of results we recommend using 10-25 as the base amount of results per page. 

<div class="disclaimer">
 Do not use this in cases where space is limited, or if larger search results might effect the performance of your application. 
</div>

```jsx live=true viewCode=false
import Pagination from '@availity/pagination';

<div>
  <div class="pagination-container">
    <ul class="pagination">
      <li class="page-item disabled"><a class="page-link" href="#">&laquo; Prev</a></li>
      <li class="page-item active"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">Next &raquo;</a></li>
    </ul>
    <div class="pagination-text">
      Show
    </div>
    <select class="custom-select" aria-label="Showing results">
      <option>10 results</option>
      <option>20 results</option>
      <option>30 results</option>
    </select>
    <div class="pagination-text">
      Showing batches 1-10 of 12
    </div>
  </div>
</div>
```


##  Accessibility

Availity is working towards creating a 508 compliant portal experience. This is an extensive undertaking that takes time. 
If at any time you find or question a component in this library to be out of 508 compliance please notify a member of the
User experience team.

<div class="disclaimer">
  This component meets WCAG 2.0 AA 508 compliance by way of WAVE, AXE, and SortSite accessibility tools.
</div>


