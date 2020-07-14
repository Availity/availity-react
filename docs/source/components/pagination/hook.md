---
title: usePagination
---

This is a custom hook for grabbing any Pagination Data you may need from the `Pagination` provider.

## Example

```jsx
import React from 'react';
import { usePagination } from '@availity/pagination';
// ...
const PageSetter = () => {
  const { page, setPage } = usePagination();

  return (
    <input
      type="text"
      value={page}
      onChange={({ target }) => setPage(target.value)}
    />
  );
};
```

## Returns

```js
{
    pageCount: Number,
    total: Number,
    page: Array,
    currentPage: Number,
    lower: Number,
    upper: Number,
    setPage: (page: number) => void,
    loading: Boolean,
    error: Any,
    setError: (error: any) => void
}
```
