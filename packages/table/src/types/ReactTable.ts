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
  UseTableOptions,
  UseSortByOptions,
  UsePaginationOptions,
  UsePaginationInstanceProps,
  UseColumnOrderInstanceProps,
} from 'react-table';

import { TableSort } from './TableSort';

/* eslint-disable-next-line  @typescript-eslint/ban-types */
export type IdType = { id?: string | number } & object;

export type Row<T extends IdType> = RtRow<T> & {
  toggleRowSelected: () => void;
  getToggleRowSelectedProps: () => void;
  original: T;
};

export type Column<T extends IdType> = RtColumn<T>  & {
  className?: string;
  stickyRight?: boolean;
  stickyLeft?: boolean;
  disableClick?: boolean;
  title?: string;
  defaultCanSort?: boolean;
  disableSortBy?: boolean;
  label?: string;
  hidden?: boolean;
  canCustomize?: boolean;
  isVisible?: boolean;
};

export type Cell<T extends IdType> = RtCell<T> & {
  index: number;
  row: Row<T>;
  column: Column<T>;
  original: T;
};

export type ExtendedTableHeader<T extends IdType> = HeaderGroup<T> &
  Column<T> &
  UseSortByColumnProps<T> &
  UseTableHeaderGroupProps<T> & {
    defaultCanSort?: boolean;
    disableSortBy?: boolean;
    isSorted?: boolean;
    isSortedDesc?: boolean;
    toggleSortBy: (isDesc: boolean, isMult: boolean) => void;
  };

export type TableOptions<T extends IdType> = RtTableOptions<T> &
  UseTableOptions<T> & {
    autoResetSelectedRows?: boolean;
    autoResetSortBy?: boolean;
    manualSortBy?: boolean;
    hiddenColumns?: string[];
    initialState?: Partial<TableState<T>> & CurrentTableState;
  } & UseSortByOptions<T> & UsePaginationOptions<T>;

export type TableInstance<T extends IdType> = UseSortByInstanceProps<T> &
  UseRowSelectInstanceProps<T> &
  UseRowSelectOptions<T> &
  RtTableInstance<T> &
  UseColumnOrderInstanceProps<T> &
  UsePaginationInstanceProps<T> & {
    toggleAllPageRowsSelected: (set?: boolean) => void;
    selectedFlatRows: Row<T>[];
    isAllRowsSelected: boolean;
    toggleAllRowsSelected: () => void;
    sortBy?: TableSort;
  } & {
    manualSortBy?: boolean;
  };

export interface CurrentTableState extends TableState {
  sortBy?: TableSort[];
}
