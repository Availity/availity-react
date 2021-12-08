---
title: Getting Started
---

This is a generic table component that wraps react-table.
See [react-table documentation](https://react-table.tanstack.com/docs/overview).

[![Version](https://img.shields.io/npm/v/@availity/table.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/table)

## Installation

```bash
npx install-peerdeps @availity/table --save
```

## Simple Example

```jsx
import React from 'react';
import Table from '@availity/table';
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
    <TableProvider
        columns={columns}
        records={data}>
        <Table/>
    </TableProvider>
);
```

## Table Provider Props

#### `id?: string`

This is a unique id that is prepended to the table and nested table elements.

#### `columns: Column[]`

This is an array of column definitions based off of [react-table Column](https://react-table.tanstack.com/docs/api/useTable#column-options).

#### `records: object[]`

This property holds the data for the table.

#### `scrollable?: boolean`

This property is automatically set when it is wrapped in a scrollable container. This will apply fixed column widths to force it to scroll rather than minify the columns to fit in a set container.

#### `selectable?: boolean`

This determines whether the table is selectable or not. If it is set to true, then the first column of the table will be a checkbox column that will toggle selecting and deselecting the row.

#### `sortable?: boolean`

This determines whether the table is sortable or not. 

#### `initialState?: object`

This object definition sets the initial state of the table, including the default sort by definition.

#### `additionalContent?: ReactNode`

This designates a Component that will be displayed in the table row for the record. This content displays in an additional `<tr>` with a colspan equal to the number of columns that are NOT sticky.  


Event handler for clicking on a row. 

## Table Props

#### `bodyProps?:object`

Any DOM properties that should be passed onto the `<tbody>` element.

#### `cellProps?: object`

Any DOM properties that should be passed onto the `<td>` elements.

#### `headerProps?: object`

Any DOM properties that should be passed onto the `<thead>` element.

#### `rowProps?: object`

Any DOM properties that should be passed onto the `<tr>` element.

#### `onRowClick?: (event: OnTableClickEvent) => void`
##### OnTableClickEvent Props

`instance: Row`

The react-table [Row](https://react-table.tanstack.com/docs/api/useTable#row-properties) instance that was clicked.

`data: object`

This record that was clicked.

`index: number`

The index of the row that was clicked.

#### `onRowSelected?: (event: OnRowSelectedEvent) => void`

Event handler for when a row is selected. 

##### OnRowSelectedEvent Props

`selectedRows: string[] | number[]`

The ids of the records that are selected.

## Formatting Cells

```jsx
import React from 'react';
import Table, { Cell } from '@availity/table';
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
    <Table
        columns={columns}
        records={data}
    >
);
```


### Action Cell

This is used to display an action menu in a cell. 

#### Example

```jsx

 const columns = [
  {
    id: 'actions',
    Header: 'Actions',
    Cell: ActionCell({
      actions: [
        {
          id: 'action1',
          displayText: 'Action 1',
          onClick: (record) => {
            console.log(`action on record ${record.id}`);
          },
        },
        {
          id: 'action2',
          displayText: 'Action 2',
          onClick: (record) => {
            console.log(`action on record ${record.id}`);
          },
        },
      ],
    }),
  }];
```

### Badge Cell

This is used to display a Reactstrap Badge in a cell. See [Availity UI Kit](https://availity.github.io/availity-uikit/v3/components#Badges-Contextual-Variations) and [ReactStrap](https://reactstrap.github.io/components/badge/) for available stylings. 

#### Usages

```jsx

 const columns = [
    {
        Header: 'Badge',
        accessor: 'badge',
        Cell: ({ row: { original } }) =>
        original ? BadgeCell('success', original.badgeValue) : null
    }
  ];

   const columns = [
    {
        Header: 'Badge',
        accessor: 'badge',
        Cell: Badgecell('success')
    }
  ];
```

### Currency Cell

This is used to format currency in a cell. You can optionally pass it a default value to display if the value is null.

#### Usages

```jsx

 const columns = [
    {
        Header: 'Currency',
        accessor: 'currency',
        Cell: CurrencyCell({defaultValue: '$0.00'})
    }
  ];
```
#### Props
`currency`

Defaults to `USD`.

`defaultValue`

The value that should display if the value of the currency property is not defined. Defaults to `''`.

`locales`

The locale of the currency. Defaults to `en-us`.

### Date Cell

This is used to format a date in a cell by passing in a date format. 

#### Usages

```jsx

 const columns = [
        {
            Header: 'Service Date',
            accessor: 'serviceDate',
            Cell: DateCell({ dateFormat: 'MM/DD/yyyy' })
        }
  ];
```

### Icon Cell

This is used to have an cell display an icon. This will only show the icon if the value for the cell is populated (or `true`). 
In order to show an icon always and not conditionally you can utilize `BuildIcon` and supply it the name of the icon and title.


See [Availity UI Kit](https://availity.github.io/availity-uikit/v3/icons) for available icons. 



#### Usages

To always display an icon, you can configure the column to just pass in the @availity/Icon component.
In the body of the table, the icon is displayed if the hasNotes property is set to true.

```jsx
    const columns = [
            {
                Header: <Icon name='doc-alt' title='Has Notes'/>),
                accessor: 'hasNotes',
                Cell: IconCell({ name: 'doc-alt', title: 'View Notes' }),
            }
    ]
```

If the title (tooltip) of the icon is dependent on the data of the record, it is possible to pass a function to the IconCell to populate the record.

```jsx
    const columns = [
            {
                Header: <Icon name='flag' title='Flag for follup'/>,
                accessor: 'followup',
                Cell: IconCell({ name: 'flag', title: (value: { username: string; }) => `Assigned To ${value.username}`}),
            }
    ]
```

## Column Configuration Properties

To see a comprehensive list of available properties for column configuration, view the [react-table documentation](https://react-table.tanstack.com/docs/api/useTable#column-options).

The following properties are some key ones to get going:

#### `Header`

This is the table header. You can either provider a string or function.

Display a header as a static string:

```jsx

  const columns = [
        {
            Header: 'My Column',
            ...
        }
    ]
```

Display a formatted header, such as an Icon. 

```jsx
  const columns = [
        {
            Header: () => <Icon name="phone" title="phone/>,
            ...
        }
    ]
```

#### `accessor`

This is the property name from the record. 

#### `Cell`

This is key for customizing how the data is presented in the cell.

#### `disableSortBy`

When inside a sortable table, this designates that the column is not sortable.

The `@availity/table` extends the react-table with some additional properties as follows.

#### `stickyLeft`

This makes the column sticky to the left side of the table. This works best when inside a scrollable container. Not supported in IE11.

#### `stickyRight`

This makes the column sticky to the right side of the table. This works best when inside scrollable container. Not supported in IE11.

#### `disableClick`

When there is an on OnRowClick event populated, this designates that the column should not be clickable and not call that event. This is helpful for actions columns or cells that contain links or special functions.

## Styling the Table

In order to get the out-of-the-box styles for the table you can import the table scss file. You can also supply classNames to `bodyProps`, `cellProps`, `headerProps`, or `rowProps`.

### SASS variables

Custom styling the table can be accomplished by setting the SASS variables prior to importing the scss file:

```scss
$av-table-header-background-color: #3e6887;
$av-table-header-text-color: #ffffff;
$av-table-header-cell-hover-color: #365b77;
$av-table-selected-background-color: #ccdee2;
$av-table-sort-icon-color: #fff;
$av-table-font-size: 12px;
$av-table-selected-background-color: #ccdee2;

@import '~@availity/table/styles.scss';

```
The following are the available variables to utilize.

```
$av-table-background-color: #f2f2f2 !default;
$av-table-even-background-color: #ffffff !default;
$av-table-odd-background-color: #f2f2f2 !default;
$av-table-selected-background-color: #ecf0f3 !default;

$av-table-header-background-color: #ffffff !default;
$av-table-header-text-color: #000 !default;
$av-table-header-cell-hover-color: #f2f2f2 !default;
$av-table-header-height: 36px !default;
$av-table-scrollable-height: 69vh !default;
$av-table-scrollable-max-height: 100vh !default;

$av-table-fixed-text-column-width: 160px !default;
$av-table-fixed-icon-column-width: 27px !default;
$av-table-fixed-selection-column-width: 50px !default;
$av-table-action-column-width: 50px !default;

$av-table-border-color: #ddd !default;
$av-table-action-menu-color: #333 !default;
$av-table-sort-icon-color: #000 !default;
$av-table-font-size: 1rem !default;

$av-table-additional-content-background-color: #fff !default;
```

### Sticky Headers and Sticky Columns

You can configure the table header to be sticky by setting the `headerProps.sticky` property to `true`.
This works best when the table is wrapped in a `<ScrollableContainer/>`.

```jsx
    <Table columns={columns} records={records}
        headerProps={{
            sticky: true
        }}
    />

```

You can also can configure a column to be sticky either left or right. This can be configured on in the column definitions for the table. 

```jsx
const columns = [
    {
        id: 'actions',
        stickyRight: true,
        ...
    }
];

```

Note that this is not supported in IE 11. 