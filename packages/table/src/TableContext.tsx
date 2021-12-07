import React, { useContext } from 'react';
import { TableSortConfig, TableSortOption } from './types';
import { CurrentTableState } from './types/ReactTable';

export type TableContext = {
  scrollable?: boolean;
  setScrollable?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  sortable?: boolean;
  AdditionalContent?: React.ElementType;
  toggleSelectAll?: () => void;
  sortBy?: TableSortConfig;
  sortOptions?: TableSortOption[];
  selectable?: boolean;
  initialState?: CurrentTableState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance?: any;
};

export const TableContext = React.createContext<TableContext>({
  scrollable: false,
  sortable: false,
});

export const useTableContext = (): TableContext => useContext(TableContext);
