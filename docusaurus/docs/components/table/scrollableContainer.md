---
title: <ScrollableContainer/>
---

In order to make the table scrollable within a fixed container, wrap the `Table` component with the ScrollableContainer.
This will automatically set the `scrollable` property to true in the `Table` component.

```jsx
import React from 'react';
import Table, { TableProvider, ScrollableContainer } from '@availity/table';
import '@availity/table/style.scss';

const columns = [
  {
    Header: 'Column 1',
    accessor: 'column1',
  },
  {
    Header: 'Column 2',
    accessor: 'column2',
  },
  {
    Header: 'Column 3',
    accessor: 'column3',
  },
];

const Example = () => (
    <TableProvider
        columns={columns}
        data={records}>
        <ScrollableContainer>
            <Table/>
        </ScrollableContainer>
    </TableProvider>
);
```
