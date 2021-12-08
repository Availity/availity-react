import React, { useContext } from 'react';
import { TableSort, TableSortOption } from './types';

export type TableContext = {
  scrollable?: boolean;
  setScrollable?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  sortable?: boolean;
  AdditionalContent?: React.ElementType;
  toggleSelectAll?: () => void;
  sortBy?: TableSort;
  sortOptions?: TableSortOption[];
  selectable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance?: any;
};

export const TableContext = React.createContext<TableContext>({
  scrollable: false,
  sortable: false,
});

export const useTableContext = (): TableContext => useContext(TableContext);
