---
title: usePagination
---

This is a custom hook for grabbing any Pagination Data you may need from the `Pagination` provider.

### Example

```jsx
import React from 'react';
import { usePagination } from '@availity/pagination';

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

### Returns

```ts
type Return = {
  pageCount: number;
  total: number;
  page: Array;
  currentPage: number;
  lower: number;
  upper: number;
  setPage: (page: number) => void;
  loading: boolean;
  error: any;
  setError: (error: any) => void;
};
```
