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
  UseRowSelectState,
  UseExpandedRowProps,
  UseExpandedInstanceProps,
} from 'react-table';

import { TableSort } from './TableSort';

/* eslint-disable-next-line  @typescript-eslint/ban-types */
export type IdType = { id?: string | number } & object;

export type Row<T extends IdType> = RtRow<T> &
  UseExpandedRowProps<T> & {
    toggleRowSelected: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getToggleRowSelectedProps: () => any;
    original: T;
  };

export type RowProps = {
  isDisabled?: boolean;
} & React.HTMLAttributes<HTMLTableRowElement>;

export type Column<T extends IdType> = RtColumn<T> & {
  className?: string;
  stickyRight?: boolean;
  stickyLeft?: boolean;
  disableClick?: boolean;
  title?: string;
  defaultCanSort?: boolean;
  disableSortBy?: boolean;
  label?: string;
  hidden?: boolean;
  isVisible?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Cell<T extends IdType, V = any> = RtCell<T, V> & {
  index: number;
  row: Row<T>;
  column: Column<T>;
  original: T;
  data: T[];
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
    initialState?: Partial<TableState<T>> & CurrentTableState<T>;
  } & UseSortByOptions<T> &
  UsePaginationOptions<T>;

export type TableInstance<T extends IdType> = UseSortByInstanceProps<T> &
  UseRowSelectInstanceProps<T> &
  UseRowSelectOptions<T> &
  RtTableInstance<T> &
  UseExpandedInstanceProps<T> &
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

export type CurrentTableState<T extends IdType> = TableState &
  Partial<UseRowSelectState<T>> & {
    sortBy?: TableSort[];
  };
