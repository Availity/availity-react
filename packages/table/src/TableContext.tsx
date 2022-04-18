/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { OnRowSelectedEvent, OnTableClickEvent, TableSort, TableSortOption } from './types';
import { Cell, Row, RowProps } from './types/ReactTable';

type HeaderProps = {
  sticky: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type AvTableContext = {
  id?: string;
  tableProps?: React.HTMLAttributes<HTMLElement>;
  bodyProps?: React.HTMLAttributes<HTMLElement>;
  headerProps?: HeaderProps;
  getCellProps: (cell: Cell<Record<string, any>>) => React.HTMLAttributes<HTMLTableCellElement>;
  getRowProps: (row: Row<Record<string, any>>) => RowProps;
  onCellClick?: (event: OnTableClickEvent<HTMLElement, any>) => void;
  onRowClick?: (event: OnTableClickEvent<HTMLElement, any>) => void;
  onRowSelected?: (event: OnRowSelectedEvent<any>) => void;
  onSort?: (sortBy: TableSort[]) => void;
  onReset?: () => void;
  getCanSelectRow?: (record: any) => boolean;
  AdditionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  scrollable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  paged?: boolean;
  sortableColumns?: TableSortOption[];
  instance?: any;
  setInstance?: React.Dispatch<React.SetStateAction<any>>;
};

export const TableContext = React.createContext<AvTableContext>({
  scrollable: false,
  sortable: false,
  getRowProps: () => ({} as RowProps),
  getCellProps: () => ({} as React.HTMLAttributes<HTMLTableCellElement>),
});

export const useTableContext = (): AvTableContext => useContext(TableContext);
