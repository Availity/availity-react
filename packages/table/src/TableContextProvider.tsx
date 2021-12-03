import React from 'react';
import { useRowSelect, useSortBy, useTable } from 'react-table';
import filter from 'lodash/filter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { AvailityTableState, TableContext, TableSortOption } from './TableContext';
import { Cell, Column, TableInstance } from '.';

export type Props = {
    additionalContent?: React.ElementType;
    children: React.ReactChild | React.ReactChild[];
    columns: Column[];
    records: any[];
    scrollable?: boolean;
    selectable?: boolean;
    sortable?: boolean;
    initialState?: Partial<AvailityTableState>;
};

const TableContextProvider = ({
    additionalContent: AdditionalContent,
    columns,
    records,
    selectable,
    scrollable,
    sortable,
    initialState,
    children
}: Props) => {
    let selectionColumn: any;

    const getSortableColumns = (): TableSortOption[] => {
        return filter(columns, (column => {
            return !column.disableSortBy && column.defaultCanSort;
        })).map(column => {
            const col = column as Column;
            return { value: col.accessor as string, label: col.Header as string };
        });
    }

    const tableInstance = useTable(
        {
            columns,
            data: records,
            initialState: initialState || {},
        },
        useSortBy,
        useRowSelect,
        (hooks: any) => {
            selectionColumn = {
                id: 'selection',
                title: 'Select record(s)',
                className: 'fixed-width-selection',
                defaultCanSort: false,
                disableSortBy: true,
                disableClick: true,
                Header: ({ getToggleAllRowsSelectedProps }: any) => (
                    <div className="text-center">
                        <IndeterminateCheckbox
                            data-testid="table_header_select_all"
                            aria-label="Select all records"
                            {...getToggleAllRowsSelectedProps()}
                        />
                    </div>
                ),
                Cell: ({ row: { getToggleRowSelectedProps, index } }: Cell) => (
                    <div className="text-center">
                        <IndeterminateCheckbox
                            data-testid={`table_header_select_row_${index}`}
                            aria-label="Select record"
                            {...getToggleRowSelectedProps()}
                        />
                    </div>
                ),
            };

            hooks.visibleColumns.push((columns: Column[]) => [selectionColumn, ...columns]);
        }
    );

    return (
        <TableContext.Provider
            value={{
                AdditionalContent,
                selectable,
                scrollable,
                sortable,
                initialState,
                sortOptions: getSortableColumns(),

                instance: tableInstance as TableInstance

            }}
        >
            {children}
        </TableContext.Provider>);

}

export default TableContextProvider;