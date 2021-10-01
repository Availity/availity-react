---
title: <ScrollableContainer/>
---

```jsx
import React from 'react';
import Table, { ScrollableContainer } from '@availity/table';
import '@availity/table/style.scss';

const myTableConfig = {
    columns: [
        {
            Header: 'Column 1',
            accessor: 'column1'
        },
        {
            Header: 'Column 2',
            accessor: 'column2' 
        },
                {
            Header: 'Column 3',
            accessor: 'column3' 
        },
    ]
}

const Example = () => (
    <ScrollableContainer>
        <Table
            columns={columns}
            records={data}
        />
    </ScrollableContainer>
);
```