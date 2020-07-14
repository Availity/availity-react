---
<<<<<<< HEAD
title: Default Export
=======
title: <Pagination /> ( Default Export )
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
---

This is the provider component needed for `@availity/pagination` components to work. All `@availity/pagination` components must be children of a Pagination provider.

<<<<<<< HEAD
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

#### `items? Array<Object> | (currentPage: number, itemsPerPage: number) => { items: Array<Object>, totalCount: number }`

If Array, defaults `totalCount` to the length of the array, and page values are sliced from the Array. If a function, it is called with the current page as an argument and expects an array of items to be returned.

#### `itemsPerPage?: number`

The total amount of items to render at a time. ( After all the filtering ). **Default:** `10`.

#### `page?: number`

Optionally pass your own page in to make the pagination component controlled from props.

#### `onPageChange?: (page: number) => void`

Function to call after the new page has been set when the user changes the page

#### `watchList?: Array<any>`

Array of data points that, when changed, causes the pagination to update. This is helpful when the `items` prop is a function and you want `items` to be called to get the most up-to-date list.

#### `resetParams?: Array<any>`

Array of data points that, when changed, causes pagination to reset the current page to 1.

#### `defaultPage?: number`

The starting page to use when the component mounts. **Default:** `1`.

#### `debounceTimeout?: number`

The amount of time (in milliseconds) to delay fetching page data since the last time page data was fetched (debounced input). Useful for when `items` is a function that's calling an api that you want to relieve pressure on. **Default**: `0`

#### `shouldReturnPrevious?: boolean`

If `true`, the previous results are returned. Note: if no results have been fetched thus far, an empty array is returned. Useful for when `items` is a function and new results should not be fetched until certain criteria is met. **Default:** `false`.


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


=======
## Example

```jsx
import React from 'react';
import Pagination from '@availity/pagination';
// ...
<Pagination itemsPerPage={25} items={this.state.items}>
  <Pagination.Content component={Component} />
</Pagination>
```

## Props

### `items? Array<Object> | (currentPage: number, itemsPerPage: number) => { items: Array<Object>, totalCount: number }`

If Array, defaults `totalCount` to the length of the array, and page values are sliced from the Array. If a function, it is called with the current page as an argument and expects an array of items to be returned.

### `itemsPerPage?: number`

The total amount of items to render at a time. ( After all the filtering ). **Default:** `10`.

### `page?: number`

Optionally pass your own page in to make the pagination component controlled from props.

### `onPageChange?: (page: number) => void`

Function to call after the new page has been set when the user changes the page

### `watchList?: Array<any>`

Array of data points that, when changed, causes the pagination to update. This is helpful when the `items` prop is a function and you want `items` to be called to get the most up-to-date list.

### `resetParams?: Array<any>`

Array of data points that, when changed, causes pagination to reset the current page to 1.

### `defaultPage?: number`

The starting page to use when the component mounts. **Default:** `1`.

### `debounceTimeout?: number`

The amount of time (in milliseconds) to delay fetching page data since the last time page data was fetched (debounced input). Useful for when `items` is a function that's calling an api that you want to relieve pressure on. **Default**: `0`

### `shouldReturnPrevious?: boolean`

If `true`, the previous results are returned. Note: if no results have been fetched thus far, an empty array is returned. Useful for when `items` is a function and new results should not be fetched until certain criteria is met. **Default:** `false`.

### `onError?: (error: Error) => void`

Function to call when an error occurs
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
