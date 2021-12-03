import { 
    Row as RtRow, 
    Cell as RtCell, 
    TableInstance as RtTableInstance, 
    UseRowSelectInstanceProps, 
    UseSortByInstanceProps, 
    HeaderGroup, 
    Column as RtColumn, 
    ColumnWithLooseAccessor 
} from 'react-table';

export type Row = RtRow & {
    toggleRowSelected: () => void;
    getToggleRowSelectedProps: () => void;
    original: any;
};

export interface OnRowSelectedEvent {
    selectedRows: string[] | number[];
}

export interface OnTableClickEvent<T> extends React.MouseEvent<T, MouseEvent> {
    row: Row;
    data: object;
    index: number;
}

export interface PrimaryTableAction<T> {
    iconName: string;
    title: string;
    onClick: (record?: T) => void;
}
export interface TableAction {
    id: string;
    displayText?: string;
    divider?: boolean;
}

export interface SingleTableAction<T> extends TableAction {
    onClick?: (record?: T) => void;
    isVisible?: (record?: T) => boolean;
}
export interface BulkTableAction<T> extends TableAction {
    onClick?: (records?: T[]) => void;
    isVisible?: (records?: T[]) => boolean;
}

export type Column = RtColumn & ColumnWithLooseAccessor  & {
    className?: string;
    stickyRight?: boolean;
    stickyLeft?: boolean;
    disableClick?: boolean;
    title?: string;
    defaultCanSort?: boolean;
    disableSortBy?: boolean;
    label?: string;
};

export type Cell = RtCell<object, any> & {
    index: number;
    row: Row;
    column: Column;
}

export interface ExtendedTableInstance<D extends object = {}> extends UseSortByInstanceProps<D>, UseRowSelectInstanceProps<D> {
    toggleAllPageRowsSelected: (set?: boolean) => void;
}

export type TableInstance = ExtendedTableInstance & RtTableInstance<object>;

export type ExtendedTableHeader = HeaderGroup<object> & Column & {
    defaultCanSort?: boolean;
    disableSortBy?: boolean;
    isSorted?: boolean;
    isSortedDesc?: boolean;
}

export {
    ActionCell,
    BadgeCell,
    CurrencyCell,
    DateCell,
    IconCell,
}
    from './CellDefinitions';

export type {
    ActionCellConfig,
    CurrencyCellConfig,
    DateTimeCellConfig,
    IconConfig
} from './CellDefinitions';

export { default } from './Table';

export { default as ScrollableContainer } from './ScrollableContainer';

export { default as TableContextProvider } from './TableContextProvider';

export { TableSorter, TableControls, BulkTableActions } from './Controls';
