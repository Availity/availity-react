---
title: <AvResourcePagination />
---

This is a wrapper around the `Pagination` Component that can be used for paginating `@availity/api-axios` resources.

## Example

```jsx
import React from 'react';
import { AvResourcePagination, PaginationControls } from '@availity/pagination';
import { avOrganizationsApi } from '@availity/api-axios';

<AvResourcePagination resource={avOrganizationsApi} itemsPerPage={25}>
  <PaginationControls />
</AvResourcePagination>
```

## Props

In addition to `Pagination` props:

### `resource: ApiResource`

Availity API resource (see [@availity/api-core](https://github.com/Availity/sdk-js/tree/master/packages/api-core) and [@availity/api-axios](https://github.com/Availity/sdk-js/tree/master/packages/api-axios)).

### `getResult?: string | (data: object) => Array<Object>`

When a function, the function is called with the response body from the API call and is expected to return an array containing the list of items for the page. When a string, the string is expected to be a simple key used to get the value from the response. ("simple" means dot notation is not supported for grabbing values from nested objects. If your result is deeply nested, provide a function.)

### `parameters?: object`

Object used to create querystring parameters in the request.
