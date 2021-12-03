import React, { useContext } from 'react';
import { TableState } from 'react-table';
import { TableInstance } from '.';

export type TableSortConfig = {
    id: string;
    desc: boolean;
}

export type TableSortOption = {
    value: string;
    label: string;
}
export interface AvailityTableState extends TableState<object> {
    sortBy?: TableSortConfig[]
}

export type TableContext = {
    scrollable?: boolean;
    sortable?: boolean;
    AdditionalContent?: React.ElementType;
    toggleSelectAll?: () => void;
    sortBy?: TableSortConfig;
    sortOptions?: TableSortOption[];
    selectable?:boolean;

    initialState?: AvailityTableState;
    instance?: TableInstance;
}

export const TableContext = React.createContext<TableContext>({
    scrollable: false,
    sortable: false
});

export const useTableContext = (): TableContext => useContext(TableContext);
