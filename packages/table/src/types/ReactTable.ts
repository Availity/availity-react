import {
    Row as RtRow,
    Cell as RtCell,
    HeaderGroup,
    Column as RtColumn,
    TableInstance as RtTableInstance,
    TableOptions as RtTableOptions,
    UseSortByInstanceProps,
    UseRowSelectInstanceProps,
    TableState,
    UseSortByColumnProps,
    UseTableHeaderGroupProps,
    UseRowSelectOptions,
    UseTableOptions
} from 'react-table';
import { TableRecord } from './TableRecord';

import { TableSortConfig } from './TableSortConfig';

export type Row = RtRow & {
    toggleRowSelected: () => void;
    getToggleRowSelectedProps: () => void;
    original: TableRecord;
};

export type Column = RtColumn & {
    className ?: string;
    stickyRight ?: boolean;
    stickyLeft ?: boolean;
    disableClick ?: boolean;
    title ?: string;
    defaultCanSort ?: boolean;
    disableSortBy ?: boolean;
    label ?: string;
};

export type Cell = RtCell & {
    index: number;
    row: Row;
    column: Column;
    original: TableRecord;
};

export type ExtendedTableHeader = HeaderGroup & Column & UseSortByColumnProps<TableRecord> &  UseTableHeaderGroupProps<TableRecord> & {
    defaultCanSort?: boolean;
    disableSortBy?: boolean;
    isSorted?: boolean;
    isSortedDesc?: boolean;
    toggleSortBy: (isDesc: boolean, isMult: boolean) => void;
};


export type TableOptions = RtTableOptions<TableRecord> & UseTableOptions<TableRecord> & {
    autoResetSelectedRows?: boolean;
}

export type TableInstance = UseSortByInstanceProps<TableRecord> & UseRowSelectInstanceProps<TableRecord> & UseRowSelectOptions<TableRecord> & RtTableInstance<TableRecord> & {
    toggleAllPageRowsSelected: (set?: boolean) => void;
    selectedFlatRows: Row[];
    isAllRowsSelected: boolean;
    toggleAllRowsSelected: () => void;
    sortBy?: TableSortConfig;
}

export interface CurrentTableState extends TableState {
    sortBy?: TableSortConfig[]
}
