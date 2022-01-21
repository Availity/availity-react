import React, { useContext } from 'react';
import { TableSort, TableSortOption } from './types';

export type AvTableContext = {
  scrollable?: boolean;
  setScrollable?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  sortable?: boolean;
  AdditionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  toggleSelectAll?: () => void;
  sortBy?: TableSort;
  sortableColumns?: TableSortOption[];
  selectable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance?: any;
};

export const TableContext = React.createContext<AvTableContext>({
  scrollable: false,
  sortable: false,
});

export const useTableContext = (): AvTableContext => useContext(TableContext);
