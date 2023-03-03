---
title: Getting Started
---

This is a generic table component that wraps react-table. It also provides a mechanism for child components to have access to the table instance, in controls such as pagination and sorting.

See [react-table documentation](https://react-table.tanstack.com/docs/overview) for more information about react-table.

[![Version](https://img.shields.io/npm/v/@availity/table.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/table)

## Installation

```bash
npx install-peerdeps @availity/table --save
```

## Simple Example

```jsx
import React from 'react';
import Table, { TableContent } from '@availity/table';
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

const Example = () => <Table columns={columns} data={data} />;
```

:::info
If migrating from a @availity/table version of 0.3.2 or below, we have simplified the markup and changes will need to be made to fix this.. You just need to copy all of the properties from the original `TableProvider` component and apply them to the table. The table can now be used without the table provider. If context needs to be shared to child components, just add those components as a child of the table. See more details in the Migrating from version 0.3.x section.
:::

## Table

By default, the following react-table provided hooks are implemented:

- [useSortBy](https://react-table.tanstack.com/docs/api/useSortBy)
- [usePagination](https://react-table.tanstack.com/docs/api/usePagination)
- [useRowSelect](https://react-table.tanstack.com/docs/api/useRowSelect)
- [useColumnOrder](https://react-table.tanstack.com/docs/api/useColumnOrder)
- [useRowState](https://react-table.tanstack.com/docs/api/useRowState)

Need to add custom hooks, or implement a react-table hook that isn't displayed above? Just pass the hook into the `pluginHooks` property of the table.

### `<TableContent>`

To display a basic table, the `Table` component with no children is the only thing that needs to be implemented. However, if there are child components that need to be added, it is required to add the `<TableContent>` component wherever the table should be displayed. This allows for flexibility of where components can be displayed, either before or after the table.

### Table with Children Example

```jsx
import React from 'react';
import Table, {
  TableContent,
  TableContext,
  BulkTableActions,
  TableSorter,
} from '@availity/table';
import Pagination, { PaginationControls } from '@availity/pagination';
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
  <Table columns={columns} data={data}>
    <TableControls disabled={disabled}>
      <BulkTableActions />
      <TableSorter />
      <div style={{ marginLeft: 'auto' }}>
        <TableContext.Consumer>
          {({ instance }) => (
            <Pagination
              itemsPerPage={instance.state.pageSize}
              page={instance.currentPage}
              onPageChange={(page: number) => {
                const { gotoPage } = instance;
                gotoPage(page - 1);
              }}
              items={records}
            >
              <PaginationControls
                className="pt-3"
                listClassName="pagination-unstyled"
                directionLinks
                showPaginationText
                pageRange={3}
                marginPages={1}
              />
            </Pagination>
          )}
        </TableContext.Consumer>
      </div>
    </TableControls>
    <TableContent />
  </Table>
);
```

### Table Props

This extends the [react-table TableOptions](https://react-table.tanstack.com/docs/api/useTable#table-options).
You can supply any properties listed on the documentation here and have the table respect it.

#### `id?: string`

This is a unique id that is prepended to the table and nested table elements.

#### `columns: Column[]`

This is an array of column definitions based off of [react-table Column](https://react-table.tanstack.com/docs/api/useTable#column-options).

#### `data: object[]`

This property holds the data for the table.

#### `selectable?: boolean`

This determines whether the table is selectable or not. If it is set to true, then the first column of the table will be a checkbox column that will toggle selecting and deselecting the row.

#### `sortable?: boolean`

This determines whether the table is sortable or not.

#### `initialState?: object`

This object definition sets the initial state of the table, including the default sort by definition.

#### `additionalContent?: ReactNode`

This designates a Component that will be displayed in the table row for the record. This content displays in an additional `<tr>` with a colspan equal to the number of columns that are NOT sticky.

#### `scrollable?: boolean`

This property is automatically set when it is wrapped in a scrollable container. This will apply fixed column widths to force it to scroll rather than minify the columns to fit in a set container.

#### `paged?: boolean`

This boolean determines whether the table is paged or not. This works with the [`usePagination`](https://react-table.tanstack.com/docs/api/usePagination) hook that is documented in react-table. This defaults to false.

#### `pluginHooks?: `

Custom plugin hooks that should be passed to the table. For more information on how to utilize and apply hooks, refer to the [documentation](https://react-table.tanstack.com/docs/api/overview)

#### `bodyProps?:object`

Any DOM properties that should be passed onto the `<tbody>` element.

#### `getCellProps?: (cell: Cell<object>) => void`

This function provides any DOM properties that should be passed onto the `<td>` elements. Optionally pass in the Cell object in order to conditionally add DOM properties based on data of the cell.

#### `headerProps?: object`

Any DOM properties that should be passed onto the `<thead>` element. A special boolean property `sticky'` is added here to allow for designating the header as 'sticky' or not.

#### `getRowProps?: (row: Row<object>) => void`

This function provides any DOM properties that should be passed onto the `<tr>` element. Optionally pass in the Row object in order to conditionally add DOM properties based on the data of the row.

#### `onSort?: (sortBy: tableSort[]) => void`

This function will be called whenever the table has been sorted.

#### `getCanSelectRow: (record: T) => boolean`

This function determines if a row in a selectable table can be selected. By default if no function is provided to this property, all rows in the table are selectable.

#### `onRowClick?: (event: OnTableClickEvent) => void`

This function is called whenever a row on the table has been clicked.

#### `useColumnWidths: boolean`

When true, it will take the width as defined in the column configuration and apply it to the styles of each column. It is recommended that when this is true that you set a `defaultColumn` with a width of `auto` to ensure that the columns just take whatever width is necessary to fit the content.

#### `footer: boolean`

Determines whether a footer should be displayed. Footer configuration must be added the Column Definition for the Footer value for the column to display.

##### OnTableClickEvent Props

`instance: Row` The react-table [Row](https://react-table.tanstack.com/docs/api/useTable#row-properties) instance that was clicked.

`data: object`

This record that was clicked.

`index: number`

The index of the row that was clicked.

#### `onRowSelected?: (event: OnRowSelectedEvent) => void`

Event handler for when a row is selected.

##### OnRowSelectedEvent Props

`selectedRows: Row<T>[]`

The records that are selected.

#### `onSort?: (sortBy: TableSort) => void`

Event handler that is called when data is sorted.

##### TableSort props

`id: string`

The id, or the name of property on the object, that should be used to sort the data.

`desc: boolean`

If true, the data should sort descending. If false, the data should sort ascending.

### useTableContext hook

Any child components of the `<Table>` will have access to the TableContext, which holds all of the instance data created by the useTable hook from react-table alongside any other provided parameters.

```jsx
import { useTableContext } from './TableContext';
...
const {
    instance
} = useTableContext();
```

The `instance` property is tied directly to the [react-table Table Instance](https://react-table.tanstack.com/docs/api/useTable#instance-properties). Refer to the documentation for details on what data is provided there.

## Formatting Cells

### Action Cell

This is used to display an action menu in a cell.

#### `actions?: RecordAction<T>[]`

The actions that are present in the dropdown.

#### `primaryTableAction?:PrimaryRecordAction<T>`

This is the primary action of record. It displays as an clickable icon underneath the Action Menu on the table row.

#### `isSticky?: boolean`

When the action menu is open, setting this to true means that the action menu will maintain the same position even on scroll or resize. When false, the behavior matches the default Popper behavior of automatically calculating the correct position of the Dropdown Menu.

#### `tableActionMenuProps?: TableActionMenuProps`

Any additional properties that should be passed to the `TableActionMenu` component.

#### `tooltipProps?: UncontrolledTooltipProps`

This is only utilized when there is a primary action on the table. This will override any of the default tooltip props for the `UncontrolledTooltip` that appear when hovering over the primary action icon.

### Action Definitions

#### `isVisible?`: (record?: T) => boolean

This is an optional function that can be used to conditionally display an action. The record will be passed into the function so that, if needed, the properties on the record can determine if the action is visible or not. If this properties are not populated, the action will always display.

#### `onClick?`: (record?: T) => action

This is the onClick event handler for the action.

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
          isVisible: (record: MyRecordType) => {
            return record.hasAction1;
          },
          onClick: (record) => {
            console.log(`action on record ${record.id}`);
          },
        },
        {
          id: 'action2',
          displayText: 'Action 2',
          isVisible: (record: MyRecordType) => {
            return !record.hasAction1;
          },
          onClick: (record) => {
            console.log(`action on record ${record.id}`);
          },
        },
      ],
    }),
  },
];
```

### Badge Cell

This is used to display a Reactstrap Badge in a cell. See [Availity UI Kit](https://availity.github.io/availity-uikit/v4/components#Badges-Contextual-Variations) and [ReactStrap](https://reactstrap.github.io/components/badge/) for available stylings.

#### Usages

```jsx
const columns = [
  {
    Header: 'Badge',
    accessor: 'badge',
    Cell: ({ row: { original } }) =>
      original ? BadgeCell('success', original.badgeValue) : null,
  },
];

const columns = [
  {
    Header: 'Badge',
    accessor: 'badge',
    Cell: BadgeCell('success'),
  },
];
```

#### Props

`color: string`

The color of the badge. Refer to the Reactstrap documentation linked above for available stylings.

`displayText: string`

The text that should be displayed inside the badge.

`defaultValue: string`

An optional default value text or component that can be displayed whenever the value of the cell is not defined.

### Currency Cell

This is used to format currency in a cell. You can optionally pass it a default value to display if the value is null.

#### Usages

```jsx
const columns = [
  {
    Header: 'Currency',
    accessor: 'currency',
    Cell: CurrencyCell({ defaultValue: '$0.00' }),
  },
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
    Cell: DateCell({ dateFormat: 'MM/DD/yyyy' }),
  },
];
```

#### Props

`dateFormat: string`

The format of the date string that you want to be displayed.

`defaultValue?: string`

An optional default value text or component that can be displayed whenever the value of the cell is not defined.

`displayTooltip?: boolean`

Boolean that determines if a tooltip should be displayed on hovering over the cell. Defaults to true.

`tooltipProps?: UncontrolledTooltipProps`

This will override any of the default tooltip props for the `UncontrolledTooltip` that appear when hovering over the primary action icon.

### Icon Cell

This is used to have an cell display an icon. This will only show the icon if the value for the cell is populated (or `true`).
In order to show an icon always and not conditionally you can utilize `BuildIcon` and supply it the name of the icon and title.

See [Availity UI Kit](https://availity.github.io/availity-uikit/v4/icons) for available icons.

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

If the title of the icon is dependent on the data of the record, it is possible to pass a function to the IconCell (as `getTitle`) to populate the record.

```jsx
const columns = [
  {
    Header: <Icon name="flag" title="Flag for followup" />,
    accessor: 'followup',
    Cell: IconCell({
      name: 'flag',
      getTitle: (value: { username: string }) =>
        `Assigned To ${value.username}`,
    }),
  },
];
```

### Icon With Tooltip Cell

This cell definition is the same as the IconCell, but will display a Reactstrap tooltip when hovering over it.
An ID must be populated so that the tooltip can be applied to the correct target. You can do this by populating a `getId(row)` function to access the data in the row.

Additionally, to populate the tooltip text from the record, a `tooltipText(value)` function can be supplied to populate the tooltip text from the cell value.
If the text is the same each time, you can also just set this value to a string (`tooltipText: 'My tooltip'`).

See [Availity UI Kit](https://availity.github.io/availity-uikit/v4/icons) for available icons.

#### Usages

```jsx
    const columns = [
      Header: 'Has Middle Name',
      accessor: 'middleName'
      Cell: IconWithTooltipCell({
        name: 'ok',
        getId: (row) => `IconHasMiddleName_${row.id}`,
        tooltipText: (value) => `Middle Name: ${value}`,
        defaultValue: 'Not Available',
      }),
    ]
```

#### Props

`name: string`

The name of the icon that is displayed. See [Availity UI Kit](https://availity.github.io/availity-uikit/v4/icons) for available icons.

`defaultValue?: string`

An optional default value text or component that can be displayed whenever the value of the cell is not defined.

`tooltipText?: string | ((value: T) => string)`

The text that should display inside the tooltip. This can be either a hard coded string or a function that refers to the cell value to populate the tooltip.

`getId? (row: Row<T>) => string`

Use this to formulate an id that is unique for the table. This is required for the tooltip to be able to correctly set the target and appear on hover over the correct element.

`tooltipProps?: UncontrolledTooltipProps`

This will override any of the default tooltip props for the `UncontrolledTooltip` that appear when hovering over the primary action icon.

### Default Value Cell

This cell will display default text whenever the cell value is not defined.

#### Usages

```jsx
    const columns = [
      Header: 'Has Middle Name',
      accessor: 'middleName'
      Cell: DefaultValueCell('Not Available'),
    ]
```

#### Props

`defaultValue?: string`

An optional default value text or component that can be displayed whenever the value of the cell is not defined.

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
            Header: <Icon name="phone" title="phone/>,
            ...
        }
    ]
```

The same applies for adding a `Footer` for a column cell (make sure to also add the `footer` prop to the table to ensure that it displays).

```jsx

  const columns = [
        {
            Footer: 'My Column',
            ...
        }
    ]
```

Display a formatted header, such as an Icon.

```jsx
  const columns = [
        {
            Footer: <Icon name="phone" title="phone/>,
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

#### `hidden`

When this is true, the column will be hidden in the table.

#### `width?: number`

The width of the column. Use this in combination with `useColumnWidths` boolean on the `<Table>` component.

#### `minWidth?: number`

The min-width of the column. Use this in combination with `useColumnWidths` boolean on the `<Table>` component.

#### `maxWidth?: number`

The max-width of the column. Use this in combination with `useColumnWidths` boolean on the `<Table>` component.

#### `Footer`

What should be displayed in the Footer for the column. `footer` must be added to the table for this to display.

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
<Table
  columns={columns}
  records={records}
  headerProps={{
    sticky: true,
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

## Accessing the Table Ref in a Parent Component

It is common that a parent component will need to have access to the the table instance. This can be done utilizing React Refs.

There is now an exported `TableRef` that contains the react-table `tableInstance`.

```jsx
import React, { useRef } from 'react';
import Table, { TableRef } from '@availity/table';

import MyObject from '@types/MyObject';

type Props = {
  data: MyObject[];
};

const MyComponent = ({ data }: Props) : JSX.Element => {
  const ref = useRef<TableRef<MyObject>>(null);
  const [areAllSelected, setAreAllSelected] = useState(false);

  const columns =  useMemo(
    () =>
    [
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
    ],
    []
  );


  const toggleSelectAll = () => {
    const selectAll = !areAllSelected;
    setAreAllSelected(selectAll);
    tableRef.current?.instance?.toggleAllRowsSelected(showAll);
  };

  return (
    <>
      <Input
        id="checkSelectAll"
        aria-labelledby="lblSelectAll"
        type="checkbox"
        checked={areAllSelected}
        onChange={toggleSelectAll}
      />
      <Label id="lblSelectAll" className="ml-1 mr-2" check>
      Select All
      </Label>
   <Table ref={ref} selectable columns={columns} data={data}/>
  </>
  )
}

export const MyComponent;

```

## Migrating from version 0.3.x

To migrate from a version of `@availity/table` of 0.3.X or below, you should only need to copy all the props from the old `TableProvider` component and apply them to the table.

If `<TableControls>` are being utilized, move the `<TableControls>` to be a child of the `TableComponent` and add the `TableContent` component to where the table should be displayed relative to the table controls.

### Simple Migration

#### Before

```jsx
import React from 'react';
import Table, { TableProvider } from '@availity/table';
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
  <TableProvider columns={columns} data={data}>
    <Table />
  </TableProvider>
);
```

#### After

```jsx
import React from 'react';
import Table from '@availity/table';
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

const Example = () => <Table columns={columns} data={data} />;
```

If `<TableControls>` are being utilized, move the `<TableControls>` to be a child of the `TableComponent` and add the `TableContent` component to where the table should be displayed relative to the table controls.

### Migration with Table Controls

#### Before

```jsx
import React from 'react';
import Table, {
  TableProvider,
  TableControls,
  BulkTableActions,
  TableSorter,
  TableContext,
} from '@availity/table';
import Pagination, { PaginationControls } from '@availity/pagination';

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
  <TableProvider columns={columns} data={data}>
    <TableControls disabled={disabled}>
      <BulkTableActions />
      <TableSorter />
      <div style={{ marginLeft: 'auto' }}>
        <TableContext.Consumer>
          {({ instance }) => (
            <Pagination
              itemsPerPage={instance.state.pageSize}
              page={instance.currentPage}
              onPageChange={(page: number) => {
                const { gotoPage } = instance;
                gotoPage(page - 1);
              }}
              items={records}
            >
              <PaginationControls
                className="pt-3"
                listClassName="pagination-unstyled"
                directionLinks
                showPaginationText
                pageRange={3}
                marginPages={1}
              />
            </Pagination>
          )}
        </TableContext.Consumer>
      </div>
    </TableControls>
    <Table />
  </TableProvider>
);
```

#### After

```jsx
import React, { useState } from 'react';
import Table, { TableContent, TableControls, TableSorter, BulkTableActions} from '@availity/table';
import Pagination, { PaginationControls } from '@availity/pagination';
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

    <Table
        columns={columns}
        data={records}>
        <TableControls disabled={disabled}>
            <BulkTableActions/>
            <TableSorter/>
             <div style={{ marginLeft: 'auto' }}>
            <TableContext.Consumer>
            {({ instance }) => (
                <Pagination
                itemsPerPage={instance.state.pageSize}
                page={instance.currentPage}
                onPageChange={(page: number) => {
                    const { gotoPage } = instance;
                    gotoPage(page - 1);
                }}
                items={records}
                >
                    <PaginationControls
                        className="pt-3"
                        listClassName="pagination-unstyled"
                        directionLinks
                        showPaginationText
                        pageRange={3}
                        marginPages={1}
                    />
                </Pagination>
            )}
            </TableContext.Consumer>
            </div>
        </TableControls>
        <TableContent/>
    </Table>
);
```
