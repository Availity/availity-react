---
title: <TableControls/>
---

`<TableControls/>` is a container that wraps any given components that would be utilized in concert with the table component. This includes bulk selection, bulk actions, pagination, or any custom component that could potentially be needed. There are two components provided that can be utilized within the `<TableControls>`: `<BulkTableActions/>` and `<TableSorter/>`.

### Props

#### `id?: string`
This is a unique id that used to identify the component.

#### `disabled?: boolean`
If this flag is set to `true` on the parent `<TabelControls/>` component, it will set `disabled` to `true` on all of it's child controls (for those components that have a `disabled` property and respect it).

## Example
Here is  an example of basic set up of the TableControls.
```jsx
import React, { useState } from 'react';
import Table, { TableProvider, ScrollableContainer, TableControls, TableSorter } from '@availity/table';
import '@availity/table/style.scss';

import records from 'data/records.json';

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

const MyBulkTableActions = [
    {
        id: 'action1',
        displayText: 'Action 1',
        isVisible: (records: MyRecordType[]) => {
             return every(records, record.hasAction1);
        },
        onClick: (records: MyRecordType[]) => {
            console.log(`action on record ${record.id}`);
        },
    },
    {
        id: 'action2',
        displayText: 'Action 2',
        isVisible: (records: MyRecordType[]) => {
            return every(records, !record.hasAction1);
        },
        onClick: (records: MyRecordType[]) => {
            console.log(`action on record ${record.id}`);
        },
    },
];

const Example = () : JSX.Element => (
    const [isDisabled, setIsDisabled] = useState<boolean>(records.length === 0);

    <TableProvider
        columns={columns}
        data={records}>
        <TableControls disabled={disabled}>
            <BulkTableActions/>
            <TableSorter/>
        </TableControls>
        <ScrollableContainer>
            <Table/>
        </ScrollableContainer>
    </TableProvider>
);
```

## `<BulkTableActions/>`
This component will allow you to select all and deselect all records in the table and perform actions on them. 

### Props

#### `id?: string`
This is a unique id that used to identify the component.

#### `disabled?: boolean`
If this flag is set to true, the dropdown and buttons will be disabled.

#### `recordName?: string`
This is the name of the record as it should display on the button. For instance, if the `recordName="MyRecords"`, the button will read `Select all MyRecords`, or `Deselect all MyRecords`. If no property is provided, it will default the record name to `Records`. 

#### `color?: string` 
This identifies the color variant to use for the dropdown buttons. For what variants are available, refer to Reactstrap.

#### `onRecordsSelected?: (selectedRows: object[]) => void`
If this function is provided, it will be called whenever records are selected or deselected, passing the records that are currently selected in the table. 

#### `bulkActions?: BulkRecordAction` 
This is the list of actions that are available to perform on selected records. 

#### BulkRecordAction Props
`onClick?: (selectedRecords: object[]) => void`
This is the action that is taken whenever the action is selected from the dropdown, passing the records that are currently selected in the table.

`isVisible?: (selectedRecords: object[]) => void`
This is a function that determines whether the given action should display, passing the records that are currently selected in the table.

## `<TableSorter/>`
This components supplies a dropdown of all the available sort fields, alongside a toggle that will sort that field ascending or descending. This dropdown is automatically populated by what columns allow sorting when set in the `<TableProvider>`.

#### `id?: string`
This is a unique id that used to identify the component.

#### `disabled?: boolean`
If this flag is set to true, the dropdown and buttons will be disabled.

#### `color?: string` 
This identifies the color variant to use for the dropdown buttons. For what variants are available, refer to Reactstrap.
#### `onSort?: (sortBy: TableSort) => void`

Event handler that is called when data is sorted. This passes in the current sort configuration for the table.

## Adding Additional Components

Any custom component can also be added as a child to the `<TableControls/>` component. Doing so will provide the component with the TableContext and leverage data on that context. 
