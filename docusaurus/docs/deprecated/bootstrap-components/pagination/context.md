---
title: PaginationContext
---

If you are using a class component, you can subscribe to the pagination by using this context.

### Example

```jsx
import React from 'react';
import { PaginationContext } from '@availity/pagination';

class PageSetter extends React.Component {
  render() {
    const { page, setPage } = this.context;

    return (
      <input
        type="text"
        value={page}
        onChange={({ target }) => setPage(target.value)}
      />
    );
  }
}

PageSetter.contextType = PaginationContext;
```
